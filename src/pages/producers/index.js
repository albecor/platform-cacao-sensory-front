import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import Swal from "sweetalert2";
import { fetchProducers } from "api";
import { useCacaoContext } from "context";
import EmptyContent from "components/EmptyContent";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import RowProducer from "components/Table/rowProducer";
import TableLayout from "layouts/Tables";
import colors from "assets/theme/base/colors";
import ProducersModal from "./modal";

const Producers = () => {
  const [cookies] = useCookies(["cacao"]);
  const [controller, dispatch] = useCacaoContext();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [producers, setProducers] = useState([]);
  const history = useHistory();
  const token = cookies.cacao;
  const getProducers = async (edit = false) => {
    try {
      if (edit || controller.producers.length < 1) {
        const list = await fetchProducers(token);
        dispatch({ type: "PRODUCERS", value: list });
        setLoading(false);
        setProducers(list);
      } else {
        setProducers(controller.producers);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setProducers([]);
    }
  };
  useEffect(async () => {
    await getProducers();
  }, []);
  if (loading) return <p>Loading</p>;
  return (
    <Card>
      <SuiBox
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <SuiTypography variant="h6" fontWeight="medium">
          Productores
        </SuiTypography>
        <SuiButton
          onClick={() => setModal(true)}
          variant="gradient"
          buttonColor="greenDark"
        >
          <Icon className="font-bold">add</Icon>
          &nbsp;Nuevo productor
        </SuiButton>
      </SuiBox>
      {producers.length < 1 ? (
        <EmptyContent message="Aún no hay productores. Agregue uno" />
      ) : (
        <TableLayout
          columns={[
            { accessor: "nombre", align: "left", Header: "nombre" },
            { accessor: "phone", align: "left", Header: "teléfono" },
            { accessor: "action", align: "center", Header: "perfil" },
          ]}
          rows={producers.map((data) => ({
            nombre: (
              <RowProducer
                document={data.document?.toString()}
                name={data.name}
              />
            ),
            phone: <RowProducer.Phone phone={data.phone?.toString()} />,
            action: (
              <RowProducer.Actions
                primaryAction={() => {
                  history.push(`/producers/${data._id}`);
                }}
              />
            ),
          }))}
        />
      )}
      {modal && (
        <ProducersModal
          cb={() =>
            Swal.fire({
              title: "Productor creado!",
              icon: "success",
              confirmButtonText: "Ok!",
              confirmButtonColor: colors.greenDark.main,
            }).then(async () => {
              await getProducers(true);
            })
          }
          token={cookies.cacao}
          modal={modal}
          setModal={() => setModal(false)}
        />
      )}
    </Card>
  );
};

export default Producers;
