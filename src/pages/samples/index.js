import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchSamples } from "api";
import EmptyContent from "components/EmptyContent";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import TableLayout from "layouts/Tables";
import colors from "assets/theme/base/colors";
import SamplesModal from "./modal";

const Samples = () => {
  const [cookies] = useCookies(["cacao"]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [samples, setSamples] = useState([]);
  const history = useHistory();
  const token = cookies.cacao;
  const getSamples = async () => {
    try {
      const list = await fetchSamples(token);
      setLoading(false);
      setSamples(list);
    } catch (e) {
      setLoading(false);
      setSamples([]);
    }
  };
  const sortByState = (x, y) => {
    const keyA = x.values.state.key.replace("state-", "");
    const keyB = y.values.state.key.replace("state-", "");
    const a = samples.find(({ _id }) => _id === keyA)?.state.order;
    const b = samples.find(({ _id }) => _id === keyB)?.state.order;
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  };
  const columns = [
    { accessor: "code", align: "left", Header: "código" },
    {
      accessor: "state",
      align: "left",
      Header: "estado",
      hasSort: true,
      sortType: sortByState,
    },
    { accessor: "producer", align: "left", Header: "productor" },
    { accessor: "action", align: "center", Header: "perfil" },
  ];
  useEffect(async () => {
    await getSamples();
  }, []);
  if (loading) return <p>Loading</p>;
  return (
    <>
      <Card>
        <SuiBox
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <SuiTypography variant="h6" fontWeight="medium">
            Muestras
          </SuiTypography>
          <SuiButton
            onClick={() => setModal(true)}
            variant="gradient"
            buttonColor="greenDark"
          >
            <Icon className="font-bold">add</Icon>
            &nbsp;Nueva muestra
          </SuiButton>
        </SuiBox>
        {samples.length < 1 ? (
          <EmptyContent message="Aún no hay muestras. Agregue una" />
        ) : (
          <TableLayout
            columns={columns}
            rows={samples.map((data) => ({
              code: (
                <SuiBox display="flex" flexDirection="column">
                  <SuiTypography variant="button" fontWeight="medium">
                    {data.code}
                  </SuiTypography>
                </SuiBox>
              ),
              state: (
                <SuiBox
                  display="flex"
                  flexDirection="column"
                  key={`state-${data._id}`}
                >
                  <SuiTypography
                    variant="caption"
                    fontWeight="medium"
                    textColor="text"
                  >
                    {data.state.list}
                  </SuiTypography>
                </SuiBox>
              ),
              producer: (
                <SuiBox display="flex" flexDirection="column">
                  <SuiTypography
                    variant="caption"
                    fontWeight="medium"
                    textColor="text"
                  >
                    {data.producer}
                  </SuiTypography>
                </SuiBox>
              ),
              action: (
                <SuiBox
                  display="flex"
                  alignItems="center"
                  mt={{ xs: 2, sm: 0 }}
                  ml={{ xs: -1.5, sm: 0 }}
                >
                  <SuiBox mr={1}>
                    {data.state?.name === "completed" && (
                      <Tooltip title="Ver reporte" placement="top">
                        <SuiButton
                          onClick={() => history.push(`/report?id=${data._id}`)}
                          variant="text"
                          buttonColor="greenDark"
                        >
                          <Icon className="material-icons-round">
                            sim_card_download
                          </Icon>
                        </SuiButton>
                      </Tooltip>
                    )}
                  </SuiBox>
                  <SuiBox mr={1}>
                    <Tooltip title="Ver muestra" placement="top">
                      <SuiButton
                        onClick={() => history.push(`/samples/${data._id}`)}
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
      </Card>
      {modal && (
        <SamplesModal
          cb={() =>
            Swal.fire({
              title: "Muestra creada!",
              icon: "success",
              confirmButtonText: "Ok!",
              confirmButtonColor: colors.greenDark.main,
            }).then(async () => {
              await getSamples();
            })
          }
          token={cookies.cacao}
          modal={modal}
          setModal={() => setModal(false)}
        />
      )}
    </>
  );
};

export default Samples;
