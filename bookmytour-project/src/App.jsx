import { Route, Routes } from "react-router-dom";
import { routes } from "./Components/utils/routes";
import Layout from "./Layouts/Layout";
import Home from "./Routes/Home";
import Administracion from "./Routes/Administracion";
import Detalle from "./Routes/Detalle";
import ScrollToTop from "./Components/ScrollToTop";
import Productos from "./Routes/Productos";
import Login from "./Routes/Login";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.administracion} element={<Administracion />} />
          <Route path={routes.productos} element={<Productos />} />
          <Route path="detalle/:id" element={<Detalle />} />
          <Route path={routes.login} element={<Login />} />
          <Route
            path={routes.notFound}
            element={
              <div
                style={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0px 20px",
                  textAlign: "center",
                }}
              >
                <h1>Error 404 - Page not Found</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
