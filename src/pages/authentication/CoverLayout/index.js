import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Footer from "components/Footer";

import PageLayout from "layouts/PageLayout";

import styles from "./styles";

function CoverLayout({ title, description, image, top, children }) {
  const classes = styles({ image });

  return (
    <PageLayout background="white">
      <Grid container justifyContent="center" className={classes.coverLayout}>
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SuiBox mt={top}>
            <SuiBox pt={3} px={3}>
              <SuiBox mb={1}>
                <SuiTypography
                  variant="h3"
                  fontWeight="bold"
                  textColor="greenDark"
                  textGradient
                >
                  {title}
                </SuiTypography>
              </SuiBox>
              <SuiTypography
                variant="body2"
                fontWeight="regular"
                textColor="text"
              >
                {description}
              </SuiTypography>
            </SuiBox>
            <SuiBox p={3}>{children}</SuiBox>
          </SuiBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SuiBox
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            customClass={classes.coverLayout_imageBox}
          >
            <SuiBox customClass={classes.coverLayout_image} />
          </SuiBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

CoverLayout.defaultProps = {
  title: "",
  description: "",
  top: 20,
};

CoverLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
