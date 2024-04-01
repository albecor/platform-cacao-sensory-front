import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
} from "@material-ui/core";
import { fetchEvent } from "api";
import Profile from "components/Profile";
import { parseEventInfo } from "utils";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import { categories } from "utils/constants";

const EventDetail = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["cacao"]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [event, setEvent] = useState({});
  const history = useHistory();
  const token = cookies.cacao;
  const listTesters = (sample) => {
    const results = Object.keys(event.info.data[sample]);
    return event.info.testers.filter((t) => results.includes(t._id));
  };
  useEffect(async () => {
    const { info, results } = await fetchEvent(id, token);
    setData(parseEventInfo(info));
    setEvent({ info, results });
    setLoading(false);
  }, []);
  if (loading) return <p>Loading</p>;
  return (
    <Profile
      info={data}
      title=""
      right="Información del evento"
      customInfo={() => (
        <>
          {event.info.samples.map((s) => (
            <SuiBox key={s._id} mb={1}>
              <Card>
                <SuiBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  pt={3}
                  px={2}
                  pb={2}
                >
                  <SuiTypography variant="h6" fontWeight="medium">
                    Muestra: {s.code}
                  </SuiTypography>
                  {event.info.samplesCompleted.includes(s._id) &&
                    !event.info.activated && (
                      <SuiBox
                        px={2}
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <SuiBox>
                          <SuiButton
                            onClick={() => history.push(`/report?id=${s._id}`)}
                            variant="gradient"
                            size="small"
                            buttonColor="greenDark"
                          >
                            Ver reporte
                          </SuiButton>
                        </SuiBox>
                      </SuiBox>
                    )}
                </SuiBox>
                {Object.keys(event.info.data).length > 0 &&
                  !event.info.activated && (
                    <SuiBox pt={1} pb={2} px={2}>
                      {listTesters(s._id).map((t) => (
                        <Accordion
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          backgroundColor="grey-100"
                          borderRadius="lg"
                          key={t._id}
                          p={3}
                          mb={1}
                          mt={2}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            mb={2}
                          >
                            <SuiTypography
                              variant="subtitle2"
                              fontWeight="bold"
                              textTransform="capitalize"
                              textColor="title"
                            >
                              Catador: {t.name}
                            </SuiTypography>
                          </AccordionSummary>
                          <AccordionDetails style={{ display: "block" }}>
                            {Object.entries(categories).map(([key, value]) => (
                              <React.Fragment key={key}>
                                <SuiBox mb={1} lineHeight={0}>
                                  <SuiTypography
                                    variant="h6"
                                    textColor="greenDark"
                                  >
                                    {value}
                                  </SuiTypography>
                                  <SuiTypography
                                    variant="caption"
                                    fontWeight="medium"
                                    textTransform="capitalize"
                                  >
                                    Intensidad:{" "}
                                    {
                                      event.info.data[s._id][t._id][key]
                                        .intensity
                                    }
                                  </SuiTypography>
                                </SuiBox>
                                <SuiBox mb={1} lineHeight={0}>
                                  <SuiTypography
                                    variant="caption"
                                    fontWeight="medium"
                                    textTransform="capitalize"
                                  >
                                    Calidad:{" "}
                                    {event.info.data[s._id][t._id][key].quality}
                                  </SuiTypography>
                                </SuiBox>
                                {event.info.data[s._id][t._id][key]
                                  .descriptors && (
                                  <SuiBox mb={1} lineHeight={0}>
                                    <SuiTypography
                                      variant="caption"
                                      fontWeight="medium"
                                      textTransform="capitalize"
                                    >
                                      Decriptores:{" "}
                                      {
                                        event.info.data[s._id][t._id][key]
                                          .descriptors
                                      }
                                    </SuiTypography>
                                  </SuiBox>
                                )}
                                {event.info.data[s._id][t._id][key].notes && (
                                  <SuiBox mb={1} lineHeight={0}>
                                    <SuiTypography
                                      variant="caption"
                                      fontWeight="medium"
                                      textTransform="capitalize"
                                    >
                                      Notas:{" "}
                                      {event.info.data[s._id][t._id][key].notes}
                                    </SuiTypography>
                                  </SuiBox>
                                )}
                                <Divider />
                              </React.Fragment>
                            ))}
                            <SuiBox mb={1} lineHeight={0}>
                              <SuiTypography variant="h6" textColor="greenDark">
                                Puntaje del catador
                              </SuiTypography>
                              <SuiTypography
                                variant="caption"
                                fontWeight="medium"
                                textTransform="capitalize"
                              >
                                {event.info.data[s._id][t._id].points?.value}
                              </SuiTypography>
                            </SuiBox>
                            {event.info.data[s._id][t._id].comments && (
                              <>
                                <Divider />
                                <SuiBox mb={1} lineHeight={0}>
                                  <SuiTypography
                                    variant="h6"
                                    textColor="greenDark"
                                  >
                                    Comentarios
                                  </SuiTypography>
                                  <SuiTypography
                                    variant="caption"
                                    fontWeight="medium"
                                  >
                                    {
                                      event.info.data[s._id][t._id].comments
                                        .value
                                    }
                                  </SuiTypography>
                                </SuiBox>
                              </>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </SuiBox>
                  )}
              </Card>
            </SuiBox>
          ))}
        </>
      )}
    />
  );
};

export default EventDetail;
