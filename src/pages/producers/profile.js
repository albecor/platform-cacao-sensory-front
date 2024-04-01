import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useParams } from "react-router-dom";
import { fetchProducer } from "api";
import Swal from "sweetalert2";
import { parseProfileInfo } from "utils";
import Profile from "components/Profile";
import colors from "assets/theme/base/colors";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import ItemList from "components/ItemList";
import SuiTypography from "components/SuiTypography";
import { states } from "utils/constants";
import { useCacaoContext } from "../../context";
import TableLayout from "../../layouts/Tables";
import FarmModal from "./farms";
import ProducersModal from "./modal";

const ProducerProfile = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["cacao"]);
  const [, dispatch] = useCacaoContext();
  const [producer, setProducer] = useState([{}]);
  const [data, setData] = useState({});
  const [farm, setFarm] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [addFarm, setAddFarm] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const token = cookies.cacao;
  useEffect(async () => {
    const snapshot = await fetchProducer(id, token);
    setData(snapshot);
    setProducer(parseProfileInfo(snapshot));
    setLoading(false);
  }, []);
  const editProducer = async (snap) => {
    setProducer(parseProfileInfo(snap));
    dispatch({
      type: "EDIT_PRODUCER",
      value: {
        _id: id,
        name: snap.name,
        document: snap.document,
        phone: snap.phone,
      },
    });
  };
  if (loading) return <p>Loading</p>;
  return (
    <>
      <Profile
        editProfile={() => setEditModal(true)}
        emptyMessage="Sin Muestras :("
        info={producer}
        list={data.samples}
        title="Muestras"
        table={() => (
          <TableLayout
            columns={[
              { accessor: "code", align: "left", Header: "código" },
              { accessor: "action", align: "center", Header: "acciones" },
            ]}
            rows={data.samples.map((sample) => ({
              code: sample.code,
              action: (
                <SuiBox
                  display="flex"
                  alignItems="center"
                  mt={{ xs: 2, sm: 0 }}
                  ml={{ xs: -1.5, sm: 0 }}
                >
                  <SuiBox mr={1}>
                    <Tooltip title="Ver muestra" placement="top">
                      <SuiButton
                        onClick={() => history.push(`/samples/${sample._id}`)}
                        variant="text"
                        buttonColor="dark"
                      >
                        <Icon className="material-icons-round">visibility</Icon>
                      </SuiButton>
                    </Tooltip>
                  </SuiBox>
                </SuiBox>
              ),
            }))}
          />
        )}
      >
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={2}
          px={2}
        >
          <SuiTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            Fincas
          </SuiTypography>
          <SuiTypography
            onClick={() => {
              setFarm({});
              setAddFarm(true);
            }}
            variant="button"
            textColor="secondary"
          >
            <Tooltip title="Agregar" placement="top">
              <Icon className="material-icons-round">add</Icon>
            </Tooltip>
          </SuiTypography>
        </SuiBox>
        <SuiBox p={2}>
          <SuiBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            {data.farms.map((obj) => (
              <ItemList
                title={obj.name}
                primaryAction={() => {
                  setFarm({ ...obj, farm: obj.name });
                  setAddFarm(true);
                }}
                key={obj._id}
              >
                <SuiBox display="grid">
                  {obj.altitude && (
                    <SuiTypography
                      variant="caption"
                      fontWeight="regular"
                      textColor="text"
                    >
                      {obj.altitude} m.s.n.m.
                    </SuiTypography>
                  )}
                  {obj.state && obj.city && (
                    <SuiTypography
                      variant="caption"
                      fontWeight="regular"
                      textColor="text"
                    >
                      {`${states[obj.state].state}, ${
                        states[obj.state].cities[obj.city]
                      }`}
                    </SuiTypography>
                  )}
                </SuiBox>
              </ItemList>
            ))}
          </SuiBox>
        </SuiBox>
      </Profile>
      {editModal && (
        <ProducersModal
          cb={(snap) =>
            Swal.fire({
              title: "Productor modificado",
              icon: "success",
              confirmButtonText: "Ok!",
              confirmButtonColor: colors.greenDark.main,
            }).then(() => editProducer(snap))
          }
          producer={data}
          token={cookies.cacao}
          modal={editModal}
          setModal={() => setEditModal(false)}
        />
      )}
      {addFarm && (
        <FarmModal
          cb={(snap) =>
            Swal.fire({
              title: `Finca ${farm._id ? "modificada" : "agregada"}`,
              icon: "success",
              confirmButtonText: "Ok!",
              confirmButtonColor: colors.greenDark.main,
            }).then(() => {
              if (farm._id) {
                dispatch({
                  type: "EDIT_FARM",
                  value: {
                    ...snap,
                    _id: farm._id,
                  },
                });
                setData((prevState) => ({
                  ...prevState,
                  farms: prevState.farms.map((item) => {
                    if (item._id !== farm._id) return item;
                    return { ...item, ...snap };
                  }),
                }));
              } else {
                dispatch({
                  type: "ADD_FARM",
                  value: { ...snap, producer: id },
                });
                setData((prevState) => ({
                  ...prevState,
                  farms: [...prevState.farms, snap],
                }));
              }
            })
          }
          farm={farm}
          token={cookies.cacao}
          modal={addFarm}
          producer={id}
          setModal={() => setAddFarm(false)}
        />
      )}
    </>
  );
};

export default ProducerProfile;
