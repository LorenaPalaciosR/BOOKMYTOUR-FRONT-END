
import Styles from "../Styles/BotonWsp.module.css";


const BotonWsp = () => {
    const numero = 573007906887;
    const mensaje = "hola, tengo una consulta";
    const wspUrl = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    return (
        
            <button onClick={() => (window.location.href = wspUrl)} className={Styles.buttonWsp}>
                <img src="/icons/whatsapp.png" alt="whatsapp" />
            </button>
    )
};

export default BotonWsp;
