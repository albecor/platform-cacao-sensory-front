import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router-dom";
import {
  fetchFarms,
  fetchProducers,
  fetchSamplesStates,
  getInfoUser,
  validToken,
} from "api";
import { useCacaoContext } from "context";
import routes from "routes";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(false);
  const [init, setInit] = useState(true);
  const [controller, dispatch] = useCacaoContext();
  const [cookies] = useCookies(["cacao"]);
  useEffect(async () => {
    try {
      const token = cookies.cacao;
      await validToken(token);
      const { data } = await getInfoUser(token);
      const producers = await fetchProducers(token);
      const farms = await fetchFarms(token);
      const states = await fetchSamplesStates(token);
      dispatch({ type: "USER", value: { ...controller.user, ...data } });
      dispatch({ type: "ROUTES", value: routes[data.rol.name] });
      dispatch({ type: "PRODUCERS", value: producers });
      dispatch({ type: "FARMS", value: farms });
      dispatch({ type: "STATES", value: states });
      setAuth(true);
      setInit(false);
    } catch (e) {
      setInit(false);
    }
  }, []);
  if (init) return <p>Loading</p>;
  if (auth)
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  return <Redirect to={{ pathname: "/login" }} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
};

ProtectedRoute.defaultProps = {
  component: "",
};

export default ProtectedRoute;
