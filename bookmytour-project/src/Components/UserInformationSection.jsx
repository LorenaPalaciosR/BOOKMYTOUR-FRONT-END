import TextInput from "./TextInput";
import Styles from "../Styles/Detalle.module.css";

const UserInformationSection = ({ user, formData, setFormData }) => (
  <section className={Styles.formSection}>
    <p>Información del usuario</p>
    <TextInput
      label="Nombre"
      type="text"
      name="nombre"
      value={user.usuario.firstName}
      readonly
      customClass={Styles.formInput}
    />
    <TextInput
      label="Apellido"
      type="text"
      name="apellido"
      value={user.usuario.lastName}
      readonly
      customClass={Styles.formInput}
    />
    <TextInput
      label="Correo electrónico"
      type="text"
      name="correo"
      value={user.usuario.email}
      readonly
      customClass={Styles.formInput}
    />
    <div className={Styles.paymentMethodContainer}>
      <label htmlFor="select">Método de pago:</label>
      <select
        id="select"
        name="metodoPago"
        value={formData.paymentMethod}
        onChange={(e) =>
          setFormData({ ...formData, paymentMethod: e.target.value })
        }
      >
        <option value="" disabled>
          Selecciona un método de pago
        </option>
        {[
          "Visa",
          "Mastercard",
          "American Express",
          "Diners Club",
          "Discover",
          "Carta de Crédito",
        ].map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  </section>
);

export default UserInformationSection;
