import { Menu as MenuIcon, MenuOpen } from "@material-ui/icons";
import { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Icon from "@material-ui/core/Icon";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import NotificationItem from "components/NotificationItem";

import { useCacaoContext } from "context";
import styles from "./styles";

const Navbar = () => {
  const [controller, dispatch] = useCacaoContext();
  const { miniSidenav, user } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const classes = styles();

  const handleMiniSidenav = () =>
    dispatch({ type: "MINI_SIDENAV", value: !miniSidenav });
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      style={{ marginTop: "1rem" }}
    >
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" className="material-icon-round text-white">
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar position="absolute" color="inherit" className={classes.navbar}>
      <Toolbar className={classes.navbar_container}>
        <SuiBox
          customClass={classes.navbar_row}
          color="inherit"
          mb={{ xs: 1, md: 0 }}
        >
          <SuiTypography
            fontWeight="regular"
            variant="h6"
            textColor="greenDark"
            customClass={classes.greeting}
          >
            Hola,
          </SuiTypography>
          <SuiTypography fontWeight="bold" variant="h6" textColor="greenDark">
            {user.name}
          </SuiTypography>
        </SuiBox>
        <SuiBox customClass={classes.navbar_row}>
          <SuiBox>
            <IconButton
              size="small"
              color="inherit"
              className={classes.navbar_mobile_menu}
              onClick={handleMiniSidenav}
            >
              {miniSidenav ? <MenuOpen /> : <MenuIcon />}
            </IconButton>
            {renderMenu()}
          </SuiBox>
        </SuiBox>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
