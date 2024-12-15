import Styles from "../Styles/Card.module.css";
import { Link } from "react-router-dom";
import { useContextGlobalStates } from "../Components/utils/global.context";

const Card = ({ id, title, img, price, description }) => {
  const { state, dispatch } = useContextGlobalStates();
  const isFav = state.favs.find((favid) => favid === id);

  const user = localStorage.getItem("user");
  const usuario = JSON.parse(user);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch({ type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: id });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.cardContent}>
        <Link to={`${window.location.origin}/detalle/${id}`}>
          <img src={img} alt={img} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4 className={Styles.title}>{title}</h4>
            {usuario &&
              usuario.usuario &&
              usuario.usuario.rol.rolName !== "ADMIN" && (
                <button
                  className={Styles.favButton}
                  onClick={handleFavoriteClick}
                >
                  {isFav ? "❤️" : "🤍"}
                </button>
              )}
          </div>
          <h5>$ {price}</h5>
          <p>{description}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
