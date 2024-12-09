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
  const [tempMinDays, setTempMinDays] = useState("");
  const [tempMaxDays, setTempMaxDays] = useState("");
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 635);
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

  const applyFilters = () => {
    setMinDays(tempMinDays);
    setMaxDays(tempMaxDays);
    setIsFilterMenuOpen(false);
  };

  const closeFilterMenu = () => {
    setIsFilterMenuOpen(false); // Cierra el menú sin borrar valores temporales
  };

  const openFilterMenu = () => {
    setTempMinDays(minDays); // Sincroniza los valores actuales al abrir
    setTempMaxDays(maxDays); // Sincroniza los valores actuales al abrir
    setIsFilterMenuOpen(true); // Abre el menú
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

  useEffect(() => {
    // Detectar tamaño de la pantalla y ajustar la lógica de búsqueda
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 635); // Actualiza el estado dependiendo del tamaño de la ventana
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Filtrar los tours con base a los filtros aplicados
  const filterTours = () => {
    if (!searchText && !minDays && !maxDays) {
      // Si no hay filtros activos, no aplicar ninguno y salir
      setFilteredTours([]);
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
          normalizeText(tour.name).includes(normalizedSearchText) ||
          normalizeText(tour.description).includes(normalizedSearchText) ||
          normalizeText(tour.cityNames.join(" ")).includes(
            normalizedSearchText
          );

        // Filtrar por duracion (si se proporcionan)
        const matchesDates = (() => {
          const extractDays = (duration) => {
            const match = duration.match(/(\d+)\s*días/);
            return match ? parseInt(match[1], 10) : 0;
          };

          const tourDays = extractDays(tour.duration);

          return (
            (!minDays || tourDays >= parseInt(minDays, 10)) &&
            (!maxDays || tourDays <= parseInt(maxDays, 10))
          );
        })();

        return matchesText && matchesDates;
      })
      .slice(0, 7); // Limitar a un máximo de 7 resultados

    setFilteredTours(filtered);
  };

  useEffect(() => {
    // Este es el caso cuando es móvil, el filtro se ejecuta al escribir
    if (!isDesktop) {
      filterTours();
    }
  }, [searchText, minDays, maxDays, state.data, isDesktop]);

  const handleChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDesktop) {
      // Si es desktop, ejecutar la búsqueda solo cuando se hace submit
      filterTours();
    }
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
              onClick={() => setIsFilterMenuOpen(false)}
            >
              Buscar
            </button>
            <button
              type="button"
              id={Styles.btnFilter}
              className={Styles.btnsForm}
              onClick={openFilterMenu}
            >
              <img
                id={Styles.filterIcon}
                src="/images/filterIcon.svg"
                alt="Filter-Icon"
              />
            </button>

            {/* Menú desplegable */}
            {isFilterMenuOpen && (
              <div className={Styles.filterMenu}>
                {/* Ícono de cerrar */}
                <span
                  onClick={closeFilterMenu}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#333"
                  }}
                >
                  ✖
                </span>
                <label htmlFor="minDays">Mínimo de días:</label>
                <input
                  type="number"
                  id="minDays"
                  value={tempMinDays}
                  onChange={(e) => setTempMinDays(e.target.value)}
                  placeholder="Ej: 3"
                />

                <label htmlFor="maxDays">Máximo de días:</label>
                <input
                  type="number"
                  id="maxDays"
                  value={tempMaxDays}
                  onChange={(e) => setTempMaxDays(e.target.value)}
                  placeholder="Ej: 7"
                />

                <button
                  type="button"
                  id={Styles.acceptButton}
                  className={Styles.btnsForm}
                  onClick={applyFilters}
                >
                  Aceptar
                </button>
              </div>
            )}

            {filteredTours.length > 0 && (
              <ul id={Styles.suggestions}>
                {filteredTours.map((tour) => (
                  <Link
                    className={Styles.filteredTourItem}
                    onClick={() => {
                      setFilteredTours([]);
                      setSearchText("");
                    }}
                    key={tour.tourId}
                    to={`${window.location.origin}/detalle/${tour.tourId}`}
                  >
                    <img src={tour.imagenes[0]} alt={tour.name} />
                    <div className={Styles.filteredTourInfo}>
                      <h3 className={Styles.tourTitle}>{tour.name}</h3>
                      <p className={Styles.resumen}>{tour.summary}</p>
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
                key={item.name}
                to={`${window.location.origin}/Categorias/${item.name}`}
              >
                <div className={Styles.carouselItem}>
                  <div className={Styles.imageContainer}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={Styles.carouselImage}
                    />
                    <h3 className={Styles.imageText}>{item.name}</h3>
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
