import { useState } from "react";
import { bool, func, shape, string } from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { addProducer, editProducer } from "api";
import { compareObject } from "utils";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Modal from "components/Modal";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import { Step1 } from "./steps";

const ProducersModal = ({ cb, producer, token, modal, setModal }) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const [disable, setDisable] = useState(!!producer._id);
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorStatus(false);
      if (producer._id) {
        await editProducer(producer._id, data, token);
      } else {
        await addProducer(data, token);
      }
      setLoading(false);
      setModal(false);
      cb(data);
    } catch (e) {
      setLoading(false);
      setErrorF({ internal_code: "Ops!", message: e.response.data.message });
      setErrorStatus(true);
    }
  };
  const clearState = () => {
    setErrorStatus(false);
    setErrorF({ internal_code: "", message: "" });
    if (producer._id) {
      const values = getValues();
      if (Object.keys(values).length < 1) setDisable(true);
      setDisable(compareObject(values, producer));
    }
  };
  return (
    <Modal
      actions={[
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
      onClose={() => setModal(false)}
      open={modal}
      title={
        <SuiBox pt={3} px={3}>
          <SuiTypography
            variant="h5"
            fontWeight="bold"
            textColor="greenDark"
            textGradient
          >
            {producer._id ? "Editar " : "Agregar "} productor
          </SuiTypography>
        </SuiBox>
      }
    >
      {errorF.internal_code.length > 0 && (
        <ErrorAlert title={errorF.internal_code} body={errorF.message} />
      )}
      <Step1
        clearState={clearState}
        control={control}
        errors={errors}
        producer={producer}
      />
    </Modal>
  );
};

ProducersModal.defaultProps = {
  cb: () => "",
  token: "",
  modal: false,
  setModal: () => "",
  producer: { name: "" },
};

ProducersModal.propTypes = {
  cb: func,
  producer: shape({}),
  token: string,
  modal: bool,
  setModal: func,
};

export default ProducersModal;
