import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchSample } from "api";
import colors from "assets/theme/base/colors";
import { useCacaoContext } from "context";
import { parseSampleInfo } from "utils";
import Profile from "components/Profile";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import TimelineItem from "components/TimelineItem";
import SamplesModal from "./modal";

const SampleProfile = () => {
  const { id } = useParams();
  const [controller] = useCacaoContext();
  const [cookies] = useCookies(["cacao"]);
  const [sample, setSample] = useState({});
  const [process, setProcess] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [nextProcess, setNextProcess] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = cookies.cacao;
  const getSampleInfo = async () => {
    const snapshot = await fetchSample(id, token);
    const maxOrder = Math.max.apply(Math, [
      ...snapshot.process.map((i) => i.state.order),
    ]);
    setProcess(
      Array.from({ length: maxOrder }, (_, i) => {
        const state = controller.states.find((a) => a.order === i + 1);
        const snap = snapshot.process.find((a) => a.state.order === i + 1);
        return {
          icon: state.icon,
          list: state.list,
          owner: snap?.owner?.name,
          startAt: snap?.startAt,
          notes: snap?.notes,
          endAt: snap?.endAt,
        };
      })
    );
    setData(snapshot);
    setSample(parseSampleInfo(snapshot.sample));
    const lastProcess = snapshot.process.at(-1);
    setShowBtn(
      lastProcess?.owner?._id === controller.user._id &&
        lastProcess.state.order < controller.states.at(-1).order - 2
    );
  };
  useEffect(async () => {
    await getSampleInfo();
    setLoading(false);
  }, []);
  const showSwal = () =>
    Swal.fire({
      title: "Muestra modificada",
      icon: "success",
      confirmButtonText: "Ok!",
      confirmButtonColor: colors.greenDark.main,
    }).then(async () => getSampleInfo());
  if (loading) return <p>Loading</p>;
  return (
    <>
      <Profile
        editProfile={() => setEditModal(true)}
        emptyMessage=":("
        info={sample}
        producerClick={() => history.push(`/producers/${data.producer._id}`)}
        list={data.process}
        right="Información de la muestra"
        title="Historial"
        customWidget={() => (
          <>
            <SuiBox p={2}>
              {process.map((item, index) => (
                <TimelineItem
                  dateTime={item.startAt ? `Inicio: ${item.startAt}` : <br />}
                  description={
                    item.owner ? `Responsable: ${item.owner}` : <br />
                  }
                  extraTime={item.endAt && `Fin: ${item.endAt}`}
                  icon={item.icon}
                  title={item.list}
                  notes={item.notes && `Notas: ${item.notes}`}
                  key={index}
                />
              ))}
            </SuiBox>
            {showBtn && (
              <SuiBox
                px={2}
                pb={2}
                style={{ display: "flex", justifyContent: "end" }}
              >
                <SuiBox>
                  <SuiButton
                    onClick={() => setNextProcess(true)}
                    variant="gradient"
                    size="small"
                    buttonColor="greenDark"
                  >
                    {loading ? (
                      <CircularProgress size={17} color="inherit" />
                    ) : (
                      "Continuar proceso"
                    )}
                  </SuiButton>
                </SuiBox>
              </SuiBox>
            )}
          </>
        )}
      />
      {editModal && (
        <SamplesModal
          cb={showSwal}
          data={data.sample}
          token={cookies.cacao}
          modal={editModal}
          setModal={() => setEditModal(false)}
        />
      )}
      {nextProcess && (
        <SamplesModal.Next
          cb={showSwal}
          modal={nextProcess}
          process={data.process.at(-1)}
          setModal={() => setNextProcess(false)}
          token={cookies.cacao}
        />
      )}
    </>
  );
};

export default SampleProfile;
