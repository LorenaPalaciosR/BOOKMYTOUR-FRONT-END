import React from 'react'
import Styles from '../Styles/Card.module.css'
import { Link } from 'react-router-dom'
import { useContextGlobalStates } from '../Components/utils/global.context'

const Card = ({ id, title, img, price, description }) => { 
  const { state, dispatch } = useContextGlobalStates();
  const isFav = state.favs.find((favid) => favid === id);
  const addFav = () => dispatch({ type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: id });
  const user = localStorage.getItem("user");
  const usuario = JSON.parse(user);
  return (
    <div className={Styles.container}>
      <Link key={id} to={`${window.location.origin}/detalle/${id}`}>
        <img src={img} alt={img} />
          <h4 className={Styles.title}>{title}</h4>
          <h5>$ {price}</h5>
          <p>{description}</p>
      </Link>

      {!usuario ||
        !usuario.usuario ||
        usuario.usuario.rol.rolName === "ADMIN" ? <span></span> 
        : <button className={Styles.favButton} onClick={addFav}>{isFav ? "❤️" : "🤍"}</button>
        }
    </div>
  )
}

export default Card