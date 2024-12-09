import Styles from "../Styles/Form.module.css";
import { useState } from "react";

const TextInput = ({
  label,
  type,
  placeholder,
  error,
  value,
  onChange,
  name,
  customClass,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={customClass ? customClass : Styles.formField}>
      <label className={Styles.formLabel} htmlFor={label}>
        {label}
      </label>
      <div className={Styles.inputContainer}>
        <input
          className={Styles.formInput}
          type={showPassword && type === "password" ? "text" : type}
          placeholder={placeholder}
          value={onChange ? value : undefined}
          defaultValue={value}
          onChange={onChange}
          name={name}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={Styles.togglePasswordButton}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {error && <span className={Styles.error}>{error}</span>}
    </div>
  );
};

export default TextInput;
