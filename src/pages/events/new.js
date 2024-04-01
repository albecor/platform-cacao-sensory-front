import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { createEvent, fetchSamplesReady, fetchUsers } from "api";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import suiAlert from "components/SuiAlert";
import Swal from "sweetalert2";
import colors from "../../assets/theme/base/colors";
import { Step1, Step2, Step3, Step4 } from "./steps";

const title = {
  1: "Agregue las muestras",
  2: "Agregue los catadores. Recuerde escoger número impar",
  3: "Datos del evento",
  4: "Resumen",
};

const NewEvent = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [cookies] = useCookies(["cacao"]);
  const [step, setStep] = useState(1);
  const [samples, setSamples] = useState([]);
  const [testers, setTesters] = useState([]);
  const [samplesSelected, setSamplesSelected] = useState([]);
  const [testersSelected, setTestersSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ internal_code: "", message: "" });
  const { SuiAlert: ErrorAlert, setAlertStatus: setErrorStatus } = suiAlert({
    color: "error",
  });
  const token = cookies.cacao;
  const buttonText = step === 4 ? "guardar" : "siguiente";
  useEffect(async () => {
    try {
      const samplesList = await fetchSamplesReady(token);
      const testersList = await fetchUsers(token, "/?app=true&hasFilter=true");
      setTesters(testersList);
      setSamples(samplesList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, []);
  const handleSample = (sample) => {
    setSamplesSelected((prevState) => {
      const index = prevState.findIndex((el) => el._id === sample._id);
      if (index > -1) {
        return [...prevState].filter(({ _id }) => _id !== sample._id);
      }
      return [...prevState, sample];
    });
  };
  const handleTester = (tester) => {
    setTestersSelected((prevState) => {
      const index = prevState.findIndex((el) => el._id === tester._id);
      if (index > -1) {
        return [...prevState].filter(({ _id }) => _id !== tester._id);
      }
      return [...prevState, tester];
    });
  };
  const onSubmit = async (data) => {
    if (step === 4) {
      try {
        setLoading(true);
        setErrorStatus(false);
        await createEvent(
          { samples: samplesSelected, testers: testersSelected, ...data },
          token
        );
        setLoading(false);
        Swal.fire({
          title: "Evento creado!",
          icon: "success",
          confirmButtonText: "Ok!",
          confirmButtonColor: colors.greenDark.main,
        }).then(() => {
          history.push("/events/list");
        });
      } catch (e) {
        setLoading(false);
        setError({ internal_code: "Ops!", message: e.response.data.message });
        setErrorStatus(true);
      }
    } else {
      setStep((prevState) => prevState + 1);
    }
  };
  const handleDisable = () => {
    const logicDisable = {
      1: !!samplesSelected.length,
      2: !!testersSelected.length,
      3: getValues("leader"),
      4: true,
    };
    return logicDisable[step];
  };
  return (
    <Card>
      <SuiBox
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <div>
          <SuiTypography variant="h6" fontWeight="medium">
            Nuevo evento
          </SuiTypography>
          <SuiTypography variant="caption" fontWeight="medium">
            {title[step]}
          </SuiTypography>
        </div>
        <div>
          {step > 1 && (
            <SuiButton
              variant="text"
              buttonColor="secondary"
              onClick={() => setStep((prevState) => prevState - 1)}
              key={1}
            >
              regresar
            </SuiButton>
          )}
          <SuiButton
            disabled={!handleDisable()}
            onClick={handleSubmit(onSubmit)}
            variant="gradient"
            buttonColor="greenDark"
          >
            {loading ? (
              <CircularProgress size={17} color="inherit" />
            ) : (
              buttonText
            )}
          </SuiButton>
        </div>
      </SuiBox>
      {error.internal_code.length > 0 && (
        <ErrorAlert title={error.internal_code} body={error.message} />
      )}
      {step === 1 && (
        <Step1
          handleSample={handleSample}
          list={samplesSelected}
          samples={samples}
        />
      )}
      {step === 2 && (
        <Step2
          handleTester={handleTester}
          list={testersSelected}
          testers={testers}
        />
      )}
      {step === 3 && (
        <Step3
          control={control}
          errors={errors}
          getValues={getValues}
          testers={testersSelected}
        />
      )}
      {step === 4 && (
        <Step4
          samples={samplesSelected}
          testers={testersSelected}
          values={getValues()}
        />
      )}
    </Card>
  );
};

export default NewEvent;
