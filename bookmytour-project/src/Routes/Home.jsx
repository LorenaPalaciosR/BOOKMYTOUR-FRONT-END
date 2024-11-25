import React, { useEffect, useState } from "react";
import Styles from "../Styles/Body.module.css";
import Paginacion from "../Styles/Productos.module.css";
import Card from "../Components/Card.jsx";
import { useContextGlobalStates } from "../Components/utils/global.context.jsx";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const Home = () => {
  const { state } = useContextGlobalStates();
  const [randomTours, setRandomTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTours, setFilteredTours] = useState([]);
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
      selectedIds.includes(tour.id)
    );
    setRandomTours(filteredTours);
  }, [state.data]);

  useEffect(() => {
    // Filtrar los tours con base a los filtros aplicados
    const filterTours = () => {
      if (!searchText) {
        setFilteredTours([]); // No mostrar sugerencias si no hay texto
        return;
      }

      const normalizeText = (text) => {
        return text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""); // Elimina los diacríticos
      };

      const normalizedSearchText = normalizeText(searchText);

      const filtered = state.data
        .filter((tour) => {
          // Normaliza las propiedades del tour antes de compararlas
          const matchesText =
            normalizeText(tour.nombre).includes(normalizedSearchText) ||
            normalizeText(tour.descripcion).includes(normalizedSearchText) ||
            normalizeText(tour.ubicacion).includes(normalizedSearchText);

          // Filtrar por fechas (si se proporcionan)
          const matchesDates =
            (!startDate || new Date(tour.duracion) >= new Date(startDate)) &&
            (!endDate || new Date(tour.duracion) <= new Date(endDate));

          return matchesText && matchesDates;
        })
        .slice(0, 7); // Limitar a un máximo de 7 resultados

      setFilteredTours(filtered);
    };

    filterTours();
  }, [searchText, startDate, endDate, state.data]);

  const handleChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tours filtrados: ", filteredTours);
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
        <form onSubmit={handleSubmit}>
          <div id={Styles.container}>
            <input
              type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Busca tours o destinos..."
              title="Encuentra tours adaptados a tus intereses, fechas y destinos. Explora experiencias únicas."
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
            {filteredTours.length > 0 && (
              <ul id={Styles.suggestions}>
                {filteredTours.map((tour) => (
                  <Link
                    className={Styles.filteredTourItem}
                    onClick={() => {
                      setFilteredTours([]);
                      setSearchText("");
                    }}
                    key={tour.id}
                    to={`${window.location.origin}/detalle/${tour.id}`}
                  >
                    <img src={tour.imagenes[0]} alt={tour.nombre} />
                    <div className={Styles.filteredTourInfo}>
                      <h3 className={Styles.tourTitle}>{tour.nombre}</h3>
                      <p className={Styles.resumen}>{tour.resumen}</p>
                    </div>
                  </Link>
                ))}
              </ul>
            )}
          </div>
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
              id={item.id}
              key={item.id}
              title={item.nombre}
              img={item.imagenes[0]}
              price={item.precio}
              description={item.resumen}
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
              id={tour.id}
              key={tour.id}
              title={tour.nombre}
              img={tour.imagenes[0]}
              price={tour.precio}
              description={tour.resumen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
