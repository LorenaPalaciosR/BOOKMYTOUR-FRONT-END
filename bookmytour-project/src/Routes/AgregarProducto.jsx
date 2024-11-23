import MyCalendar from "../Components/MyCalendar";
import {useTours} from "../hooks/useTours";
import Styles from "../Styles/AgregarProducto.module.css";
import { useState } from "react";
import {  toast } from "react-toastify";
import {useNavigate}  from "react-router-dom";
const AgregarProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    costo: "",
    disponibilidad: "",
    ciudad: "",
    duracion: "",
    imagen: null,
    resumen: "",
    descripcion: "",
    itinerario: ""
  });
 const {createTour} =useTours()
 const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTour = await createTour({
        firstName: formData.nombre,
        category: formData.categoria,
        cost: formData.costo,
        availability:formData.disponibilidad,
        city: formData.ciudad,
        duration: formData.duracion,
        image: formData.imagen,
        resume: formData.resumen,
        description: formData.descripcion,
        itinerary: formData.itinerario,
      });  
      if (newTour.token) {
        toast.success("Cuenta creada exitosamente!", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/productos"); 
        }, 1000);
      }
    } catch (err) {
      console.error("Error al crear el tour:", err);
      alert("Hubo un error al crear el tour");
    }
    
  };

  return (
    <div className={Styles.container}>
      <h1>Agregar Producto</h1>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <div className={Styles.formulario1}>
          <label htmlFor="name">
            Nombre:
            <input
              type="text"
              id="name"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange} 
            />
          </label>
          <label htmlFor="select">
            Categoría
            <select
              id="select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange} 
            >
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
            <input
              type="number"
              name="costo"
              value={formData.costo}
              onChange={handleChange} 
            />
          </label>
          <label>
            Disponibilidad
            <div className={Styles.calendario}>
              <MyCalendar />
            </div>
          </label>
          <label>
            Ciudad
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange} 
            />
          </label>
          <label>
            Duración
            <input
              type="text"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange} 
            />
          </label>
        </div>

        <div className={Styles.formulario2}>
          <label>
            Sube una imagen:
            <input
              type="file"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
          <div>
            <p>Vista previa:</p>
            <img
            src={formData.imagen ? URL.createObjectURL(formData.imagen) : ""}
              alt="Vista previa"
              style={{ maxWidth: "300px", marginTop: "10px" }}
            />
          </div>
          <label>
            Resumen
            <textarea
              rows={5}
              cols={50}
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción General
            <textarea
              rows={5}
              cols={50}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange} 
            />
          </label>
          <label>
            Itinerario
            <textarea
              rows={5}
              cols={50}
              name="itinerario"
              value={formData.itinerario}
              onChange={handleChange} 
            />
          </label>
        </div>
        <div className={Styles.botones}>
          <button className={Styles.btn} onClick={() => navigate("/productos")}>Cancelar</button>
          <button type="submit" className={Styles.button}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
