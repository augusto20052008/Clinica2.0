import React, { useState } from "react";
import { createFormulario } from "../../../../../utils/api";
import Button from "../../../../../components/common/Button"; 
import "../../../../../styles/modules/Administrador/NuevoFormulario.css"; 

const NuevoFormulario = ({ plantilla, onBack }) => {
  const [activeSection, setActiveSection] = useState("Campos Obligatorios"); 
  const [formValues, setFormValues] = useState({
    HistoriaClinica_idHistoriaClinica: "",
    Establecimiento_idEstablecimiento: "",
    Plantilla_Formulario_idPlantilla_Formulario: plantilla.idPlantilla_Formulario,
    contenido: {},
    estadoFormulario: "",
    notas: "",
    observaciones: "",
  });

  const handleChange = (fieldName, value) => {
    if (plantilla.secciones.some((section) =>
        section.campos.some((campo) => campo.name === fieldName)
    )) {
      setFormValues((prev) => ({
        ...prev,
        contenido: { ...prev.contenido, [fieldName]: value },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formValues.HistoriaClinica_idHistoriaClinica) {
        alert("El campo 'Historia Clínica' es obligatorio.");
        return;
      }
      if (!formValues.Establecimiento_idEstablecimiento) {
        alert("El campo 'Establecimiento' es obligatorio.");
        return;
      }
  
      const payload = {
        ...formValues,
        contenido: JSON.stringify(formValues.contenido || {}),
      };
  
      await createFormulario(payload);
      alert("Formulario creado exitosamente");
      onBack();
    } catch (error) {
      console.error("Error al crear formulario:", error);
      alert(error.response?.data?.message || "Error al crear el formulario. Intenta nuevamente.");
    }
  };
  

  const renderSection = () => {
    if (activeSection === "Campos Obligatorios") {
      return (
        <div className="form-section">
          <h3>Campos Obligatorios</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Historia Clínica (Obligatorio):</label>
              <input
                type="text"
                placeholder="Ingrese el ID de la historia clínica"
                value={formValues.HistoriaClinica_idHistoriaClinica}
                onChange={(e) => handleChange("HistoriaClinica_idHistoriaClinica", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Establecimiento (Obligatorio):</label>
              <input
                type="text"
                placeholder="Ingrese el ID del establecimiento"
                value={formValues.Establecimiento_idEstablecimiento}
                onChange={(e) => handleChange("Establecimiento_idEstablecimiento", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Estado del Formulario (Opcional):</label>
              <input
                type="text"
                placeholder="Ingrese el estado del formulario"
                value={formValues.estadoFormulario}
                onChange={(e) => handleChange("estadoFormulario", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Notas (Opcional):</label>
              <input
                type="text"
                placeholder="Ingrese notas"
                value={formValues.notas}
                onChange={(e) => handleChange("notas", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Observaciones (Opcional):</label>
              <input
                type="text"
                placeholder="Ingrese observaciones"
                value={formValues.observaciones}
                onChange={(e) => handleChange("observaciones", e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    } else {
      const section = plantilla.secciones.find((s) => s.nombre === activeSection);
      return (
        <div className="form-section">
          <h3>{section?.nombre || "Sección"}</h3>
          <div className="form-grid">
            {section?.campos.map((campo, idx) => (
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
    <div className="nuevo-formulario-container">
      <aside className="sidebar">
        <h2>{plantilla.nombreTipoFormulario || "Formulario Sin Título"}</h2>
        <ul className="sidebar-sections">
          <li
            className={`sidebar-section-item ${activeSection === "Campos Obligatorios" ? "active" : ""}`}
            onClick={() => setActiveSection("Campos Obligatorios")}
          >
            Campos Obligatorios
          </li>
          {plantilla.secciones.map((section, index) => (
            <li
              key={index}
              className={`sidebar-section-item ${activeSection === section.nombre ? "active" : ""}`}
              onClick={() => setActiveSection(section.nombre)}
            >
              {section.nombre || `Sección ${index + 1}`}
            </li>
          ))}
        </ul>
        <div className="sidebar-actions">
          <Button label="Guardar" onClick={handleSubmit} className="primary" />
          <Button label="Cancelar" onClick={onBack} className="secondary" />
        </div>
      </aside>
      <main className="form-content">{renderSection()}</main>
    </div>
  );
};

export default NuevoFormulario;
