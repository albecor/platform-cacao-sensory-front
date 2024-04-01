import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Grid from "@material-ui/core/Grid";
import SuiBox from "components/SuiBox";
import MiniStatisticsCard from "components/Cards/StatisticsCards/MiniStatisticsCard";
import { getDashboardInfo } from "api";

const Dashboard = () => {
  const [cookies] = useCookies(["cacao"]);
  const [loading, setLoading] = useState(true);
  const [samples, setSamples] = useState([]);
  const [process, setProcess] = useState([]);
  const token = cookies.cacao;
  useEffect(async () => {
    try {
      const response = await getDashboardInfo(token);
      setSamples(response.samples);
      setProcess(response.process);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);
  if (loading) return <p>Loading</p>;
  return (
    <SuiBox py={3}>
      <SuiBox mb={1.5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={11} xl={12}>
            <MiniStatisticsCard
              title={{ text: "Total de Muestras" }}
              count={samples[0].count}
              icon={{ color: "grey-50", component: "local_cafe" }}
            />
          </Grid>
          {process.map((p) => (
            <Grid item xs={12} sm={6} xl={6} key={p._id}>
              <MiniStatisticsCard
                title={{ text: p.state.list }}
                count={p.total}
                icon={{ color: "grey-50", component: p.state.icon }}
              />
            </Grid>
          ))}
        </Grid>
      </SuiBox>
    </SuiBox>
  );
};

export default Dashboard;
