/* eslint-disable no-nested-ternary */
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { arrayOf, bool, func, shape } from "prop-types";
import { useCacaoContext } from "context";
import SelectInput from "layouts/Form/select";
import TextInput from "layouts/Form/text";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import colors from "assets/theme/base/colors";
import { isAlphanumeric, isNumeric, parseSampleInfo } from "utils";

const Option = ({ data, isSelected, setValue }) => (
  <SuiBox
    display="flex"
    alignItems="center"
    style={{
      cursor: "pointer",
      backgroundColor: isSelected
        ? colors.secondary.focus
        : colors.primary.main,
      color: isSelected ? colors.secondary.main : colors.text.main,
    }}
    px={1}
    py={0.5}
    onClick={() => setValue(data)}
  >
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography
        style={{ fontWeight: isSelected && "bold" }}
        variant="button"
        fontWeight="medium"
      >
        {data.label}
      </SuiTypography>
      {data.data.document && (
        <SuiTypography
          style={{ fontWeight: isSelected && "bold" }}
          variant="caption"
          textColor="secondary"
        >
          {data.data.document}
        </SuiTypography>
      )}
    </SuiBox>
  </SuiBox>
);
Option.propTypes = {
  data: shape({}).isRequired,
  isSelected: bool.isRequired,
  setValue: func.isRequired,
};

