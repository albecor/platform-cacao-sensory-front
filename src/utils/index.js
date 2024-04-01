const { translations, states } = require("./constants");

export const isEmail = (val) =>
  /^([a-zA-Z0-9_.-]){0,20}@(([a-zA-Z0-9-]){0,20}\.)+([a-zA-Z0-9]{2,4})+$/.test(
    val
  );

export const isNumeric = (val) => /^[0-9]+$/.test(val);
export const isFloat = (val) => /^\d\.?\d?$/.test(val);

export const isMobile = (val) =>
  /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/.test(val.toString());

export const isAlphanumeric = (val) => /^\w+$/.test(val.toString());

export const isStrongPws = (val) =>
  /^(?=.*[A-Z])(?=.*[-#!$@%^&*()_+|~=`{}[\]:";'<>?,./])(?=.*[0-9])(?=.*[a-z]).{8,}$/gm.test(
    val
  );

export const compareObject = (obj1, obj2) =>
  Object.keys(obj1).every((key) => obj1[key] === obj2[key]);

export const parseFincaInfo = (snapshot) => {
  const data = {
    name: snapshot.name?.length > 0 ? snapshot.name : "",
    altitude: snapshot.altitude ? snapshot.altitude : null,
  };
  if (snapshot.state && snapshot.city) {
    data.state = states[snapshot.state].state;
    data.city = states[snapshot.state].cities[snapshot.city];
  }
  const info = [];
  Object.entries(data).map(([label, value]) => {
    if (value || value?.length > 0)
      info.push({ label: translations[label], value });
    return [label, value];
  });
  return info;
};

export const parseProfileInfo = (snapshot) => {
  const data = {
    name: snapshot.name,
    email: snapshot.email,
    document: snapshot.document,
    phone: snapshot.phone,
  };
  const info = [];
  Object.entries(data).map(([label, value]) => {
    if (value || value?.length > 0)
      info.push({ label: translations[label], value });
    return [label, value];
  });
  return info;
};

export const parseSampleInfo = (snapshot) => {
  const data = {
    code: snapshot.code,
    producer: snapshot.producer?.name,
    farm: snapshot.farm?.name,
    variety: snapshot.variety,
    altitude: snapshot.altitude,
  };
  const info = [];
  Object.entries(data).map(([label, value]) => {
    if (value || value?.length > 0)
      info.push({ label: translations[label], value, id: label });
    return [label, value];
  });
  return info;
};

export const formatDate = (date) => {
  const dateFormatted = new Date(date);
  return dateFormatted.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "medium",
  });
};

export const parseEventInfo = (snapshot) => {
  const data = {
    leader: snapshot.leader.name,
    samples: snapshot.samplesCompleted.length,
    testers: snapshot.testers.length,
    startAt: formatDate(snapshot.startAt),
  };
  const info = [];
  Object.entries(data).map(([label, value]) => {
    if (value || value?.length > 0)
      info.push({ label: translations[label], value, id: label });
    return [label, value];
  });
  return info;
};

export const removeEmptyAndUndefined = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null && v !== "")
  );

export const createSample = (snapshot) => {
  const values = removeEmptyAndUndefined(snapshot);
  return {
    sample: {
      altitude: values.altitude,
      code: values.code,
      farm: values.farm,
      producer: values.producer,
      variety: values.variety,
    },
    process: {
      notes: values.notes,
      owner: values.owner,
      state: values.state,
    },
  };
};

export const parsedNewEvent = ({ samples, testers, ...rest }) => ({
  ...rest,
  samples: samples.map((sample) => sample._id),
  testers: testers.map((tester) => tester._id),
  emails: testers.map((tester) => tester.email),
});
