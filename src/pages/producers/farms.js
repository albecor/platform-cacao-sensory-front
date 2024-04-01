import { CircularProgress } from "@material-ui/core";
import { bool, func, shape, string } from "prop-types";
import { useState } from "react";
import { addFarm, editFarm } from "api";
import Modal from "components/Modal";
import suiAlert from "components/SuiAlert";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { useForm } from "react-hook-form";
import { compareObject } from "utils";
import { Step2 } from "./steps";

const FarmModal = ({ cb, farm, token, modal, producer, setModal }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const onSubmit = async (data) => {
    try {
      const snap = { ...data };
      setLoading(true);
      setErrorStatus(false);
      if (farm._id) {
        await editFarm(farm._id, { ...data, producer, name: snap.farm }, token);
      } else {
        const { id } = await addFarm({ ...data, producer }, token);
        snap._id = id;
      }
      setErrorStatus(false);
      setLoading(false);
      setModal(false);
      cb({ ...snap, name: snap.farm });
    } catch (e) {
      setLoading(false);
      setErrorF({ internal_code: "Ops!", message: e.response.data.message });
      setErrorStatus(true);
    }
  };
  const clearState = () => {
    setErrorStatus(false);
    setErrorF({ internal_code: "", message: "" });
    if (farm._id) {
      const values = getValues();
      if (Object.keys(values).length < 1) setDisable(true);
      setDisable(compareObject(values, farm));
    } else {
      setDisable(false);
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
            {farm._id ? "Editar" : "Agregar"} Finca
          </SuiTypography>
        </SuiBox>
      }
    >
      {errorF.internal_code.length > 0 && (
        <ErrorAlert title={errorF.internal_code} body={errorF.message} />
      )}
      <Step2
        getValues={getValues}
        control={control}
        values={farm}
        errors={errors}
        clearState={clearState}
        hasTitle={false}
      />
    </Modal>
  );
};

FarmModal.defaultProps = {
  cb: () => "",
  token: "",
  modal: false,
  setModal: () => "",
  farm: {},
};

FarmModal.propTypes = {
  cb: func,
  farm: shape({}),
  token: string,
  producer: string.isRequired,
  modal: bool,
  setModal: func,
};

export default FarmModal;
