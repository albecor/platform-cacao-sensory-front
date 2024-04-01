import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import EmptyContent from "components/EmptyContent";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import TableLayout from "layouts/Tables";
import { fetchEvents } from "api";
import { formatDate } from "utils";

const EventsList = () => {
  const [cookies] = useCookies(["cacao"]);
  const token = cookies.cacao;
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const history = useHistory();
  useEffect(async () => {
    try {
      const list = await fetchEvents(token);
      setLoading(false);
      setEvents(list);
    } catch (e) {
      setLoading(false);
      setEvents([]);
    }
  }, []);
  const handleStatus = (data) => {
    if (!data.activated && data.endAt) return "Finalizado";
    if (data.activated && !data.endAt) return "En progreso";
    return "Sin iniciar";
  };
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
          Eventos
        </SuiTypography>
        <SuiButton
          onClick={() => history.push("/events/new")}
          variant="gradient"
          buttonColor="greenDark"
        >
          <Icon className="font-bold">add</Icon>
          &nbsp;Nuevo evento
        </SuiButton>
      </SuiBox>
      {events.length < 1 ? (
        <EmptyContent message="Aún no hay eventos. Agregue uno" />
      ) : (
        <TableLayout
          columns={[
            { accessor: "id", align: "center", Header: "#" },
            { accessor: "samples", align: "center", Header: "# muestras" },
            { accessor: "testers", align: "center", Header: "# catadores" },
            { accessor: "startAt", align: "center", Header: "fecha" },
            { accessor: "status", align: "center", Header: "estado" },
            { accessor: "action", align: "center", Header: "detalle" },
          ]}
          rows={events.map((data, index) => ({
            id: (
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
              >
                {index + 1}
              </SuiTypography>
            ),
            samples: (
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
              >
                {data.samples}
              </SuiTypography>
            ),
            testers: (
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
              >
                {data.testers}
              </SuiTypography>
            ),
            startAt: (
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
              >
                {formatDate(data.startAt)}
              </SuiTypography>
            ),
            status: (
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
              >
                {handleStatus(data)}
              </SuiTypography>
            ),
            action: (
              <SuiBox
                display="flex"
                alignItems="center"
                mt={{ xs: 2, sm: 0 }}
                ml={{ xs: -1.5, sm: 0 }}
              >
                <SuiBox mr={1}>
                  <Tooltip title="Ver evento" placement="top">
                    <SuiButton
                      onClick={() => history.push(`/event/${data._id}`)}
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
  );
};

export default EventsList;
