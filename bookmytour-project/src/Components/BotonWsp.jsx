const BotonWsp =()=>{
    const numero = 569775754441
    const mensaje = "hola, tengo una consulta";
    const wspUrl = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
     return 
     (
        <button onClick={()=>window.location.href = wspUrl}> </button>
       
     )
}
export default BotonWsp