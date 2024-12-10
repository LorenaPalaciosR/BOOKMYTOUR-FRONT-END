import CardBooking from "../Components/CardBooking";
import { useContextGlobalStates } from "../Components/utils/global.context";
import { useBooking } from "../hooks/useBooking";
import { useEffect } from "react";
import styles from "../Styles/MisReservas.module.css";

const MisReservas = () => {
  const { fetchBookings, bookings } = useBooking();
  const { state } = useContextGlobalStates();

  const filteredTours = bookings.filter((booking) =>
    booking.nombreUsuario
      .toLowerCase()
      .includes(state.user.usuario.firstName.toLowerCase())
  );

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px", minHeight: "70dvh" }}>
      <h1 style={{ textAlign: "center" }}>Mi historial de reservas</h1>
      {filteredTours.length === 0 ? (
        <div style={{ textAlign: "center" }}>No tienes reservas todavía</div>
      ) : (
        <section className={styles.cardContainer}>
          {filteredTours.map((booking) => (
            <CardBooking
              key={booking.bookingId}
              id={booking.bookingId}
              title={booking.nombreTour}
              img={booking.imagenesTour[0]}
              date={`${booking.bookingDate} - ${booking.endDate}`}
              owner={`${booking.nombreUsuario} ${booking.apellidoUsuario}`}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default MisReservas;
