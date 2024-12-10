import Styles from "../Styles/Card.module.css";

const CardBooking = ({ title, img, date, owner }) => {
  return (
    <div className={Styles.container}>
      <img src={img} alt={img} />
      <h4 className={Styles.title}>{title}</h4>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <p>Fecha de reserva</p>
          <p>{date}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <p>Reservado por</p>
          <p>{owner}</p>
        </div>
      </section>
    </div>
  );
};

export default CardBooking;
