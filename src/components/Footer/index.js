import { Box, Grid } from "@material-ui/core";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import styles from "./styles";

function Footer() {
  const classes = styles();
  return (
    <SuiBox customClass={classes.container} component="footer" pt={6}>
      <Grid container>
        <Grid item xs={2}>
          <Box display="flex" textAlign="center">
            <img
              className={classes.image}
              width="100%"
              src="./cesurcafe.png"
              alt="cesurcafe"
            />
          </Box>
        </Grid>
        <Grid item justifyContent="center" xs container>
          <Grid item xs={12} lg={8} className="text-center">
            <SuiBox display="flex" justifyContent="center" flexWrap="wrap">
              <SuiTypography variant="body2" textColor="secondary">
                Cesurcafé
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={8} className="text-center">
            <SuiBox display="flex" justifyContent="center" flexWrap="wrap">
              <SuiTypography variant="body2" textColor="secondary">
                GETI - Grupo de Investigación en Electrónica, Telecomunicaciones
                e Informática
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={8} className="text-center">
            <SuiBox display="flex" justifyContent="center" flexWrap="wrap">
              <SuiTypography variant="body2" textColor="secondary">
                Agroindustria Usco
              </SuiTypography>
            </SuiBox>
          </Grid>
          <Grid item xs={12} lg={8} className="text-center">
            <SuiBox display="flex" justifyContent="center" flexWrap="wrap">
              <SuiTypography variant="body2" textColor="secondary">
                Copyright &copy; 2021 Soft by GETI - USCO.
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" textAlign="center">
            <img
              className={classes.image}
              src="https://www.usco.edu.co/imagen-institucional/logo/universidad-surcolombiana-vm.png"
              alt="USCO"
            />
          </Box>
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default Footer;
