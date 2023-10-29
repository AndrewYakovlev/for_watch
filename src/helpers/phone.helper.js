export const normalizePhone = (phone) => {
  const result = phone.replace(
    /^[\+\d{1,3}\-\s]*\(?([0-9]{3})\)?[-. ]*([0-9]{3})[-. ]*([0-9]{4})$/,
    "$1$2$3"
  );
  return result;
};

export const formatPhone = (
  phone,
  format = "+7 (###) ###-####",
  options = null
) => {
  if (!options || !!options.normalize) {
    phone = normalizePhone(phone);
  }
  let i = 0,
    l = phone.length;
  for (; i < l; i++) {
    format = format.replace("#", phone[i]);
  }
  return format;
};
