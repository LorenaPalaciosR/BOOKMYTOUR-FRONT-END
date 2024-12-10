import React, { useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context";
import Button from "../Components/Button";
import Styles from "../Styles/Detalle.module.css";
import TourInformationSection from "../Components/TourInformationSection";
import UserInformationSection from "../Components/UserInformationSection";
import { useBooking } from "../hooks/useBooking";
import { toast, ToastContainer } from "react-toastify";
import { routes } from "../Components/utils/routes";

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
        {formData.bookingDate} - {formData.endDate}
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
  const { state, fetchTours } = useContextGlobalStates();
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  const [formData, setFormData] = React.useState({
    tourId: Number(id),
    userId: state.user.usuario.userId,
    status: "CONFIRMED",
    bookingDate: "",
    endDate: "",
    paymentMethod: "",
  });

  const tour = useMemo(
    () => state.data.find((tour) => tour.tourId === parseInt(id)),
    [state.data, id]
  );

  const handleDateChange = (start, end) => {
    const formattedStart = start
      ? start.toISOString("").replace(/\//g, "-").split("T")[0]
      : "";
    const formattedEnd = end
      ? end.toISOString().replace(/\//g, "-").split("T")[0]
      : "";

    setFormData((prevData) => ({
      ...prevData,
      bookingDate: formattedStart,
      endDate: formattedEnd,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const booking = await createBooking(formData);
      if (booking) {
        toast.success("Reserva exitosa!", {
          position: "top-center",
        });
      }
      fetchTours();
      setTimeout(() => {
        navigate(routes.misReservas);
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("La reserva ya existe", {
          position: "top-center",
        });
      } else {
        toast.error("Hubo un error al crear la reserva", {
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return (
    <div className={Styles.reservationContainer}>
      <ToastContainer position="top-center" />
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
            paymentMethod={formData.paymentMethod}
            formData={formData}
          />
          <div className={Styles.actionButtons}>
            <Button
              label="Cancelar"
              variant="secondary"
              type="submit"
              onClick={() => navigate(-1)}
            />
            <Button
              onClick={handleSubmit}
              label="Reservar"
              variant="primary"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservarProducto;
