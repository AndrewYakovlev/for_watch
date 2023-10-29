import {incline} from "lvovich";

export const getFullFio = (person, p) => {
  const fio = incline(person, p)
  return {
    value: fio.last + ' ' + fio.first + ' ' + fio.middle,
    gender: fio.gender
  }
};

export const getShortFio = (person, p) => {
  const fio = incline(person, p)
  return {
    value: fio.last + ' ' + fio.first[0] + '. ' + fio.middle[0]+'.',
    gender: fio.gender
  }
};
