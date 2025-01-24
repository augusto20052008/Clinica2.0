import React, { useState, useEffect } from "react";
import Button from "../../../../components/common/Button";
import { updateFormulario } from "../../../../utils/api";

const EditFormulario = ({ formulario, onBack, onUpdate }) => {
  const [activeSection, setActiveSection] = useState("Campos Obligatorios");
  const [formValues, setFormValues] = useState({
    nroHistoriaClinica: formulario.nroHistoriaClinica || "",
    contenido: formulario.contenido || {},
    estadoFormulario: formulario.estadoFormulario || "",
    notas: formulario.notas || "",
    observaciones: formulario.observaciones || "",
  });

  useEffect(() => {
    console.log("Formulario cargado en edición:", formulario);
    console.log("Secciones disponibles:", formulario.plantilla?.secciones);
  }, [formulario]);

  const handleChange = (fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      contenido: {
        ...prev.contenido,
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formValues,
        contenido: JSON.stringify(formValues.contenido || {}),
      };
      await updateFormulario(
        formulario.idFormulario,
        formulario.HistoriaClinica_idHistoriaClinica,
        formulario.Plantilla_Formulario_idPlantilla_Formulario,
        formulario.Establecimiento_idEstablecimiento,
        payload
      );
      alert("Formulario actualizado exitosamente.");
      onUpdate();
    } catch (error) {
      console.error("Error al actualizar formulario:", error);
      alert("Error al actualizar el formulario. Intente nuevamente.");
    }
  };

  const renderSection = () => {
    if (activeSection === "Campos Obligatorios") {
      return (
        <div className="form-section">
          <h3>Campos Obligatorios</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Número de Historia Clínica:</label>
              <input
                type="text"
                value={formValues.nroHistoriaClinica}
                onChange={(e) =>
                  setFormValues({ ...formValues, nroHistoriaClinica: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Estado del Formulario:</label>
              <input
                type="text"
                value={formValues.estadoFormulario}
                onChange={(e) =>
                  setFormValues({ ...formValues, estadoFormulario: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Notas:</label>
              <input
                type="text"
                value={formValues.notas}
                onChange={(e) =>
                  setFormValues({ ...formValues, notas: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Observaciones:</label>
              <input
                type="text"
                value={formValues.observaciones}
                onChange={(e) =>
                  setFormValues({ ...formValues, observaciones: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      );
    } else {
      const section = formulario.plantilla?.secciones?.find(
        (s) => s.nombre === activeSection
      );

      return (
        <div className="form-section">
          <h3>{section?.nombre || "Sección"}</h3>
          <div className="form-grid">
            {section?.campos?.map((campo, idx) => (
              <div key={idx} className="form-group">
                <label>{campo.label || campo.name || "Campo sin nombre"}:</label>
                <input
                  type={campo.type || "text"}
                  placeholder={campo.placeholder || `Ingrese ${campo.label || campo.name}`}
                  value={formValues.contenido[campo.name] || ""}
                  onChange={(e) => handleChange(campo.name, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="edit-formulario-container">
      <aside className="sidebar">
        <h2>{formulario.plantilla?.nombre || "Editar Formulario"}</h2>
        <ul className="sidebar-sections">
          <li
            className={`sidebar-section-item ${
              activeSection === "Campos Obligatorios" ? "active" : ""
            }`}
            onClick={() => setActiveSection("Campos Obligatorios")}
          >
            Campos Obligatorios
          </li>
          {formulario.plantilla?.secciones?.length > 0 ? (
            formulario.plantilla.secciones.map((section, index) => (
              <li
                key={index}
                className={`sidebar-section-item ${activeSection === section.nombre ? "active" : ""}`}
                onClick={() => setActiveSection(section.nombre)}
              >
                {section.nombre || `Sección ${index + 1}`}
              </li>
            ))
          ) : (
            <p className="no-secciones">No hay secciones disponibles en esta plantilla.</p>
          )}
        </ul>
        <div className="sidebar-actions">
          <Button label="Guardar Cambios" onClick={handleSubmit} className="primary" />
          <Button label="Regresar" onClick={onBack} className="secondary" />
        </div>
      </aside>
      <main className="form-content">{renderSection()}</main>
    </div>
  );
};

export default EditFormulario;
