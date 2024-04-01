import { useState } from "react";
import { bool, func, shape, string } from "prop-types";
import { CircularProgress, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { addUser, modifyUser } from "api";
import { compareObject } from "utils";
import DocumentInput from "layouts/Form/document";
import EmailInput from "layouts/Form/email";
import MobileInput from "layouts/Form/mobile";
import NameInput from "layouts/Form/name";
import PasswordInput from "layouts/Form/password";
import RolInput from "layouts/Form/rol";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Modal from "components/Modal";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";

const UsersModal = () => {};

UsersModal.Add = ({ cb, token, modal, setModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorStatus(false);
      await addUser(data, token);
      setLoading(false);
      setModal(false);
      cb();
    } catch (e) {
      setLoading(false);
      setErrorF({ internal_code: "Ops!", message: e.response.data.message });
      setErrorStatus(true);
    }
  };
  return (
    <Modal
      actions={[
        <SuiButton
          variant="text"
          buttonColor="secondary"
          onClick={() => setModal(false)}
          key={1}
        >
          cancelar
        </SuiButton>,
        <SuiButton
          disabled={Object.keys(errors).length > 0}
          variant="gradient"
          buttonColor="greenDark"
          onClick={handleSubmit(onSubmit)}
          key={0}
        >
          {loading ? <CircularProgress size={17} color="inherit" /> : "agregar"}
        </SuiButton>,
      ]}
      open={modal}
      title={
        <SuiBox pt={3} px={3}>
          <SuiTypography
            variant="h5"
            fontWeight="bold"
            textColor="greenDark"
            textGradient
          >
            Nuevo usuario
          </SuiTypography>
        </SuiBox>
      }
    >
      {errorF.internal_code.length > 0 && (
        <ErrorAlert title={errorF.internal_code} body={errorF.message} />
      )}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <NameInput control={control} nameError={errors.name} />
        </Grid>
        <Grid item xs={11} sm={6}>
          <RolInput control={control} rolError={errors.rol} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <EmailInput control={control} emailError={errors.email} />
        </Grid>
        <Grid item xs={11} sm={6}>
          <PasswordInput
            label="Contraseña *"
            control={control}
            passwordError={errors.password}
            tooltip
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <DocumentInput control={control} documentError={errors.document} />
        </Grid>
        <Grid item xs={11} sm={6}>
          <MobileInput control={control} mobileError={errors.mobile} />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={12}>
          <SuiTypography
            component="label"
            textColor="red"
            variant="caption"
            fontWeight="bold"
          >
            Los campos marcados con * son obligatorios
          </SuiTypography>
        </Grid>
      </Grid>
    </Modal>
  );
};

UsersModal.Add.defaultProps = {
  cb: () => "",
  token: "",
  modal: false,
  setModal: () => "",
};

UsersModal.Add.propTypes = {
  cb: func,
  token: string,
  modal: bool,
  setModal: func,
};

UsersModal.Edit = ({ cb, data, token, modal, setModal }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [disable, setDisable] = useState(true);
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const [loading, setLoading] = useState(false);
  const changesMade = () => {
    const values = getValues();
    const info = { ...data, rol: data.rol._id };
    if (Object.keys(values).length < 1) return setDisable(true);
    return setDisable(compareObject(values, info));
  };
  const onSubmit = async (body) => {
    try {
      setLoading(true);
      setErrorStatus(false);
      await modifyUser(data._id, body, token);
      setLoading(false);
      setModal(false);
      cb();
    } catch (e) {
      setLoading(false);
      setErrorF({ internal_code: "Ops!", message: e.response.data.message });
      setErrorStatus(true);
    }
  };
  return (
    <Modal
      actions={[
        <SuiButton
          variant="text"
          buttonColor="secondary"
          onClick={() => setModal(false)}
          key={1}
        >
          cancelar
        </SuiButton>,
        <SuiButton
          disabled={Object.keys(errors).length > 0 || disable}
          variant="gradient"
          buttonColor="greenDark"
          onClick={handleSubmit(onSubmit)}
          key={0}
        >
          {loading ? <CircularProgress size={17} color="inherit" /> : "guardar"}
        </SuiButton>,
      ]}
      open={modal}
      title={
        <SuiBox pt={3} px={3}>
          <SuiTypography
            variant="h5"
            fontWeight="bold"
            textColor="greenDark"
            textGradient
          >
            Editar usuario
          </SuiTypography>
        </SuiBox>
      }
    >
      {errorF.internal_code.length > 0 && (
        <ErrorAlert title={errorF.internal_code} body={errorF.message} />
      )}
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={12}>
          <EmailInput
            callback={changesMade}
            control={control}
            defaultValue={data.email}
            nameError={errors.email}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <NameInput
            control={control}
            defaultValue={data.name}
            nameError={errors.name}
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <RolInput
            callback={changesMade}
            control={control}
            defaultValue={data.rol._id}
            disabled={!data.canChangeRol}
            rolError={errors.rol}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <DocumentInput
            callback={changesMade}
            control={control}
            documentError={errors.document}
            defaultValue={data.document.toString()}
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <MobileInput
            callback={changesMade}
            control={control}
            defaultValue={data.mobile.toString()}
            mobileError={errors.mobile}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

UsersModal.Edit.defaultProps = {
  token: "",
  modal: false,
  setModal: () => "",
};

UsersModal.Edit.propTypes = {
  cb: func.isRequired,
  data: shape({}).isRequired,
  token: string,
  modal: bool,
  setModal: func,
};

export default UsersModal;
