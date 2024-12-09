import React, { useEffect, useState } from "react";
import Styles from "../Styles/Header.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context.jsx";
import Swal from "sweetalert2";
import { routes } from "./utils/routes";
import { useAuth } from "../hooks/useAuth.js";

const Header = () => {
  const { state, dispatch } = useContextGlobalStates();
  const [isMenuOpenDesktop, setIsMenuOpenDesktop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(!!state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Obtener la ubicación actual usando useLocation
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    const usuario = JSON.parse(user);
    // Verificar si el usuario es vacío o no tiene el rol correcto
    if (
      !usuario ||
      !usuario.usuario ||
      usuario.usuario.rol.rolName !== "ADMIN"
    ) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  const toggleMenuDesktop = () => {
    setIsMenuOpenDesktop((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeMenuDesktop = () => {
    setIsMenuOpenDesktop(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de cerrar sesión. ¿Quieres continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        dispatch({ type: "LOG_OUT" });
        closeMenuDesktop();
        closeMenu();
        Swal.fire({
          title: "¡Sesión cerrada!",
          text: "Has cerrado sesión con éxito.",
          icon: "success",
        });
        navigate("/");
      } else {
        closeMenuDesktop();
        closeMenu();
      }
    });
  };

  useEffect(() => {
    // Actualiza el valor de isLogged cada vez que state.user cambie
    setIsLogged(!!state.user);
  }, [state.user]);

  useEffect(() => {
    // Función para cerrar el menú móvil al cambiar a vista de escritorio
    const handleResize = () => {
      if (window.innerWidth > 630) {
        setIsMenuOpen(false);
      }
    };

    // Agregar el listener al redimensionar
    window.addEventListener("resize", handleResize);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header id={Styles.header}>
      <nav>
        <ul id={Styles.nav}>
          {/* Logo y título */}
          <Link to={routes.home} className={Styles.leftSection}>
            <img
              id={Styles.logo}
              src="/images/logosobreblanco.svg"
              alt="Logo-LightMode"
            />
            <div>
              <h1 id={Styles.mainTitle}>
                <span id={Styles.blueText}>BOOK</span> MY TOUR
              </h1>
              <h2 id={Styles.slogan}>Keep calm and travel on</h2>
            </div>
          </Link>

          {/* Menú hamburguesa */}
          <div className={Styles.hamburger} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {isLogged ? (
            <>
              <div className={Styles.rightSection}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={toggleMenuDesktop}
                >
                  {state.user && (
                    <>
                      <span style={{ fontWeight: "bold", color: "#464646" }}>
                        {`${state.user.usuario.firstName} ${state.user.usuario.lastName}`}
                      </span>
                      <img
                        src={state.user.usuario.imageProfile}
                        alt="Generic Avatar"
                      />
                    </>
                  )}
                </div>
                {/* Menú desplegable que se muestra solo si isMenuOpen es true */}
                {isMenuOpenDesktop && (
                  <div className={Styles.menu}>
                    <p
                      style={{
                        color: "#61AAC9",
                        cursor: "pointer",
                        fontWeight: "bolder",
                      }}
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </p>
                    <hr />
                    <p style={{ fontWeight: "bold" }}>Menú</p>
                    <hr />
                    {isAdmin && (
                      <>
                        <Link to="/productos" onClick={closeMenuDesktop}>
                          Listar productos
                        </Link>
                        <Link to="/usuarios" onClick={closeMenuDesktop}>
                          Listar usuarios
                        </Link>
                        <Link to="" onClick={closeMenuDesktop}>
                          Listar reservas
                        </Link>
                      </>
                    )}
                    {!isAdmin && (
                      <>
                        <Link to="/favoritos" onClick={closeMenuDesktop}>
                          Favoritos
                        </Link>
                        <Link to="/misReservas" onClick={closeMenuDesktop}>
                          Mis reservas
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={Styles.rightSection}>
              {location.pathname !== "/signup" && (
                <Link
                  to="/signup"
                  id={Styles.signUpBtn}
                  className={Styles.headerBtns}
                >
                  Crear cuenta
                </Link>
              )}
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  id={Styles.loginBtn}
                  className={Styles.headerBtns}
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          )}

          {/* Menú desplegable (visible en móvil) */}
          {isLogged ? (
            <div style={{ display: isMenuOpen ? "flex" : "none" }}>
              <div
                className={`${Styles.blurredBackground} ${
                  isMenuOpen
                    ? Styles.blurredBackgroundEnter
                    : Styles.blurredBackgroundExit
                }`}
                onClick={closeMenu}
              ></div>
              <div
                className={`${Styles.dropdownMenu} ${
                  isMenuOpen
                    ? Styles.dropdownMenuEnter
                    : Styles.dropdownMenuExit
                }`}
              >
                <h3>Menú</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "5px 0px 20px 0px",
                    alignSelf: "flex-end",
                    width: "80%",
                  }}
                >
                  {state.user && (
                    <>
                      <span
                        style={{
                          marginRight: "30px",
                          color: "#464646",
                          fontWeight: "bold",
                        }}
                      >
                        {`${state.user.usuario.firstName} ${state.user.usuario.lastName}`}
                      </span>
                      <img
                        src={state.user.usuario.imageProfile}
                        alt="Generic Avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100px",
                          cursor: "pointer",
                        }}
                      />
                    </>
                  )}
                </div>
                {!isAdmin && (
                  <>
                    <Link to="/favoritos" onClick={closeMenuDesktop}>
                      Favoritos
                    </Link>
                  </>
                )}
                <span
                  style={{
                    color: "#61AAC9",
                    fontWeight: "bolder",
                    marginLeft: "30px",
                    padding: "5px 0px 20px 0px",
                    alignSelf: "flex-end",
                    width: "80%",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </span>
                {isAdmin && (
                  <>
                    <Link to="/productos" onClick={closeMenu}>
                      Listar productos
                    </Link>
                    <Link to="/usuarios" onClick={closeMenu}>
                      Listar usuarios
                    </Link>
                    <Link to="" onClick={closeMenu}>
                      Listar reservas
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: isMenuOpen ? "flex" : "none" }}>
              <div
                className={`${Styles.blurredBackground} ${
                  isMenuOpen
                    ? Styles.blurredBackgroundEnter
                    : Styles.blurredBackgroundExit
                }`}
                onClick={closeMenu}
              ></div>
              <div
                className={`${Styles.dropdownMenu} ${
                  isMenuOpen
                    ? Styles.dropdownMenuEnter
                    : Styles.dropdownMenuExit
                }`}
              >
                <h3>Menú</h3>
                {location.pathname !== "/signup" && (
                  <Link to="/signup" onClick={closeMenu}>
                    Crear cuenta
                  </Link>
                )}
                {location.pathname !== "/login" && (
                  <Link to="/login" onClick={closeMenu}>
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
