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

export function expandDateRanges(dateRanges) {
  const expandedDates = [];

  dateRanges.forEach((range) => {
    const [start, end] = range.split(" - ");
    let currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 1); 
    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);
    endDate.setDate(endDate.getDate() + 1); 

    while (currentDate <= endDate) {
      expandedDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return expandedDates;
}
