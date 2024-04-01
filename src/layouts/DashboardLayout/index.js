import { useCacaoContext } from "context";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Sidenav from "components/Sidenav";
import SuiBox from "components/SuiBox";
import styles from "./styles";

const Dashboard = () => {
  const [controller] = useCacaoContext();
  const { miniSidenav, direction } = controller;
  const classes = styles({ miniSidenav, direction });
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => (
      <Route
        exact
        path={route.route}
        component={route.component}
        key={route.key}
      />
    ));
  return (
    <>
      <Sidenav routes={controller.routes} />
      <SuiBox customClass={classes.layoutContainer}>
        <SuiBox position="relative">
          <Navbar />
        </SuiBox>
        <SuiBox mt={8} mb={3}>
          <Switch>{getRoutes(controller.routes)}</Switch>
          <Redirect from="*" to={controller.routes[0].route} />
        </SuiBox>
      </SuiBox>
      <Footer />
    </>
  );
};

export default Dashboard;
