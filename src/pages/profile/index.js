import { useState } from "react";
import Swal from "sweetalert2";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useCacaoContext } from "context";
import { updateInfo, updatePassword } from "api";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import { compareObject } from "utils";
import DocumentInput from "layouts/Form/document";
import EmailInput from "layouts/Form/email";
import MobileInput from "layouts/Form/mobile";
import NameInput from "layouts/Form/name";
import PasswordInput from "layouts/Form/password";
import colors from "assets/theme/base/colors";
import styles from "./styles";

const Profile = () => {
  const classes = styles();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const {
    control: controlTwo,
    handleSubmit: handleSubmitTwo,
    formState: { errors: errorsTwo },
  } = useForm();
  const [controller, dispatch] = useCacaoContext();
  const [cookies] = useCookies(["cacao"]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingPsw, setLoadingPsw] = useState(false);
  const token = cookies.cacao;
  const [errorInfo, setErrorInfo] = useState({
    internal_code: "",
    message: "",
  });
  const [errorPsw, setErrorPsw] = useState({ internal_code: "", message: "" });
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const { SuiAlert: ErrorAlertTwo, setAlertStatus: setErrorStatusTwo } =
    suiAlert({
      color: "error",
    });
  const changesMade = () => {
    const values = getValues();
    const info = { ...controller.user, rol: controller.user.rol._id };
    if (Object.keys(values).length < 1) return setDisabled(true);
    return setDisabled(compareObject(values, info));
  };
  const updateProfile = async (data) => {
    try {
      setLoading(true);
      await updateInfo(data, token);
      dispatch({ type: "USER", value: { ...controller.user, ...data } });
      setLoading(false);
      setErrorStatus(false);
      await Swal.fire({
        title: "Información actualizada!",
        icon: "success",
        confirmButtonText: "Ok!",
        confirmButtonColor: colors.greenDark.main,
      });
    } catch (e) {
      setLoading(false);
      setErrorInfo({
        internal_code: "Ops!",
        message: e.errorMessage || e.response.data.message,
      });
      setErrorStatus(true);
    }
  };
  const changePassword = async (data) => {
    try {
      setLoadingPsw(true);
      await updatePassword(data, token);
      setLoadingPsw(false);
      setErrorStatusTwo(false);
      await Swal.fire({
        title: "Contraseña actualizada!",
        text: "Se envió un correo de confirmación.",
        icon: "success",
        confirmButtonText: "Ok!",
        confirmButtonColor: colors.greenDark.main,
      });
    } catch (e) {
      setLoadingPsw(false);
      setErrorPsw({
        internal_code: "Ops!",
        message: e.errorMessage || e.response.data.message,
      });
      setErrorStatusTwo(true);
    }
  };
  const clearState = () => {
    setErrorStatusTwo(false);
    setErrorPsw({ internal_code: "", message: "" });
    setLoading(false);
  };
  return (
    <SuiBox>
      <Grid container spacing={2}>
        <Grid item xs={12} pt={2}>
          <Card>
            <SuiBox p={2}>
              <SuiTypography variant="h6" fontWeight="medium">
                Información Básica
              </SuiTypography>
            </SuiBox>
            {errorInfo.internal_code.length > 0 && (
              <ErrorAlert
                title={errorInfo.internal_code}
                body={errorInfo.message}
              />
            )}
            <SuiBox px={2} pb={2}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={11} sm={6}>
                  <NameInput
                    callback={changesMade}
                    control={control}
                    defaultValue={controller.user.name}
                    nameError={errors.name}
                  />
                </Grid>
                <Grid item xs={11} sm={6}>
                  <EmailInput
                    callback={changesMade}
                    control={control}
                    defaultValue={controller.user.email}
                    nameError={errors.email}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={11} sm={6}>
                  <DocumentInput
                    callback={changesMade}
                    control={control}
                    documentError={errors.document}
                    defaultValue={controller.user.document.toString()}
                  />
                </Grid>
                <Grid item xs={11} sm={6}>
                  <MobileInput
                    callback={changesMade}
                    control={control}
                    defaultValue={controller.user.mobile.toString()}
                    mobileError={errors.mobile}
                  />
                </Grid>
              </Grid>
            </SuiBox>
            <SuiBox px={2} pb={2} customClass={classes.buttonSave}>
              <SuiBox>
                <SuiButton
                  disabled={!!disabled}
                  onClick={handleSubmit(updateProfile)}
                  variant="gradient"
                  size="small"
                  buttonColor="greenDark"
                >
                  {loading ? (
                    <CircularProgress size={17} color="inherit" />
                  ) : (
                    "Guardar Cambios"
                  )}
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </Card>
        </Grid>
        <Grid item xs={12} pt={2}>
          <Card>
            <SuiBox p={2}>
              <SuiTypography variant="h6" fontWeight="medium">
                Cambiar Contraseña
              </SuiTypography>
            </SuiBox>
            {errorPsw.internal_code.length > 0 && (
              <ErrorAlertTwo
                title={errorPsw.internal_code}
                body={errorPsw.message}
              />
            )}
            <SuiBox px={2} pb={2}>
              <Grid container justifyContent="center">
                <Grid item xs={11} sm={12}>
                  <PasswordInput
                    callback={clearState}
                    control={controlTwo}
                    label="Contraseña Actual"
                    name="current"
                    passwordError={errorsTwo.current}
                  />
                </Grid>
                <Grid item xs={11} sm={12}>
                  <PasswordInput
                    callback={clearState}
                    control={controlTwo}
                    label="Nueva Contraseña"
                    name="password"
                    passwordError={errorsTwo.password}
                  />
                </Grid>
                <Grid item xs={11} sm={12}>
                  <PasswordInput
                    callback={clearState}
                    control={controlTwo}
                    label="Confirmar Nueva Contraseña"
                    name="confirm"
                    passwordError={errorsTwo.confirm}
                  />
                </Grid>
              </Grid>
              <SuiBox mt={2} mb={1}>
                <SuiTypography variant="h6" fontWeight="medium">
                  Requisitos de contraseña
                </SuiTypography>
              </SuiBox>
              <SuiBox customClass={classes.twoColumn}>
                <ul className={classes.list}>
                  <li>
                    <SuiTypography fontWeight="medium" variant="button">
                      Mínimo 8 caracteres
                    </SuiTypography>
                  </li>
                  <li>
                    <SuiTypography fontWeight="medium" variant="button">
                      Una mayúscula
                    </SuiTypography>
                  </li>
                  <li>
                    <SuiTypography fontWeight="medium" variant="button">
                      Una minúscula
                    </SuiTypography>
                  </li>
                  <li>
                    <SuiTypography fontWeight="medium" variant="button">
                      Un carácter especial
                    </SuiTypography>
                  </li>
                  <li>
                    <SuiTypography fontWeight="medium" variant="button">
                      Un número
                    </SuiTypography>
                  </li>
                </ul>
                <SuiButton
                  disabled={Object.keys(errorsTwo).length > 0}
                  onClick={handleSubmitTwo(changePassword)}
                  variant="gradient"
                  buttonColor="greenDark"
                  size="small"
                >
                  {loadingPsw ? (
                    <CircularProgress size={17} color="inherit" />
                  ) : (
                    "Actualizar contraseña"
                  )}
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </Card>
        </Grid>
      </Grid>
    </SuiBox>
  );
};

export default Profile;
