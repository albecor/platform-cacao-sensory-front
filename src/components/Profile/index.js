import { arrayOf, func, shape, string, node } from "prop-types";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import EmptyContent from "../EmptyContent";

const Profile = ({
  children,
  customWidget,
  customInfo,
  editProfile,
  emptyMessage,
  info,
  list,
  producerClick,
  right,
  table,
  title,
}) => (
  <SuiBox mt={5} mb={3}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} md={12} xl={8}>
        {customInfo ? (
          customInfo()
        ) : (
          <Card>
            <SuiBox pt={2} px={2}>
              <SuiTypography
                variant="h6"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {title}
              </SuiTypography>
            </SuiBox>
            {customWidget ? (
              customWidget()
            ) : (
              <SuiBox pt={1.5} pb={2} px={2}>
                {list.length < 1 ? (
                  <EmptyContent message={emptyMessage} />
                ) : (
                  table()
                )}
              </SuiBox>
            )}
          </Card>
        )}
      </Grid>
      <Grid item xs={12} xl={4}>
        <Card className="h-100">
          <SuiBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
            px={2}
          >
            <SuiTypography variant="h6" fontWeight="medium">
              {right}
            </SuiTypography>
            {editProfile && (
              <SuiTypography
                onClick={editProfile}
                variant="button"
                textColor="secondary"
              >
                <Tooltip title="Editar" placement="top">
                  <Icon className="material-icons-round">edit</Icon>
                </Tooltip>
              </SuiTypography>
            )}
          </SuiBox>
          <SuiBox p={2}>
            <SuiBox>
              {info.map((data, key) => (
                <SuiBox key={key} display="content" py={1} pr={2}>
                  <SuiTypography variant="button" fontWeight="bold">
                    {data.label}: &nbsp;
                  </SuiTypography>
                  {data.label === "producer" ? (
                    <SuiBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      pt={2}
                      px={2}
                    >
                      <SuiTypography
                        variant="button"
                        fontWeight="regular"
                        textColor="text"
                      >
                        &nbsp;{data.value}
                      </SuiTypography>
                      <SuiTypography
                        onClick={producerClick}
                        variant="button"
                        textColor="secondary"
                      >
                        <Tooltip title="Ver perfil" placement="top">
                          <Icon className="material-icons-round">add</Icon>
                        </Tooltip>
                      </SuiTypography>
                    </SuiBox>
                  ) : (
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="text"
                    >
                      &nbsp;{data.value}
                    </SuiTypography>
                  )}
                </SuiBox>
              ))}
            </SuiBox>
          </SuiBox>
          {children}
        </Card>
      </Grid>
    </Grid>
  </SuiBox>
);

Profile.propTypes = {
  children: node,
  customWidget: func,
  customInfo: func,
  editProfile: func,
  emptyMessage: string,
  info: arrayOf(shape({})),
  list: arrayOf(shape({})),
  right: string,
  table: func,
  producerClick: func,
  title: string,
};

Profile.defaultProps = {
  children: null,
  customWidget: null,
  customInfo: null,
  editProfile: null,
  producerClick: null,
  emptyMessage: "",
  info: [{}],
  list: [],
  right: "Información del perfil",
  table: null,
  title: "",
};

export default Profile;
