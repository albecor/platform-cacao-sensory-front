import { Route, Switch } from "react-router-dom";
import Dashboard from "layouts/DashboardLayout";
import ProtectedRoute from "components/ProtectedRoute";
import Report from "components/Report";
import Login from "pages/authentication/Login";
import RecoverPsw from "pages/authentication/RecoverPsw";
import ResetPsw from "pages/authentication/ResetPsw";
import { useEffect } from "react";
import { fetchRoles } from "api";
import { useCacaoContext } from "./context";

const App = () => {
  const [, dispatch] = useCacaoContext();
  useEffect(async () => {
    try {
      const roles = await fetchRoles();
      dispatch({ type: "ROLES", value: roles });
    } catch (e) {
      dispatch({ type: "ROLES", value: [] });
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/recover-password" component={RecoverPsw} />
      <Route exact path="/reset-password" component={ResetPsw} />
      <Route exact path="/report" component={Report} />
      <ProtectedRoute component={Dashboard} />
    </Switch>
  );
};

export default App;
