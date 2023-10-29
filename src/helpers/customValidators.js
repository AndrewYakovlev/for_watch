export const validateCodeLength = (code, returnError = true) => {
  if (code.length < 6 || code.length > 6) {
    if (returnError) {
      return { error: "Неверный код подтверждения" };
    } else {
      return false;
    }
  }
  return true;
};

export const validatePhoneLength = (phone, returnError = true) => {
  if (phone.length < 17) {
    if (returnError) {
      return { error: "Введите номер телефона полностью" };
    } else {
      return false;
    }
  }
  return true;
};

export const validatePhoneFormat = (phone, returnError = true) => {
  if (Number(phone[4]) !== 9) {
    if (returnError) {
      return { error: "Введите правильный номер телефона" };
    } else {
      return false;
    }
  }
  return true;
};
