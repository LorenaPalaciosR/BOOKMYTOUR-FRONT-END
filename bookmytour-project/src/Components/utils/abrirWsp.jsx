import {toast }from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* toast.configure();
 */
function isValidPhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
}

export function abrirWsp(phone) {
    try {
        if (!navigator.onLine) {
            throw new Error("No tienes conexión a Internet.");
        }
        if (!isValidPhoneNumber(phone)) {
            throw new Error("El número de teléfono no es válido.");
        }
        const message = encodeURIComponent("Hola, estoy interesado en tus servicios.");
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    } catch (error) {
        toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    }
}
 export default abrirWsp;