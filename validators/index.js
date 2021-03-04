function validateEmail(email) {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(String(email).toLowerCase());
}

module.exports.checkEmails = (value) => {
  const arrayEmails = value.split(',');
  return arrayEmails.every((email) => validateEmail(email));
};
