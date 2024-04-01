import { useEffect, useState } from "react";
import { bool, func, shape, string } from "prop-types";
import { CircularProgress } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { addSample, editSample, fetchOwners, updateProcess } from "api";
import { useCacaoContext } from "context";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Modal from "components/Modal";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import { compareObject } from "utils";
import { Step1, Step2, Step3, UpdateProcess } from "./steps";

const getTitle = (step, edit = false) => {
  const subtitle = edit ? "Editar" : "Agregar";
  const title = {
    1: `${subtitle} muestra`,
    2: "Proceso",
    3: "Resumen",
  };
  return title[step];
};

const SamplesModal = ({ cb, data, token, modal, setModal }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [controller] = useCacaoContext();
  const [errorF, setErrorF] = useState({ internal_code: "", message: "" });
  const [step, setStep] = useState(1);
  const [disable, setDisable] = useState(!!data._id);
  const [owners, setOwners] = useState([]);
  const buttonText = step === 3 || data._id ? "guardar" : "siguiente";
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    if (step === 3 || data._id) {
      try {
        setLoading(true);
        setErrorStatus(false);
        if (data._id) {
          await editSample(data._id, values, token);
        } else {
          await addSample({ ...values, createdBy: controller.user._id }, token);
        }
        setLoading(false);
        setModal(false);
        cb();
      } catch (e) {
        setLoading(false);
        setErrorF({ internal_code: "Ops!", message: e.response.data.message });
        setErrorStatus(true);
      }
    } else {
      setStep((prevState) => prevState + 1);
    }
  };
  const clearState = () => {
    setErrorStatus(false);
    setErrorF({ internal_code: "", message: "" });
    if (data._id) {
      const values = getValues();
      if (Object.keys(values).length < 1) setDisable(true);
      setDisable(compareObject(values, data));
    }
  };
  useEffect(async () => {
    const list = await fetchOwners(token);
    setOwners(list);
  }, []);
  return (
    <Modal
      actions={[
        step > 1 && (
          <SuiButton
            variant="text"
            buttonColor="secondary"
            onClick={() => setStep((prevState) => prevState - 1)}
            key={1}
          >
            regresar
          </SuiButton>
        ),
        <SuiButton
          disabled={Object.keys(errors).length > 0 || disable}
          variant="gradient"
          buttonColor="greenDark"
          onClick={handleSubmit(onSubmit)}
          key={0}
        >
          {loading ? (
            <CircularProgress size={17} color="inherit" />
          ) : (
            buttonText
          )}
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
            {getTitle(step, !!data._id)}
          </SuiTypography>
        </SuiBox>
      }
      onClose={() => setModal(false)}
    >
      {errorF.internal_code.length > 0 && (
        <ErrorAlert title={errorF.internal_code} body={errorF.message} />
      )}
      {step === 1 && (
        <Step1
          clearState={clearState}
          control={control}
          errors={errors}
          getValues={getValues}
          sample={data}
        />
      )}
      {step === 2 && (
        <Step2
          control={control}
          errors={errors}
          owners={owners}
          setValue={setValue}
          getValues={getValues}
          token={token}
        />
      )}
      {step === 3 && <Step3 owners={owners} values={getValues()} />}
    </Modal>
  );
};

SamplesModal.defaultProps = {
  cb: () => "",
  data: {},
  token: "",
  modal: false,
  setModal: () => "",
};

SamplesModal.propTypes = {
  cb: func,
  data: shape({}),
  token: string,
  modal: bool,
  setModal: func,
};

SamplesModal.Next = ({ cb, modal, process, setModal, token }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState({ internal_code: "", message: "" });
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  useEffect(async () => {
    const list = await fetchOwners(token);
    setOwners(list);
  }, []);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorStatus(false);
      await updateProcess(process._id, data, token);
      setLoading(false);
      setModal(false);
      cb();
    } catch (e) {
      setLoading(false);
      setError({ internal_code: "Ops!", message: e.response.data.message });
      setErrorStatus(true);
    }
  };
  const clearState = () => {
    setErrorStatus(false);
    setError({ internal_code: "", message: "" });
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
          variant="gradient"
          buttonColor="greenDark"
          onClick={handleSubmit(onSubmit)}
          key={0}
        >
          {loading ? (
            <CircularProgress size={17} color="inherit" />
          ) : (
            `enviar muestra para ${process.state.label}`
          )}
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
            Continuar proceso
          </SuiTypography>
        </SuiBox>
      }
    >
      {error.internal_code.length > 0 && (
        <ErrorAlert title={error.internal_code} body={error.message} />
      )}
      <UpdateProcess
        clearState={clearState}
        control={control}
        errors={errors}
        owners={owners}
      />
    </Modal>
  );
};

SamplesModal.Next.defaultProps = {
  token: "",
  modal: false,
  setModal: null,
};

SamplesModal.Next.propTypes = {
  cb: func.isRequired,
  process: shape({}).isRequired,
  token: string,
  modal: bool,
  setModal: func,
};

export default SamplesModal;
