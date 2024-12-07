import React from "react";
import Card from '../Components/Card'
import { useContextGlobalStates } from "../Components/utils/global.context";
import Styles from '../Styles/Favoritos.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Favoritos = () => {

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
        usuario.usuario.rol.rolName === "ADMIN"
      ) {
        navigate("/");
      }
    }
  }, [navigate]);

  const { state } = useContextGlobalStates();
  const favsIds = state.favs;
  const tours = state.data;
  const filteredItems = tours.filter(tour => favsIds.includes(tour.tourId));

  return (
    <div className={Styles.recommendations}>
      <h2 className={Styles.subtitles}>Tours favoritos</h2>
        <div className={Styles.cardsContainer}>
        {filteredItems?.length === 0 ? <h2> No has agregado favoritos 😮 </h2> : filteredItems?.map((item) => (
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
    </div>
  );
};
export default Favoritos;