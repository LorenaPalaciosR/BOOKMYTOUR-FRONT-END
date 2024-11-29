//import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from '../Styles/Administration.module.css'
import { routes } from '../Components/utils/routes'
import { useEffect } from 'react';

const Administracion = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      // Si no hay un usuario en localStorage, redirige al home
      navigate("/");
    } else {
      const usuario = JSON.parse(user);
      // Verificar si el usuario es vacío o no tiene el rol correcto
      if (
        !usuario ||
        !usuario.usuario ||
        usuario.usuario.rol.rolName !== "ADMIN"
      ) {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <>
    <div className={Styles.admin}>
      <h1>¡Bienvenido a tu perfil de administrador!</h1>
      <div className={Styles.button}> 
        <div className={Styles.square}>
          <h3>PRODUCTOS </h3>
          <Link to={routes.productos}>
            <button id={Styles.btn}>Listar productos</button>
          </Link>  
        </div>
      <div className={Styles.square}>
        <h3>USUARIO </h3>
        <Link to ={routes.listaUsuarios}>
        <button id={Styles.btn}>Listar usuarios</button>
        </Link>
        
      </div>
      <div className={Styles.square}>
        <h3>RESERVAS </h3>
        <button id={Styles.btn}>Listar reservas</button>
      </div>
      
      </div>
    </div>
    {/* para dispositivos moviles cd */}
    <div className={Styles.noAvailable}>
      <h2>La configuración no está disponible para dispositivos móviles, por favor cambia de dispositivo si deseas acceder a esta funcionalidad</h2>
    </div>
  </>
   
   
  )
}

export default Administracion