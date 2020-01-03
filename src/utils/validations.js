const requriedInput = fieldName => {
  return v => (v && v.length > 0) || `${fieldName} is required`;
};
const minLenght = length => {
  return v =>
    (v && v.length > length) || `Minimum length is ${length} characters`;
};
const maxLenght = length => {
  return v =>
    (v && v.length < length) || `Maximum length is ${length} characters`;
};
const emailFormat = () => {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return v => regex.test(v) || "Must be a valid Email";
};

export default { requriedInput, minLenght, maxLenght, emailFormat };
