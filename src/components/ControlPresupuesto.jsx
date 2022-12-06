import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setPresupuestoValido,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    // calcular porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });
  };

  const handleReset = () => {
    const resultado = confirm( '¿ Deseas reiniciar presupuesto y gastos ?' );

    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setPresupuestoValido(false);
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "#DC2626" : "",
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleReset}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
