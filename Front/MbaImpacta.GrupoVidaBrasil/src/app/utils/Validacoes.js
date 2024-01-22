export function ValidaData(valor) {
  if (
    !valor ||
    valor === "Invalid Date" ||
    (typeof valor !== "string" &&
      !isTimestamp(valor) &&
      !(valor instanceof Date))
  ) {
    return false;
  }

  const data = new Date(valor);

  // eslint-disable-next-line no-self-compare
  return data.getTime() === data.getTime(); // Se a data não for válida, retorna NaN, Nan sempre é diferente de NaN
}

export function isTimestamp(valor) {
  return (
    typeof valor === "number" && String(new Date(valor).getTime()).length >= 13
  );
}

export function ValidaEmail(email) {
  const expression = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (expression.test(email)) return true;
  return false;
}
