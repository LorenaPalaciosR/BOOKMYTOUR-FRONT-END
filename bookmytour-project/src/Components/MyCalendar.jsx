import { useState } from "react";
import DatePicker from "react-datepicker";
import CustomCalendarInput from "./CustomCalendarInput";
import { validateRange, calculateEndDate } from "./utils/calendar";

import "react-datepicker/dist/react-datepicker.css";

const MyCalendar = ({ customProps, duration }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  const excludedDates = [new Date(2024, 11, 4), new Date(2024, 11, 21)];

  const onChange = (dates) => {
    const [start, end] = dates;

    setError(null);

    if (start) {
      if (duration) {
        const calculatedEndDate = calculateEndDate(start, duration);

        const rangeError = validateRange(
          start,
          calculatedEndDate,
          excludedDates
        );
        if (rangeError) {
          setError(rangeError);
          setStartDate(null);
          setEndDate(null);
          return;
        }

        setStartDate(start);
        setEndDate(calculatedEndDate);
        return;
      }

      if (end) {
        const rangeError = validateRange(start, end, excludedDates);
        if (rangeError) {
          setError(rangeError);
          setStartDate(null);
          setEndDate(null);
          return;
        }

        setStartDate(start);
        setEndDate(end);
      } else {
        setStartDate(start);
        setEndDate(null);
      }
    }
  };
  return (
    <>
      <DatePicker
        {...customProps}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onChange={onChange}
        monthsShown={2}
        minDate={new Date()}
        isClearable={true}
        excludeDates={excludedDates}
        placeholderText="Selecciona una fecha"
        customInput={<CustomCalendarInput />}
      />
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </>
  );
};

export default MyCalendar;
