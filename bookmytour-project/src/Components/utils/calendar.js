export const isDateExcluded = (date, excludedDates) =>
  excludedDates.some(
    (excludedDate) => excludedDate.getTime() === date.getTime()
  );

export const validateRange = (startDate, endDate, excludedDates) => {
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isDateExcluded(currentDate, excludedDates)) {
      return "El rango incluye una fecha bloqueada.";
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return null;
};

export const calculateEndDate = (startDate, duration) => {
  const calculatedEndDate = new Date(startDate);
  calculatedEndDate.setDate(calculatedEndDate.getDate() + duration - 1);
  return calculatedEndDate;
};
