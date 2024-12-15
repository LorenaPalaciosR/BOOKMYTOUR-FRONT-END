const Politica = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: "1.5rem",
          padding: "1rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>Políticas del Tour</h1>
  
        <h2>Políticas de Reservación</h2>
        <ul>
          <li>
            <strong>Confirmación del tour:</strong> Después de hecha la reserva y el pago correspondiente, se confirmará la reserva por correo electrónico en las próximas 24 horas.
          </li>
          <li>
            <strong>Edades:</strong> La edad mínima para los tours es de tres años, y los menores de edad deben ir acompañados de un adulto.
          </li>
          <li>
            <strong>Capacidad:</strong> La capacidad máxima de cada tour es de 20 personas.
          </li>
        </ul>
  
        <h2>Políticas de Pago</h2>
        <ul>
          <li>
            <strong>Pago del tour:</strong> El tour debe estar pagado en su totalidad al menos 5 días antes de la fecha programada.
          </li>
          <li>
            <strong>Métodos de pago:</strong> Los métodos aceptados son tarjeta de débito, crédito o transferencia bancaria.
          </li>
          <li>
            <strong>Reembolso:</strong> La cancelación de un tour con más de 72 horas de anticipación recibirá un reembolso del 80%. Después de ese tiempo, no habrá reembolso.
          </li>
        </ul>
  
        <h2>Restricciones</h2>
        <ul>
          <li>
            <strong>Estado físico:</strong> Algunos tours no son recomendados para personas con problemas de movilidad o condiciones médicas graves (enfermedades cardíacas, respiratorias, etc.).
          </li>
        </ul>
  
        <h2>Condiciones Climáticas</h2>
        <ul>
          <li>
            En caso de condiciones climáticas adversas (lluvia, tormenta), el tour podría ser reprogramado o cancelado. En caso de cancelación, se reembolsará el total del pago.
          </li>
        </ul>
  
        <h2>Responsabilidades del Usuario</h2>
        <ul>
          <li>El usuario debe llegar por lo menos 30 minutos antes del comienzo del tour.</li>
          <li>
            BookMyTour no se responsabiliza por pérdida de objetos personales o accidentes causados por negligencia del usuario.
          </li>
          <li>El usuario debe respetar al personal del tour.</li>
          <li>
            El usuario debe evitar comportamientos disruptivos y respetar la flora y fauna del entorno.
          </li>
        </ul>
        <h2>Politicas de seguridad</h2>
        <li>Bookmytour garantiza la seguridad y privacidad del usuario al utilizar el canal de whatsapp para comunicación </li>
      </div>
    );
  };
  
  export default Politica;
  