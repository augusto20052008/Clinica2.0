import React, { useState, useEffect } from "react";
import { updatePlantilla } from "../../../../../utils/api";
import Button from "../../../../../components/common/Button";
import {
  FaEye,
  FaEyeSlash,
  FaTrash,
} from "react-icons/fa"; // Importación de íconos de React Icons
import "../../../../../styles/modules/Administrador/Formulario/EditPlantilla.css";

function EditPlantilla({ plantilla, onClose, onRefresh }) {
  const [formData, setFormData] = useState({
    ...plantilla,
    id: plantilla.idPlantilla_Formulario || plantilla.id || null,
    Estructura:
      typeof plantilla.Estructura === "string"
        ? JSON.parse(plantilla.Estructura || "{}")
        : plantilla.Estructura || { sections: [] },
  });

  // Sección activa en la que el usuario está editando
  const [activeSection, setActiveSection] = useState(0);

  // Array para controlar la visibilidad de cada sección
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    setFormData({
      ...plantilla,
      id: plantilla.idPlantilla_Formulario || plantilla.id || null,
      Estructura:
        typeof plantilla.Estructura === "string"
          ? JSON.parse(plantilla.Estructura || "{}")
          : plantilla.Estructura || { sections: [] },
    });
  }, [plantilla]);

  // Sincroniza el array de visibilidad con el número de secciones
  useEffect(() => {
    if (formData.Estructura?.sections) {
      setVisibleSections(formData.Estructura.sections.map(() => true));
    }
  }, [formData.Estructura.sections]);

  // Actualiza valores del formData (ej: nombreTipoFormulario)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función genérica para actualizar la estructura (secciones, fields, etc.)
  const handleStructureChange = (path, value) => {
    const keys = path.split(".");
    const updatedStructure = { ...formData.Estructura };

    let temp = updatedStructure;
    keys.slice(0, -1).forEach((key) => {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    });

    temp[keys[keys.length - 1]] = value;
    setFormData((prev) => ({ ...prev, Estructura: updatedStructure }));
  };

  // Agrega una nueva sección
  const handleAddSection = () => {
    const updatedSections = [
      ...formData.Estructura.sections,
      {
        title: `Sección ${formData.Estructura.sections.length + 1}`,
        fields: [],
      },
    ];
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));
    setActiveSection(updatedSections.length - 1);
    setVisibleSections((prev) => [...prev, true]);
  };

  // Agrega un campo en la sección activa
  const handleAddField = (sectionIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections[sectionIndex].fields.push({
      name: "",
      type: "text",
      label: "",
    });
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));
  };

  // Elimina un campo
  const handleRemoveField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections[sectionIndex].fields.splice(fieldIndex, 1);
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));
  };

  // Elimina una sección completa
  const handleRemoveSection = (sectionIndex) => {
    const updatedSections = [...formData.Estructura.sections];
    updatedSections.splice(sectionIndex, 1);

    // Actualizamos el formData con las secciones nuevas
    setFormData((prev) => ({
      ...prev,
      Estructura: { ...prev.Estructura, sections: updatedSections },
    }));

    // También ajustamos la visibilidad
    const updatedVisibleSections = [...visibleSections];
    updatedVisibleSections.splice(sectionIndex, 1);
    setVisibleSections(updatedVisibleSections);

    // Ajustar la sección activa (si borramos la última, que quede en la anterior)
    if (activeSection >= updatedSections.length) {
      setActiveSection(updatedSections.length - 1);
    }
  };

  // Toggle de visibilidad para una sección
  const toggleSectionVisibility = (index) => {
    setVisibleSections((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // Submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id) {
      alert("El ID de la plantilla es indefinido. Verifica los datos.");
      return;
    }
    try {
      const updatedPlantilla = {
        ...formData,
        Estructura: JSON.stringify(formData.Estructura),
      };
      await updatePlantilla(formData.id, updatedPlantilla);
      alert("Plantilla actualizada exitosamente");
      onRefresh();
      onClose(); // Vuelve a la lista
    } catch (error) {
      console.error("Error al actualizar plantilla:", error);
      alert("Error al actualizar la plantilla");
    }
  };

  return (
    <div className="edit-plantilla-container">
      {/* SIDEBAR */}
      <aside className="edit-plantilla-sidebar">
        <h2 className="sidebar-title">Secciones</h2>
        <div className="sidebar-sections">
          {formData.Estructura.sections.map((section, index) => (
            <div
              key={`tab-${index}`}
              className={`sidebar-section-item ${
                activeSection === index ? "active" : ""
              }`}
            >
              <button
                type="button"
                className="section-button"
                onClick={() => setActiveSection(index)}
              >
                {section.title || `Sección ${index + 1}`}
              </button>
              <div className="sidebar-section-item-actions">
                {/* Botón "ojito" para mostrar/ocultar */}
                <button
                  type="button"
                  className="visibility-button"
                  onClick={() => toggleSectionVisibility(index)}
                >
                  {visibleSections[index] ? <FaEye /> : <FaEyeSlash />}
                </button>
                {/* Botón tacho de basura para eliminar la sección */}
                <button
                  type="button"
                  className="remove-section-button"
                  onClick={() => handleRemoveSection(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para agregar sección */}
        <Button
          type="button"
          label="Agregar Sección"
          onClick={handleAddSection}
          className="add-section-btn"
        />

        {/* Botones de Guardar y Cancelar en el sidebar */}
        <div className="sidebar-buttons">
          <Button
            type="submit"
            label="Guardar"
            className="form-submit-btn"
            onClick={handleSubmit}
          />
          <Button
            type="button"
            label="Cancelar"
            className="form-cancel-btn"
            onClick={onClose}
          />
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL DEL FORMULARIO */}
      <div className="edit-plantilla-form-container">
        <form onSubmit={handleSubmit} className="edit-plantilla-form">
          <h2>Editar Plantilla</h2>

          {/* Datos principales de la plantilla */}
          <div className="form-group">
            <label>Número de Formulario:</label>
            <input
              type="text"
              name="nroTipoFormulario"
              value={formData.nroTipoFormulario || ""}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Nombre del Formulario:</label>
            <input
              type="text"
              name="nombreTipoFormulario"
              value={formData.nombreTipoFormulario || ""}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Render de la sección activa (si está visible) */}
          {formData.Estructura.sections[activeSection] &&
            visibleSections[activeSection] && (
              <div className="section">
                <div className="form-group">
                  <label>Título de la Sección:</label>
                  <input
                    type="text"
                    value={
                      formData.Estructura.sections[activeSection].title || ""
                    }
                    onChange={(e) =>
                      handleStructureChange(
                        `sections.${activeSection}.title`,
                        e.target.value
                      )
                    }
                    className="form-input"
                    required
                  />
                </div>

                {/* Contenedor de campos en 2 columnas */}
                <div className="fields-container">
                  {formData.Estructura.sections[activeSection].fields.map(
                    (field, fieldIndex) => (
                      <div key={`field-${fieldIndex}`} className="form-group">
                        <label>Campo {fieldIndex + 1}:</label>
                        <input
                          type="text"
                          placeholder="Nombre del Campo"
                          value={field.name || ""}
                          onChange={(e) =>
                            handleStructureChange(
                              `sections.${activeSection}.fields.${fieldIndex}.name`,
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Etiqueta del Campo"
                          value={field.label || ""}
                          onChange={(e) =>
                            handleStructureChange(
                              `sections.${activeSection}.fields.${fieldIndex}.label`,
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                        <select
                          value={field.type || "text"}
                          onChange={(e) =>
                            handleStructureChange(
                              `sections.${activeSection}.fields.${fieldIndex}.type`,
                              e.target.value
                            )
                          }
                          className="form-input"
                        >
                          <option value="text">Texto</option>
                          <option value="textarea">Área de Texto</option>
                          <option value="signature">Firma</option>
                        </select>
                        <button
                          type="button"
                          className="remove-field-btn"
                          onClick={() =>
                            handleRemoveField(activeSection, fieldIndex)
                          }
                        >
                          Eliminar Campo
                        </button>
                      </div>
                    )
                  )}
                </div>
                <Button
                  type="button"
                  label="Agregar Campo"
                  onClick={() => handleAddField(activeSection)}
                  className="add-field-btn"
                />
              </div>
            )}
        </form>
      </div>
    </div>
  );
}

export default EditPlantilla;
