
import Styles from "../Styles/BotonWsp.module.css";
import { useContextGlobalStates } from "./utils/global.context";


const BotonWsp = () => {
 /*    const {isLoggedIn}=useContextGlobalStates() */
  
    const numero = 573007906887;
    const mensaje = "hola, tengo una consulta";
    const wspUrl = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    return (
       
            <div className={Styles.buttonWspDiv}>
            <button onClick={() => (window.location.href = wspUrl)} className={Styles.buttonWsp}>
                <img src="/icons/whatsapp.png" alt="whatsapp" />
            </button>
            </div>
        )
       
    
};

export default BotonWsp;
