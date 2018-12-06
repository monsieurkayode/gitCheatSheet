export const caps = (str) => {
  const temp = str.toLowerCase();
  return `${temp[0].toUpperCase()}${temp.substr(1)}`;
};

export const validateUserForm = (formData) => {
  const minLength = 3;
  const maxLength = 30;
  const fields = ['username', 'password'];
  const exp = /([a-z]+\d*)+$/gi;
  const errors = {};

  fields.forEach((field) => {
    if (!Object.keys(formData).includes(field)) {
      errors[field] = `${caps(field)} is required`;
    }
  });

  Object.entries(formData).forEach(([key, value]) => {
    if (!fields.includes(key)) return;
    const inputLength = value.toString().trim().length;

    if (!inputLength) { errors[key] = `${caps(key)} is required`; }
    if (inputLength && inputLength < minLength && key === 'username') {
      errors[key] = `${caps(key)} length too short`;
    }
    if (inputLength && inputLength > maxLength && key === 'username') {
      errors[key] = `${caps(key)} length too long`;
    }
    if (inputLength >= minLength
      && inputLength <= maxLength
      && key === 'username') {
      exp.test(value.trim())
        ? null
        : errors[key] = `${caps(key)} is invalid (e.g brooke007)`;
    }
    if (inputLength && key === 'password') {
      inputLength < 6 ? errors[key] = `${caps(key)} not strong enough` : null;
      inputLength >= 6 && (!Object.keys(formData).includes('confirmPassword')
        || (Object.keys(formData).includes('confirmPassword')
          && value !== formData.confirmPassword))
        ? errors.confirmPassword = `${caps(key)}s do not match`
        : null;
    }
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
