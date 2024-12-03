import React, { useEffect, useState } from "react";
import "../Styles/Categorias.css";
import Styles from "../Styles/Productos.module.css";
import { Link, useParams } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context";
import Card from "../Components/Card";

const Categorias = () => {
  const { state } = useContextGlobalStates();
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const { nombre } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Reiniciar filtros y paginacion cuando cambia la categoria
  useEffect(() => {
    setFilter("");
    setSortOrder("none");
    setCurrentPage(1);
  }, [nombre]);

  // Find the selected category
  const selectedCategory = state.categories.find(
    (category) => category.nombre === nombre
  );

  // If the category is found, display the image and description
  const categoryImage = selectedCategory ? selectedCategory.imagen : "";
  const categoryDescription = selectedCategory
    ? selectedCategory.descripcion
    : "";

  // Filtrar los elementos de acuerdo a la categoría y al filtro de búsqueda
  let filteredData = state.data.filter((tour) => {
    const isInCategory = tour.categoryName === nombre;
    const matchesFilter = filter
      ? tour.name.toLowerCase().includes(filter.toLowerCase())
      : true;
    return isInCategory && matchesFilter;
  });

  // Ordenar los datos filtrados si se ha seleccionado un orden
  if (sortOrder === "asc") {
    filteredData = filteredData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOrder === "desc") {
    filteredData = filteredData.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Si el total de páginas es 1, se selecciona automáticamente la primera página
  useEffect(() => {
    if (totalPages === 1) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // Calcular los índices de los elementos a mostrar según la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener los elementos a mostrar en la página actual
  const currentItems = filteredData.slice(startIndex, endIndex);

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

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar:", filter);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleClearFilters = () => {
    setFilter("");
    setSortOrder("none");
    setCurrentPage(1); // Resetea a la primera página
  };

  return (
    <div style={{ marginTop: "85px" }}>
      <h2 className="mainTitle">Tours {nombre}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid #027373",
        }}
      >
        {state.categories.map((item) => {
          return (
            <Link
              to={`${window.location.origin}/categorias/${item.nombre}`}
              key={item.nombre}
              className={`btnsCategorias ${
                item.nombre === nombre ? "active" : ""
              }`}
            >
              {item.nombre}
            </Link>
          );
        })}
      </div>
      <img id="mainImage" src={categoryImage} alt={nombre} />
      <div className="sectionContainer">
        <p
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.7rem",
            color: "#A1A7B0",
          }}
        >
          {categoryDescription}
        </p>
      </div>
      <form id="container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="Buscar"
          id="input"
        />
        <div className="btnsForm sortButtonContainer">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            id="selectSort"
            className="selectSort"
          >
            <option value="none">Ordenar</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        {/* Botón para eliminar filtros */}
        <button onClick={handleClearFilters} className="clearFiltersButton">
          <i className="fa-solid fa-x"></i>
        </button>
      </form>

      <div className="categories">
        <div className="cardsContainer">
          {currentItems.map((tour) => (
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

      {/* Paginación con flechas */}
      {totalPages > 1 && (
        <div className={Styles.pagination}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={Styles.arrowButton}
          >
            <i className="fa-arrow-left fa-solid"></i>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? Styles.activePage : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={Styles.arrowButton}
          >
            <i className="fa-arrow-right fa-solid"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Categorias;
