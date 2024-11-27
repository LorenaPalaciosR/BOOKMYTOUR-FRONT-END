import React, { useEffect, useState } from "react";
import Styles from "../Styles/Body.module.css";
import Paginacion from "../Styles/Productos.module.css";
import Card from "../Components/Card.jsx";
import { useContextGlobalStates } from "../Components/utils/global.context.jsx";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Home = () => {
  const { state } = useContextGlobalStates();
  const [city, setCity] = useState("");
  const [randomTours, setRandomTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(state.data.length / itemsPerPage);

  // Configuración del carrusel
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    waitForAnimate: false,
    autoplaySpeed: 2000,
    initialSlide: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 434,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getRandomIds = (count) => {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(Math.floor(Math.random() * 15) + 1); // IDs del 1 al 15
    }
    return Array.from(ids);
  };

  useEffect(() => {
    const selectedIds = getRandomIds(4);
    const filteredTours = state.data.filter((tour) =>
      selectedIds.includes(tour.tourId)
    );
    setRandomTours(filteredTours);
  }, [state.data]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar:", city);
  };

  const currentProducts = state.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img
          id={Styles.mainImage}
          src="/images/imagen-marca.png"
          alt="Main-Image"
        />
        <form id={Styles.container} onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Ingresa la ciudad o región"
            id={Styles.input}
          />
          <button
            id={Styles.btnSubmit}
            className={Styles.btnsForm}
            type="submit"
          >
            Buscar
          </button>
          <button
            type="button"
            id={Styles.btnFilter}
            className={Styles.btnsForm}
          >
            <img
              id={Styles.filterIcon}
              src="/images/filterIcon.svg"
              alt="Filter-Icon"
            />
          </button>
        </form>
      </div>
      <div className={Styles.sectionContainer}>
        <h2>Descubre y agenda experiencias únicas en un solo lugar</h2>
        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.5rem",
            color: "#A1A7B0",
          }}
        >
          En <b>BookMyTour</b> nos aseguramos que no compres un viaje, sino una
          <b> experiencia de vida</b>. Tenemos la convicción de que al viajar
          creamos las <b>conexiones</b> y los <b>recuerdos</b> más duraderos de
          nuestra vida. Por eso, ofrecemos tours cuidadosamente diseñados que te
          llevarán a explorar lo mejor de cada destino, sumergiéndote en
          culturas locales y <b>aventuras únicas</b>.
        </p>
      </div>
      <div className={Styles.categories}>
        <h2 className={Styles.subtitles}>Categorías</h2>
        <div className="slider-container">
          <Slider {...settings}>
            {state.categories.map((item) => (
              <Link
                key={item.nombre}
                to={`${window.location.origin}/Categorias/${item.nombre}`}
              >
                <div className={Styles.carouselItem}>
                  <div className={Styles.imageContainer}>
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className={Styles.carouselImage}
                    />
                    <h3 className={Styles.imageText}>{item.nombre}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <div className={Styles.products}>
        <h2 className={Styles.subtitles}>Tours</h2>
        <div className={Styles.cardsContainer}>
          {currentProducts.map((item) => (
            <Card
              id={item.tourId}
              key={item.tourId}
              title={item.name}
              img={item.imagenes[0]}
              price={item.costPerPerson}
              description={item.summary}
            />
          ))}
        </div>

        {/* Paginación con flechas */}
        {totalPages > 1 && (
          <div className={Paginacion.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={Paginacion.arrowButton}
            >
              <i className="fa-arrow-left fa-solid"></i>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={
                  currentPage === index + 1 ? Paginacion.activePage : ""
                }
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={Paginacion.arrowButton}
            >
              <i className="fa-arrow-right fa-solid"></i>
            </button>
          </div>
        )}
      </div>

      <div className={Styles.recommendations}>
        <h2 className={Styles.subtitles}>Recomendaciones</h2>
        <div className={Styles.cardsContainer}>
          {randomTours.map((tour) => (
            <Card
              id={tour.tourId}
              key={tour.tourId}
              title={tour.name}
              img={tour.imagenes[0]}
              price={tour.costPerPerson}
              description={tour.summary}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