export const Step1 = ({ clearState, control, errors, getValues, sample }) => {
  const [controller] = useCacaoContext();
  const idProducer = sample.producer?._id || getValues("producer");
  const [farms, setFarms] = useState(
    idProducer
      ? [...controller.farms].filter((item) => item.producer === idProducer)
      : []
  );
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={12}>
          <TextInput
            callback={clearState}
            control={control}
            customError={
              (errors.code?.type === "minLength" &&
                "El código debe tener mínimo 3 caracteres") ||
              (errors.code?.type === "required" && "El código es requerido") ||
              (errors.code?.type === "validate" && "Código inválido")
            }
            defaultValue={sample.code}
            name="code"
            label="Código *"
            rules={{
              required: true,
              minLength: 3,
              validate: (val) => {
                if (val === "") return true;
                return isAlphanumeric(val);
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <SelectInput
            components={{ Option }}
            callback={() => {
              const list = [...controller.farms];
              setFarms(
                list.filter((item) => item.producer === getValues("producer"))
              );
              clearState();
            }}
            control={control}
            defaultValue={sample.producer?._id}
            name="producer"
            label="Productor *"
            options={controller.producers.map((i) => ({
              value: i._id,
              label: i.name,
              data: i,
            }))}
            helperText={
              errors.producer?.type === "required" && "Productor es requerido"
            }
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <SelectInput
            components={{ Option }}
            control={control}
            defaultValue={sample.farm?._id}
            name="farm"
            label="Finca"
            required={false}
            setValue=""
            options={farms.map((i) => ({
              value: i._id,
              label: i.name,
              data: i,
            }))}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11} sm={6}>
          <TextInput
            callback={clearState}
            control={control}
            defaultValue={sample.variety}
            name="variety"
            label="Variedad"
            rules={{
              required: false,
              minLength: 3,
              validate: (val) => {
                if (val === "" || !val) return true;
                return isAlphanumeric(val.toString(), ["es-ES"]);
              },
            }}
            customError={
              (errors.variety?.type === "minLength" &&
                "La variedad debe tener mínimo 3 caracteres") ||
              (errors.variety?.type === "validate" && "Variedad inválido")
            }
          />
        </Grid>
        <Grid item xs={11} sm={6}>
          <TextInput
            callback={clearState}
            control={control}
            defaultValue={sample.altitude?.toString()}
            name="altitude"
            label="Altitud"
            type="number"
            rules={{
              required: false,
              minLength: 1,
              validate: (val) => {
                if (val === "" || !val) return true;
                return isNumeric(val.toString()) && val > 0;
              },
            }}
            customError={
              (errors.altitude?.type === "required" &&
                "La altitud es requerida") ||
              (errors.farm?.type === "minLength" &&
                "La altitud debe tener mínimo 1 caracteres")
            }
          />
        </Grid>
      </Grid>
      <SuiTypography
        component="label"
        textColor="red"
        variant="caption"
        fontWeight="bold"
      >
        Los campos marcados con * son obligatorios
      </SuiTypography>
    </>
  );
};
Step1.propTypes = {
  clearState: func.isRequired,
  control: shape({}).isRequired,
  errors: shape({}).isRequired,
  getValues: func.isRequired,
  sample: shape({}).isRequired,
};

export const Step2 = ({ control, errors, owners, getValues, setValue }) => {
  const initState = getValues("state");
  const [controller] = useCacaoContext();
  const [order, setOrder] = useState(
    initState ? controller.states.find((c) => c._id === initState).order : 0
  );
  const [owner, setOwner] = useState(!!initState);
  const handleState = ({ data }) => {
    if (data.hasOwner) {
      setOwner(true);
    } else {
      setOwner(false);
      setValue("owner", "");
    }
    setOrder(data.order);
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={12}>
          <SelectInput
            components={{ Option }}
            callback={(value) => {
              handleState(value);
            }}
            control={control}
            name="state"
            label="En qué estado inicia la muestra?"
            placeholder="Estado"
            options={controller.states
              .filter((i) => i.create)
              .sort((a, b) =>
                a.order > b.order ? 1 : b.order > a.order ? -1 : 0
              )
              .map((i) => ({
                value: i._id,
                label: `Para ${i.label}`,
                data: i,
              }))}
            helperText={
              errors.state?.type === "required" && "Estado es requerido"
            }
          />
        </Grid>
      </Grid>
      {owner && (
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={12}>
            <SelectInput
              components={{ Option }}
              control={control}
              name="owner"
              label="Seleccione el responsable"
              placeholder="Responsable"
              options={owners.map((i) => ({
                value: i._id,
                label: i.name,
                data: i,
              }))}
              helperText={
                errors.owner?.type === "required" && "Responsable es requerido"
              }
            />
          </Grid>
        </Grid>
      )}
      {order > 1 && (
        <>
          <SuiTypography variant="h6" textColor="secondary" fontWeight="bold">
            Análisis físico:
          </SuiTypography>
          <Grid container justifyContent="center">
            <Grid item xs={11} sm={11}>
              <TextInput
                control={control}
                multiline
                rows={4}
                name="notes"
                label="Notas"
                rules={{ required: false }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
Step2.propTypes = {
  control: shape({}).isRequired,
  errors: shape({}).isRequired,
  owners: arrayOf(shape({})).isRequired,
  getValues: func.isRequired,
  setValue: func.isRequired,
};

export const Step3 = ({ owners, values }) => {
  const [controller] = useCacaoContext();
  const sample = parseSampleInfo({
    code: values.code,
    producer: controller.producers.find(
      (producer) => producer._id === values.producer
    ),
    farm: controller.farms.find((farm) => farm._id === values.farm),
    variety: values.variety,
    altitude: values.altitude,
  });
  const state = controller.states.find((s) => s._id === values.state);
  return (
    <SuiBox px={3}>
      {sample.map((data, key) => (
        <SuiBox key={key} display="flex" py={1} pr={2}>
          <SuiTypography
            variant="button"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {data.label}:{" "}
            <SuiTypography
              variant="button"
              fontWeight="regular"
              textColor="text"
            >
              &nbsp;{data.value}
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      ))}
      <SuiBox display="flex" py={1} pr={2}>
        <SuiTypography
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
        >
          Estado:{" "}
          <SuiTypography variant="button" fontWeight="regular" textColor="text">
            &nbsp;
            {state.list}
          </SuiTypography>
        </SuiTypography>
      </SuiBox>
      {state.order < 6 && (
        <SuiBox display="flex" py={1} pr={2}>
          <SuiTypography
            variant="button"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Responsable:{" "}
            <SuiTypography
              variant="button"
              fontWeight="regular"
              textColor="text"
            >
              &nbsp;{owners.find((owner) => owner._id === values.owner).name}
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      )}
    </SuiBox>
  );
};
Step3.propTypes = {
  owners: arrayOf(shape({})).isRequired,
  values: shape({}).isRequired,
};

export const UpdateProcess = ({ clearState, control, errors, owners }) => (
  <Grid container justifyContent="center">
    <Grid item xs={11} sm={12}>
      <SelectInput
        callback={clearState}
        components={{ Option }}
        control={control}
        name="owner"
        label="Seleccione el responsable"
        placeholder="Responsable"
        options={owners.map((i) => ({
          value: i._id,
          label: i.name,
          data: i,
        }))}
        helperText={
          errors.owner?.type === "required" && "Responsable es requerido"
        }
      />
    </Grid>
    <Grid item xs={11} sm={12}>
      <TextInput
        callback={clearState}
        control={control}
        defaultValue=""
        name="notes"
        label="Notas"
        rules={{ required: false }}
      />
    </Grid>
  </Grid>
);
UpdateProcess.propTypes = {
  clearState: func.isRequired,
  control: shape({}).isRequired,
  errors: shape({}).isRequired,
  owners: arrayOf(shape({})).isRequired,
};
