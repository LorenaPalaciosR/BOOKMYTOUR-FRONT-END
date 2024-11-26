import Styles from "../Styles/Form.module.css";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const CustomCalendarInput = forwardRef(({ value, onClick }, ref) => (
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

export default CustomCalendarInput;
