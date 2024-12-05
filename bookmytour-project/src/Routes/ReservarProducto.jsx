import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context";
import Button from "../Components/Button";
import MyCalendar from "../Components/MyCalendar";
import TextInput from "../Components/TextInput";
import Styles from "../Styles/Detalle.module.css";

const TourInformationSection = ({ tour, onChangeDates }) => (
  <section className={Styles.formSection}>
    <p>Información del tour</p>
    <TextInput
      label="Tour"
      type="text"
      name="tour-name"
      value={tour.name}
      readonly
      customClass={Styles.formInput}
    />
    <TextInput
      label="Ubicación"
      type="text"
      name="ubicacion"
      value={tour.cityNames.join(", ")}
      readonly
      customClass={Styles.formInput}
    />
    <TextInput
      label="Categoría"
      type="text"
      name="categoria"
      value={tour.categoryName}
      readonly
      customClass={Styles.formInput}
    />
    <TextInput
      label="Duración"
      type="text"
      name="duracion"
      value={tour.duration}
      readonly
      customClass={Styles.formInput}
    />
    <div className={Styles.dateContainer}>
      <label htmlFor="date">Fechas</label>
      <MyCalendar
        duration={Number(tour.duration.split(" ")[0])}
        onChangeDates={onChangeDates}
      />
    </div>
  </section>
);

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
        value={formData.metodoPago}
        onChange={(e) =>
          setFormData({ ...formData, metodoPago: e.target.value })
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

const TourImagePreview = ({ images }) => (
  <div className={Styles.imagePreviewContainer}>
    {images.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Preview ${index + 1}`}
        className={Styles.previewImage}
      />
    ))}
  </div>
);

const PurchaseSummary = ({ tour, paymentMethod, formData }) => (
  <article className={Styles.purchaseSummary}>
    <h3>Resumen de compra</h3>
    <div className={Styles.cartSummary}>
      <p>Tour seleccionado</p>
      <span>{tour.name}</span>
    </div>
    <div className={Styles.cartSummary}>
      <p>Fechas seleccionadas</p>
      <span>
        {formData.fechaInicio} - {formData.fechaFin}
      </span>
    </div>
    <div className={Styles.cartSummary}>
      <p>Duración del tour</p>
      <span>{tour.duration}</span>
    </div>
    <div className={Styles.cartSummary}>
      <p>Método de pago</p>
      <span>{paymentMethod || "No seleccionado"}</span>
    </div>
    <div className={Styles.cartSummary}>
      <p>Costo total</p>
      <span>$ {tour.costPerPerson}</span>
    </div>
  </article>
);

const ReservarProducto = () => {
  const { state } = useContextGlobalStates();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    tourId: id,
    userId: state.user.usuario.userId,
    metodoPago: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const tour = useMemo(
    () => state.data.find((tour) => tour.tourId === parseInt(id)),
    [state.data, id]
  );

  const handleDateChange = (start, end) => {
    const formattedStart = start ? start.toLocaleDateString() : "";
    const formattedEnd = end ? end.toLocaleDateString() : "";

    setFormData((prevData) => ({
      ...prevData,
      fechaInicio: formattedStart,
      fechaFin: formattedEnd,
    }));
  };

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <div className={Styles.reservationContainer}>
      <header className={Styles.pageHeader}>
        <h2>Reservar tour</h2>
        <p>{tour.name}</p>
      </header>
      <div className={Styles.reservationContent}>
        <div className={Styles.formColumn}>
          <TourInformationSection
            tour={tour}
            onChangeDates={handleDateChange}
          />
          <UserInformationSection
            user={state.user}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className={Styles.summaryColumn}>
          <TourImagePreview images={tour.imagenes} />
          <PurchaseSummary
            tour={tour}
            paymentMethod={formData.metodoPago}
            formData={formData}
          />
          <div className={Styles.actionButtons}>
            <Button
              label="Cancelar"
              variant="secondary"
              type="submit"
              onClick={() => navigate(-1)}
            />
            <Button label="Reservar" variant="primary" type="submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservarProducto;
