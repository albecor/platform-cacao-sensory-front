import { arrayOf, func, shape } from "prop-types";
import { Grid } from "@material-ui/core";
import EmptyContent from "components/EmptyContent";
import SuiBox from "components/SuiBox";
import SuiCheckbox from "components/SuiInput/checkbox";
import SuiTypography from "components/SuiTypography";
import RowUser from "components/Table/rowUser";
import TableLayout from "layouts/Tables";
import DateInput from "layouts/Form/date";
import TextInput from "layouts/Form/text";
import SelectInput from "layouts/Form/select";
import { formatDate } from "utils";

export const Step1 = ({ handleSample, list, samples }) => (
  <>
    {samples.length < 1 ? (
      <EmptyContent message="No hay muestras listas para catar" />
    ) : (
      <TableLayout
        columns={[
          { accessor: "code", align: "left", Header: "código" },
          { accessor: "producer", align: "left", Header: "productor" },
        ]}
        rows={samples.map((sample) => ({
          code: (
            <SuiBox alignItems="center" display="flex">
              <SuiCheckbox
                checked={list.includes(sample)}
                onChange={() => handleSample(sample)}
              />
              <SuiTypography variant="button" fontWeight="medium">
                {sample.code}
              </SuiTypography>
            </SuiBox>
          ),
          producer: (
            <SuiBox display="flex" flexDirection="column">
              <SuiTypography
                variant="caption"
                fontWeight="medium"
                textColor="text"
              >
                {sample.producer}
              </SuiTypography>
            </SuiBox>
          ),
        }))}
      />
    )}
  </>
);
Step1.defaultProps = {
  list: [],
  samples: [],
};
Step1.propTypes = {
  handleSample: func.isRequired,
  list: arrayOf(shape({})),
  samples: arrayOf(shape({})),
};

export const Step2 = ({ handleTester, list, testers }) => (
  <>
    {testers.length < 1 ? (
      <EmptyContent message="No hay catadores" />
    ) : (
      <TableLayout
        columns={[
          { accessor: "name", align: "left", Header: "nombre" },
          { accessor: "data", align: "left", Header: "datos" },
        ]}
        rows={testers.map((tester) => ({
          name: (
            <SuiBox alignItems="center" display="flex">
              <SuiCheckbox
                checked={list.includes(tester)}
                onChange={() => handleTester(tester)}
              />
              <RowUser email={tester.document?.toString()} name={tester.name} />
            </SuiBox>
          ),
          data: (
            <SuiBox display="flex" flexDirection="column">
              <RowUser email={tester.mobile.toString()} name={tester.email} />
            </SuiBox>
          ),
        }))}
      />
    )}
  </>
);
Step2.defaultProps = {
  list: [],
  testers: [],
};
Step2.propTypes = {
  handleTester: func.isRequired,
  list: arrayOf(shape({})),
  testers: arrayOf(shape({})),
};

export const Step3 = ({ control, errors, getValues, testers }) => (
  <SuiBox px={2}>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={11} sm={6}>
        <DateInput
          label="Fecha del evento"
          control={control}
          customError={errors.startAt?.type === "required" && "Fecha requerida"}
          defaultValue={getValues("startAt") || new Date()}
          name="startAt"
        />
        <SelectInput
          control={control}
          name="leader"
          label="Analista líder"
          defaultValue={getValues("leader")}
          options={testers.map((i) => ({
            value: i._id,
            label: i.name,
          }))}
          helperText={errors.leader?.type === "required" && "Líder requerido"}
        />
      </Grid>
      <Grid item xs={11} sm={6}>
        <TextInput
          control={control}
          multiline
          rows={8}
          name="notes"
          label="Notas"
          rules={{ required: false }}
        />
      </Grid>
    </Grid>
  </SuiBox>
);
Step3.propTypes = {
  control: shape({}).isRequired,
  errors: shape({}).isRequired,
  getValues: func.isRequired,
  testers: arrayOf(shape({})).isRequired,
};

export const Step4 = ({ samples, testers, values }) => (
  <SuiBox px={3}>
    <SuiBox display="flex" py={1} pr={2}>
      <SuiTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        Muestras:{" "}
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;
          {samples.map((sample) => `${sample.code}, `)}
        </SuiTypography>
      </SuiTypography>
    </SuiBox>
    <SuiBox display="flex" py={1} pr={2}>
      <SuiTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        Catadores:{" "}
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;
          {testers.map((tester) => `${tester.name}, `)}
        </SuiTypography>
      </SuiTypography>
    </SuiBox>
    <SuiBox display="flex" py={1} pr={2}>
      <SuiTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        Catador líder:
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;
          {testers.find((el) => el._id === values.leader).name}
        </SuiTypography>
      </SuiTypography>
    </SuiBox>
    <SuiBox display="flex" py={1} pr={2}>
      <SuiTypography variant="button" fontWeight="bold">
        Fecha del evento:{" "}
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;
          {formatDate(values.startAt)}
        </SuiTypography>
      </SuiTypography>
    </SuiBox>
    <SuiBox display="flex" py={1} pr={2}>
      <SuiTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        notas:{" "}
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;
          {values.notes}
        </SuiTypography>
      </SuiTypography>
    </SuiBox>
  </SuiBox>
);
Step4.propTypes = {
  samples: arrayOf(shape({})).isRequired,
  testers: arrayOf(shape({})).isRequired,
  values: shape({}).isRequired,
};
