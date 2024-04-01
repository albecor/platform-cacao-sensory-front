import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCacaoContext } from "context";
import routes from "routes";
import { loginApi } from "api";
import EmailInput from "layouts/Form/email";
import PasswordInput from "layouts/Form/password";
import CoverLayout from "pages/authentication/CoverLayout";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import BackGround from "assets/images/bck.png";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const { SuiAlert, setAlertStatus } = suiAlert({ color: "error" });
  const [controller, dispatch] = useCacaoContext();
  const [, setCookie] = useCookies();
  const history = useHistory();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { token, rol } = await loginApi(data);
      dispatch({ type: "ROUTES", value: routes[rol] });
      dispatch({ type: "USER", value: { ...controller.user, token } });
      setCookie("cacao", token);
      history.push("/");
    } catch (err) {
      setLoading(false);
      setErrorF({ internal_code: "Ops!", message: err.response.data.message });
      setAlertStatus(true);
    }
  };
  const clearState = () => {
    setErrorF({ internal_code: "", message: "" });
    setLoading(false);
    setAlertStatus(false);
  };
  return (
    <CoverLayout title="Bienvenido" image={BackGround}>
      {errorF.internal_code.length > 0 && (
        <SuiAlert title={errorF.internal_code} body={errorF.message} />
      )}
      <SuiBox
        component="form"
        role="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <EmailInput
          callback={clearState}
          control={control}
          emailError={errors.email}
        />
        <PasswordInput
          callback={clearState}
          control={control}
          passwordError={errors.password}
        />
        <SuiBox mt={4} mb={1}>
          <SuiButton
            disabled={Object.keys(errors).length > 0}
            variant="gradient"
            buttonColor="greenDark"
            fullWidth
            type="submit"
          >
            {loading ? (
              <CircularProgress size={17} color="inherit" />
            ) : (
              "ingresar"
            )}
          </SuiButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiTypography
            component={Link}
            to="/recover-password"
            variant="button"
            textColor="red"
            fontWeight="medium"
            textGradient
          >
            Olvidó su contraseña?
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
};

export default Login;
