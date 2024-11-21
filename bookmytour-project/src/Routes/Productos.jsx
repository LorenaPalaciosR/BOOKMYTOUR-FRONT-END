import  { useState } from "react";
import Styles from "../Styles/Productos.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context";
import { routes } from "../Components/utils/routes";

const Productos = () => {
  const { state } = useContextGlobalStates();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(state.data.length / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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

  const getFilteredAndSortedData = () => {
    let filteredData = state.data;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar los datos
    if (sortOrder === "desc") {
      filteredData = filteredData.sort((a, b) => b.id - a.id); // Ordena por ID de mayor a menor
    } else if (sortOrder === "name") {
      filteredData = filteredData.sort(
        (a, b) => a.nombre.localeCompare(b.nombre) // Ordena alfabéticamente por nombre
      );
    } else if (sortOrder === "") {
      // Si es "Ninguno", ordenar en orden ascendente por ID
      filteredData = filteredData.sort((a, b) => a.id - b.id); // Ordena por ID de menor a mayor
    }

    return filteredData;
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedData = getFilteredAndSortedData().slice(
      startIndex,
      startIndex + itemsPerPage
    );

    return selectedData.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.nombre}</td>
        <td>{item.categorias}</td>
        <td>{item.ubicacion}</td>
        <td>
          <button className={Styles.editBtn}>
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button className={Styles.deleteBtn}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className={Styles.mainContainer}>
      <div>
        <div style={{ marginTop: "90px" }}>
          <button onClick={() => navigate(-1)} className={Styles.btnRegresar}>
            <img src="/images/Arrow left.svg" alt="" />
            Regresar
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div id={Styles.titleContainer}>
            <h3>Todos los productos</h3>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "15px" }}
          >
            <div id={Styles.container}>
              <input
                type="text"
                placeholder="Buscar"
                id={Styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={Styles.btnOrdenar}>
              <label htmlFor="sortOrder">Ordenar por:</label>
              <div className={Styles.dropdown}>
                <button className={Styles.dropdownButton}>
                  {sortOrder === ""
                    ? "Ninguno"
                    : sortOrder === "desc"
                    ? "Últimos"
                    : "Nombre"}
                  <i className={`fa-solid fa-chevron-down ${Styles.arrow}`} />
                </button>
                <div className={Styles.dropdownContent}>
                  <div onClick={() => setSortOrder("")}>Ninguno</div>
                  <div onClick={() => setSortOrder("desc")}>Últimos</div>
                  <div onClick={() => setSortOrder("name")}>Nombre</div>
                </div>
              </div>
            </div>
            <Link to={routes.agregarProducto}>
            <button className={Styles.btnAgregar}  >Agregar producto</button>
            </Link>
           
          </div>
        </div>
      </div>

      {/* Tabla de Productos */}
      <table className={Styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      {/* Paginación con flechas */}
      <div className={Styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={Styles.arrowButton}
        >
          <i className="fa-solid fa-arrow-left"></i>
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
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Productos;
