import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { recoverPassword } from "api";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import EmailInput from "layouts/Form/email";
import BackGround from "assets/images/bck.png";
import CoverLayout from "../CoverLayout";

const RecoverPsw = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await recoverPassword(data);
      setLoading(false);
      setErrorStatus(false);
      Swal.fire({
        title: "Correo enviado!",
        text: "Un correo fue enviado con instrucciones para el cambio de contraseña.",
        icon: "success",
        confirmButtonText: "Ok!",
      }).then(() => {
        history.push("/login");
      });
    } catch (err) {
      setLoading(false);
      setErrorF({ internal_code: "Ops!", message: err.response.data.message });
      setErrorStatus(true);
    }
  };
  const clearState = () => {
    setErrorStatus(false);
    setErrorF({ internal_code: "", message: "" });
  };
  return (
    <CoverLayout
      description="Se enviará un link a su correo para recuperar su contraseña"
      title="Recuperar Contraseña"
      image={BackGround}
    >
      {errorF.internal_code.length > 0 && (
        <ErrorAlert title={errorF.internal_code} body={errorF.message} />
      )}
      <SuiBox
        disabled={Object.keys(errors).length > 0}
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
        <SuiBox mt={4} mb={1}>
          <SuiButton
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
            component={Link}
            to="/login"
            variant="button"
            textColor="red"
            fontWeight="medium"
            textGradient
          >
            Regresar
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
};

export default RecoverPsw;
