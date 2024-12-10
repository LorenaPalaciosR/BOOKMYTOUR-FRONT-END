import TextInput from "./TextInput";
import MyCalendar from "../Components/MyCalendar";
import Styles from "../Styles/Detalle.module.css";
import { expandDateRanges } from "./utils/calendar";

const TourInformationSection = ({ tour, onChangeDates }) => {
  const excludedDates = expandDateRanges(tour.fechasOcupadas);

  return (
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
          excludedDates={excludedDates}
        />
      </div>
    </section>
  );
};

export default TourInformationSection;
