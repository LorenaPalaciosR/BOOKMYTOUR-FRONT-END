import MyCalendar from "../Components/MyCalendar";
import Styles from "../Styles/AgregarProducto.module.css"
const AgregarProducto =()=>{


    return (
<div className={Styles.container}>
  <h1>Agregar Producto</h1>
  <form className={Styles.form}>
    <div className={Styles.formulario1}>
      <label htmlFor="name">
        Nombre:
        <input type="text" id="name" />
      </label>
      <label htmlFor="select">
        Categoría
        <select id="select">
          <option value="" disabled></option>
          <option value="aventura">Aventura</option>
          <option value="naturaleza">Naturaleza viva</option>
          <option value="aromas">Aromas y sabores</option>
          <option value="urbana">Vibra urbana</option>
          <option value="paraiso">Paraisos del caribe</option>
        </select>
      </label>
      <label>
        Costo
        <input type="number" />
      </label>
      <label>
       
        Disponibilidad
        <div className={Styles.calendario}> 
        <MyCalendar />
        </div>
       
      </label>
      <label>
        Ciudad
        <input type="text" />
      </label>
      <label>
        Duración
        <input type="text" />
      </label>
    </div>

    <div className={Styles.formulario2}>
      <label>
        Sube una imagen:
        <input type="file" accept="image/*" />
      </label>
      <div>
        <p>Vista previa:</p>
        <img
          alt="Vista previa"
          style={{ maxWidth: "300px", marginTop: "10px" }}
        />
      </div>
      <label>
        Resumen
        <textarea rows={5} cols={50}></textarea>
      </label>
      <label>
        Descripción General
        <textarea rows={5} cols={50}></textarea>
      </label>
      <label>
        Itinerario
        <textarea rows={5} cols={50}></textarea>
      </label>
    </div>
    </form>
    <div className={Styles.botones}>
      <button className={Styles.btn}>Cancelar</button>
      <button type="submit" className={Styles.button}>
        Guardar
      </button>
    </div>
  
</div>

        
    )
}
 export default AgregarProducto;