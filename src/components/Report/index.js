import { useEffect, useMemo, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Divider, Grid } from "@material-ui/core";
import { fetchReport } from "api";
import FabButton from "components/FabButton";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { categories, states } from "utils/constants";
import clsx from "clsx";
import styles from "./styles";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Report = () => {
  const classes = styles();
  const query = useQuery();
  const id = query.get("id");
  const [cookies] = useCookies(["cacao"]);
  const token = cookies.cacao;
  const [info, setInfo] = useState({});
  const [results, setResults] = useState({});
  const [button, setButton] = useState(true);
  const [data, setData] = useState({
    labels: [...Object.values(categories), "Puntos"],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const { sample, values } = await fetchReport(id, token);
    setInfo(sample);
    const avg = Object.entries(values)
      .filter((v) => v[0].includes("Avg"))
      .map((i) => i[1]);
    setResults(values);
    setData((prevState) => ({
      ...prevState,
      datasets: [
        {
          label: "Calidad",
          data: avg,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderColor: "rgb(0,0,0)",
          borderWidth: 1,
          fill: false,
        },
      ],
    }));
    setLoading(false);
  }, []);
  useEffect(() => {
    if (!button) {
      window.print();
      setButton(true);
    }
  }, [button]);
  if (!id) return <Redirect to="/" />;
  if (loading) return <p>Cargando ...</p>;
  return (
    <>
      {button && (
        <FabButton icon="sim_card_download" onClick={() => setButton(false)} />
      )}
      <Box mt={2} mx={0.5}>
        <Grid container className={classes.allBorder}>
          <Grid item xs={3} className={classes.borderRight}>
            <Box display="flex" textAlign="center">
              <img
                width="100%"
                src="./cesurcafe.png"
                alt="cesurcafe"
                className={classes.logoImg}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              alignItems="center"
              display="flex"
              height="50%"
              justifyContent="center"
              textAlign="center"
              className={classes.borderBottom}
            >
              <Box display="block">
                <p>FICHA TECNICA</p>
              </Box>
            </Box>
            <Box
              alignItems="center"
              display="flex"
              height="50%"
              textAlign="center"
            >
              <Box flex={1}>
                <p>Fecha: 12/12/2021</p>
              </Box>
              <Divider className={classes.divider} />
              <Box flex={1}>
                <p>Muestra: {info.code}</p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3} className={classes.borderLeft}>
            <Box display="flex" textAlign="center">
              <img
                src="https://www.usco.edu.co/imagen-institucional/logo/universidad-surcolombiana-vm.png"
                alt="USCO"
                className={classes.logoImg}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          className={clsx(
            classes.borderLeft,
            classes.borderRight,
            classes.borderBottom
          )}
        >
          <Grid item xs={3}>
            <Box
              alignItems="center"
              display="flex"
              height="100%"
              justifyContent="center"
              textAlign="center"
              className={classes.borderRight}
            >
              <Box display="block">
                <p>Datos del productor</p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center" className={classes.borderRight}>
              <Box className={classes.borderBottom}>
                <p>Nombre</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Cedula</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Correo</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Teléfono</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Departamento</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Ciudad</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Finca/Vereda</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Altura finca (m.s.n.m.)</p>
              </Box>
              <Box className={classes.borderBottom}>
                <p>Altura muestra (m.s.n.m.)</p>
              </Box>
              <Box>
                <p>Variedad</p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.producer.name}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.producer.document}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.producer.email || "-"}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.producer.phone || "-"}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{states[info.farm.state].state}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{states[info.farm.state].cities[info.farm.city]}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.farm.name || "-"}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.farm.altitude || "-"}</p>
            </Box>
            <Box pl={0.5} className={classes.borderBottom}>
              <p>{info.altitude || "-"}</p>
            </Box>
            <Box pl={0.5}>
              <p>{info.variety || "-"}</p>
            </Box>
          </Grid>
        </Grid>
        {info.process && (
          <Grid
            container
            className={clsx(
              classes.borderLeft,
              classes.borderRight,
              classes.borderBottom
            )}
          >
            <Grid item xs={4}>
              <Box
                alignItems="center"
                display="flex"
                height="100%"
                justifyContent="center"
                textAlign="center"
                className={classes.borderRight}
              >
                <Box display="block">
                  <p>Análisis físico</p>
                </Box>
              </Box>
            </Grid>
            <Grid item xs>
              <p>{info.process.notes}</p>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          className={clsx(
            classes.borderLeft,
            classes.borderRight,
            classes.borderBottom
          )}
        >
          <Grid item xs={3}>
            <Box
              alignItems="center"
              display="flex"
              height="100%"
              justifyContent="center"
              textAlign="center"
              className={classes.borderRight}
            >
              <Box display="block">
                <p>Análisis sensorial</p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4} className={classes.borderRight}>
            {Object.entries(categories).map(([key, value]) => (
              <Box key={key} pl={1} className={classes.borderBottom}>
                <p>
                  {value}: {results[`${key}Avg`]}
                </p>
              </Box>
            ))}
            <Box pl={1} className={classes.borderBottom}>
              <p>Puntaje catador: {results.pointsAvg}</p>
            </Box>
            <Box pl={1}>
              <p>Puntaje total:</p>
              <p className={classes.total}>{results.total}</p>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box my={0} mx="auto" height="300px" width="300px">
              <Radar
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} width="90%" mx={2} position="absolute" bottom="10%">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <div className={classes.borderTop} />
              <p>
                <strong>Nelson Gutiérrez Guzmán Ph.D.</strong>
              </p>
              <p>Coordinador CESURCAFÉ</p>
              <p>(57)(8) 8754753 Ext 1131</p>
            </Grid>
            <Grid item>
              <div className={classes.borderTop} />
              <p>
                <strong>Bertulfo Delgado Joven Ms.c.</strong>
              </p>
              <p>Catador Certificado Q Grader</p>
              <p>SCAA</p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Report;
