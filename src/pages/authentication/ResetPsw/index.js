import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkResetPassword, resetPassword } from "api";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import PasswordInput from "layouts/Form/password";
import BackGround from "assets/images/bck.png";
import CoverLayout from "../CoverLayout";

const ResetPsw = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);
  const [token, setToken] = useState("");
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const { SuiAlert, setAlertStatus } = suiAlert({ color: "error" });
  const history = useHistory();
  const { search } = useLocation();
  useEffect(async () => {
    try {
      const param = new URLSearchParams(search).get("token");
      if (!param) history.replace("/");
      else {
        await checkResetPassword(param);
        setToken(param);
        setLoad(false);
      }
    } catch (e) {
      setLoad(false);
    }
  }, []);
  const clearState = () => {
    setErrorF({ internal_code: "", message: "" });
    setAlertStatus(false);
    setLoading(false);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.confirm.trim() !== data.password.trim()) {
        setErrorF({
          internal_code: ":(",
          message: "Las contraseñas no coinciden",
        });
        setAlertStatus(true);
        setLoading(false);
      } else {
        await resetPassword(data, token);
        Swal.fire({
          title: "Contraseña cambiada!",
          text: "La contraseña fue cambiada con éxito.",
          icon: "success",
          confirmButtonText: "Iniciar sesión",
        }).then(() => {
          history.push("/login");
        });
      }
    } catch (err) {
      setErrorF({ internal_code: "Ops!", message: err.response.data.message });
      setAlertStatus(false);
      setLoading(false);
    }
  };
  if (load) {
    return (
      <CoverLayout title="Reestablecer Contraseña" image={BackGround}>
        <p>Loading</p>
      </CoverLayout>
    );
  }
  return (
    <CoverLayout title="Reestablecer Contraseña" image={BackGround}>
      {errorF.internal_code.length > 0 && (
        <SuiAlert title={errorF.internal_code} body={errorF.message} />
      )}
      {token ? (
        <SuiBox
          component="form"
          role="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <PasswordInput
            callback={clearState}
            control={control}
            passwordError={errors.password}
          />
          <PasswordInput
            callback={clearState}
            control={control}
            label="Confirmar contraseña"
            name="confirm"
            passwordError={errors.confirm}
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
                "enviar"
              )}
            </SuiButton>
          </SuiBox>
          <SuiBox mt={3} textAlign="center">
            <SuiTypography
              variant="button"
              textColor="text"
              fontWeight="regular"
            >
              Ya tiene una cuenta?{" "}
              <SuiTypography
                component={Link}
                to="/login"
                variant="button"
                textColor="red"
                fontWeight="medium"
                textGradient
              >
                Iniciar sesión
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      ) : (
        <SuiBox>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography
                component="label"
                textColor="title"
                variant="body2"
                fontWeight="bold"
              >
                El link para el cambio de contraseña no es válido o ha expirado.
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox mt={4} mb={1}>
            <SuiButton
              variant="gradient"
              buttonColor="greenDark"
              fullWidth
              type="submit"
              onClick={() => history.replace("/")}
            >
              regresar
            </SuiButton>
          </SuiBox>
        </SuiBox>
      )}
    </CoverLayout>
  );
};

export default ResetPsw;
