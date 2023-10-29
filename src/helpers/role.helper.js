export const getRole = (role) => {
  if (role === "admin") return "Руководитель";
  if (role === "rop") return "Руководитель отдела продаж";
  if (role === "manager") return "Менеджер";
  if (role === "fitter") return "Монтажник";
  if (role === "stockman") return "Кладовщик";
  if (role === "constructor") return "Конструктор";
};
