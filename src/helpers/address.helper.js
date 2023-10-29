export const normalizeAddress = (address) => {
  delete address.data?.history_values;
  return {
    value: address.value,
    unrestricted_value: address.value,
    ...address.data,
  };
};
