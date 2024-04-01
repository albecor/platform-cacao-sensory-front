import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useLocation, NavLink, useHistory } from "react-router-dom";

import PropTypes from "prop-types";

import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import SoftUILogo from "assets/images/logo.png";
import { useCacaoContext, initialState } from "context";
import SuiButton from "../SuiButton";

import styles from "./styles/sidenav";
import stylesCollapse from "./styles/sidenavCollapse";

import SidenavCollapse from "./SidenavCollapse";

function Sidenav({ routes, ...rest }) {
  const [controller, dispatch] = useCacaoContext();
  const { miniSidenav } = controller;
  const [open, setOpen] = useState(false);
  const classes = styles({ miniSidenav });
  const classesTwo = stylesCollapse();
  const location = useLocation();
  const history = useHistory();
  const [, , removeCookie] = useCookies(["cacao"]);
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSizedNav = () => dispatch({ type: "MINI_SIDENAV", value: true });

  useEffect(() => {
    function handleMiniSidenav() {
      dispatch({
        type: "MINI_SIDENAV",
        value: window.innerWidth < 1200,
      });
    }
    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const onLogout = () => {
    removeCookie("cacao");
    dispatch({ type: "ROUTES", value: initialState.routes });
    dispatch({ type: "USER", value: initialState.user });
    history.push("/login");
  };

  function activeRoute(route) {
    return window.location.href.indexOf(route) > -1;
  }

  const renderRoutes = routes
    .filter(({ visible }) => visible)
    .map(({ type, name, icon, title, noCollapse, key, route, logout }) => {
      let returnValue;
      if (type === "nested") {
        returnValue = (
          <SidenavCollapse
            name={name}
            icon={icon}
            noCollapse={noCollapse}
            key={key}
            active={key === collapseName || activeRoute(route)}
            open={open}
            onClick={() => setOpen((prevState) => !prevState)}
          >
            <List component="ul" className={classes.nested_container}>
              {routes
                .filter(({ parent }) => parent === key)
                .map(({ key: subKey, name: subName, route: subRoute }) => (
                  <NavLink to={subRoute} key={subKey}>
                    <ListItem component="li">
                      <SuiBox
                        {...rest}
                        mr={1}
                        ml={0.5}
                        px={2}
                        py={0.5}
                        my={2}
                        customClass={clsx(classes.nested_route, {
                          [classes.nested_route_active]: pathname === subRoute,
                        })}
                      >
                        <ListItemText
                          primary={subName}
                          className={clsx(
                            classesTwo.collapse_text,
                            classes.nested_text,
                            {
                              [classes.nested_text_active]:
                                pathname === subRoute,
                            }
                          )}
                        />
                      </SuiBox>
                    </ListItem>
                  </NavLink>
                ))}
            </List>
          </SidenavCollapse>
        );
      } else if (type === "collapse") {
        returnValue = logout ? (
          <SuiButton
            variant="outlined"
            key={key}
            customClass={classes.sidenav_navlink}
            onClick={onLogout}
          >
            <SidenavCollapse name={name} icon={icon} noCollapse={noCollapse} />
          </SuiButton>
        ) : (
          <NavLink
            to={route}
            key={key}
            className={classes.sidenav_navlink}
            onClick={() => setOpen(false)}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              key={key}
              active={key === collapseName || activeRoute(route)}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <SuiTypography
            key={key}
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            customClass={classes.sidenav_title}
          >
            {title}
          </SuiTypography>
        );
      }

      return returnValue;
    });

  return (
    <Drawer
      {...rest}
      variant="permanent"
      classes={{
        paper: clsx(classes.sidenav, {
          [classes.sidenav_open]: !miniSidenav,
          [classes.sidenav_close]: miniSidenav,
        }),
      }}
    >
      <SuiBox customClass={classes.sidenav_header}>
        <SuiBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          customClass="cursor-pointer"
          onClick={closeSizedNav}
        >
          <SuiTypography variant="h6" textColor="secondary">
            <Close />
          </SuiTypography>
        </SuiBox>
        <SuiBox
          component="img"
          src={SoftUILogo}
          alt="Soft UI Logo"
          customClass={classes.sidenav_logo}
        />
        <SuiBox customClass={classes.sidenav_logoLabel}>
          <SuiTypography
            fontWeight="regular"
            variant="h6"
            textColor="greenDark"
          >
            Cacao Sensory
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <Divider />
      <List>{renderRoutes}</List>
    </Drawer>
  );
}

Sidenav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
