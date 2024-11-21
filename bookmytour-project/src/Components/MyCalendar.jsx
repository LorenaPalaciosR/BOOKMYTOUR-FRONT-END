import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import Styles from "../Styles/Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div className={Styles.inputContainer}>
    <input
      type="text"
      value={value}
      onClick={onClick}
      className={Styles.formInput}
      ref={ref}
    />
  </div>
));

const MyCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const excludedDates = [new Date()];

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      showIcon
      selected={startDate}
      selectsRange
      onChange={onChange}
      monthsShown={2}
      minDate={new Date()}
      isClearable={true}
      placeholderText="Select a date"
      excludeDates={excludedDates}
      icon={<img src="/icons/calendar.svg" alt="Calendar Icon" />}
      customInput={<CustomInput />}
      renderCustomHeader={({
        monthDate,
        customHeaderCount,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous"
            }
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month">
            {monthDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next"
            }
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
    />
  );
};

export default MyCalendar;
