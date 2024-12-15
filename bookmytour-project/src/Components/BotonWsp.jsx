
import Styles from "../Styles/BotonWsp.module.css";
import { abrirWsp } from "./utils/abrirWsp";


const BotonWsp = () => {
const handleClick= ()=>{
    const numero = 573007906887;
    abrirWsp(numero)
}
  
    return (
       
            <div className={Styles.buttonWspDiv}>
            <button onClick={handleClick} className={Styles.buttonWsp}>
                <img src="/icons/whatsapp.png" alt="whatsapp" />
            </button>
            </div>
        )
       
    
};

export default BotonWsp;
