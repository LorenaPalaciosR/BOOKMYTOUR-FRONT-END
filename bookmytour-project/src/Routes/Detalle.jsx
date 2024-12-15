import { useState } from "react";
import Styles from "../Styles/Detalle.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context";
import Swal from "sweetalert2";
import Slider from "react-slick";
import Characteristics from "../Components/Characteristics";
import MyCalendar from "../Components/MyCalendar";
import { expandDateRanges } from "../Components/utils/calendar";

const Detail = () => {
  const { id } = useParams();
  const { state, dispatch } = useContextGlobalStates();
  const navigate = useNavigate();
  const [zoomImage, setZoomImage] = useState(null);

  // Filtrar el tour específico según el ID
  const tour = state.data.find((tour) => tour.tourId === parseInt(id));

  const isFav = state.favs.find((favid) => favid === tour.tourId);
  const addFav = () =>
    dispatch({ type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: tour.tourId });
  const user = localStorage.getItem("user");
  const usuario = JSON.parse(user);

  if (!tour) {
    return <div style={{ height: "100vh" }}>Tour no encontrado</div>; // Mensaje si el tour no se encuentra
  }

  // Configuración del carrusel
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    waitForAnimate: false,
    autoplaySpeed: 2000,
    arrows: false,
    cssEase: "linear",
  };

  const excludedDates = expandDateRanges(tour.fechasOcupadas);
  const handleSchedule = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(`/reservarProducto/${id}`);
    } else {
      Swal.fire({
        title: "¡Oups!",
        text: "Para agendar un tour, necesitas estar logueado.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.container}>
        <div className={Styles.mainImage}>
          <img src={tour.imagenes[0]} alt={tour.imagenes[0]} />
          <div className={Styles.littleCard}>
            <h3>{tour.name}</h3>
            <p>{tour.summary}</p>
            <button onClick={handleSchedule}>¡Agenda ahora!</button>
          </div>
        </div>
        <div className={Styles.tourContainer}>
          <div style={{ padding: "15px 0 0 0" }}>
            <button onClick={() => navigate(-1)} className={Styles.btnRegresar}>
              <img src="/images/Arrow left.svg" alt="" />
              Regresar
            </button>
          </div>
          <section className={Styles.tourInfoContainer}>
            <div className={Styles.tourInfo}>
              <Slider {...settings}>
                {tour.imagenes.map(
                  (image, index) =>
                    index != 0 && ( //Omitimos la primera imagen
                      <div key={index} className={Styles.imageWrapper}>
                        <img
                          className={Styles.carouselImage}
                          src={image}
                          alt={`Imagen del tour ${tour.nombre}`}
                          onClick={() => setZoomImage(image)}
                        />
                      </div>
                    )
                )}
              </Slider>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4 style={{ minWidth: "200px" }}>{tour.name}</h4>
                  {!usuario ||
                  !usuario.usuario ||
                  usuario.usuario.rol.rolName === "ADMIN" ? (
                    <span></span>
                  ) : (
                    <button className={Styles.favButton} onClick={addFav}>
                      {isFav ? "❤️" : "🤍"}
                    </button>
                  )}
                </div>
                <h5 style={{ textAlign: "end", width: "100%" }}>
                  $ {tour.costPerPerson}
                </h5>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <span style={{ textAlign: "left" }}>
                  {tour.cityNames.join(", ")}
                </span>
                <span style={{ textAlign: "end" }}>{tour.duration}</span>
              </div>
            </div>
            <div id={Styles.description}>
              <p>{tour.description}</p>
            </div>
          </section>
          <Characteristics />
          <div style={{ padding: "0 15px" }}>
            <h4>Disponibilidad</h4>
            <p>
              Este tour tiene una duración de {tour.duration}, selecciona la
              fecha inicial para verificar la disponibilidad
            </p>
          </div>
          <div
            style={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              widows: "100%",
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            <MyCalendar
              excludedDates={excludedDates}
              duration={Number(tour.duration.split(" ")[0])}
              customProps={{
                inline: true,
              }}
            />
          </div>
        </div>

        {zoomImage && (
          <div className={Styles.lightbox} onClick={() => setZoomImage(null)}>
            <img src={zoomImage} alt="Zoom" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
