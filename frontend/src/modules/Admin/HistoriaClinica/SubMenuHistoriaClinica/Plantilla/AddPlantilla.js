import React, { useState } from "react";
import { createPlantilla } from "../../../../../utils/api";
import Button from "../../../../../components/common/Button";
import { FaTrashAlt } from "react-icons/fa"; // Ícono de eliminación
import "../../../../../styles/modules/Administrador/Formulario/AddPlantilla.css";

function AddFormulario({ onClose, onRefresh }) {
  const [nroTipoFormulario, setNroTipoFormulario] = useState("");
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);

  const handleAddSection = () => {
    setSections([...sections, { title: "", fields: [] }]);
  };

  const handleSectionChange = (index, key, value) => {
    const updatedSections = [...sections];
    updatedSections[index][key] = value;
    setSections(updatedSections);
  };

  const handleAddField = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields.push({
      name: "",
      type: "text",
      label: "",
      required: false,
      placeholder: "",
    });
    setSections(updatedSections);
  };

  const handleFieldChange = (sectionIndex, fieldIndex, key, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields[fieldIndex][key] = value;
    setSections(updatedSections);
  };

  const handleRemoveField = (sectionIndex, fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].fields.splice(fieldIndex, 1); // Eliminar el campo
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nroTipoFormulario,
      title,
      sections,
    };

    try {
      await createPlantilla({
        nroTipoFormulario,
        nombreTipoFormulario: title,
        Estructura: JSON.stringify(formData),
      });
      alert("Formulario creado exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al crear el formulario:", error);
      alert("Error al crear el formulario");
    }
  };

  return (
    <div className="add-plantilla-container">
      <h2 className="add-plantilla-title">Crear Nuevo Formulario</h2>
      <form onSubmit={handleSubmit} className="add-plantilla-form">
        <div className="form-group">
          <label htmlFor="nroTipoFormulario">Número del Formulario:</label>
          <input
            type="text"
            id="nroTipoFormulario"
            value={nroTipoFormulario}
            onChange={(e) => setNroTipoFormulario(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Título del Formulario:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="sections-container">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="section">
              <div className="form-group">
                <label>Sección {sectionIndex + 1} Título:</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(sectionIndex, "title", e.target.value)
                  }
                  className="form-input"
                  required
                />
              </div>
              <div className="fields-container">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="form-group">
                    <div className="field-header">
                      <label>Campo {fieldIndex + 1}:</label>
                      <button
                        type="button"
                        className="remove-field-btn"
                        onClick={() => handleRemoveField(sectionIndex, fieldIndex)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Nombre del Campo (para backend)"
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(
                          sectionIndex,
                          fieldIndex,
                          "name",
                          e.target.value
                        )
                      }
                      className="form-input"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Etiqueta del Campo (visible para el usuario)"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(
                          sectionIndex,
                          fieldIndex,
                          "label",
                          e.target.value
                        )
                      }
                      className="form-input"
                      required
                    />
                    <div className="form-group">
                      <label>Tipo de Campo:</label>
                      <select
                        value={field.type}
                        onChange={(e) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "type",
                            e.target.value
                          )
                        }
                        className="form-input"
                      >
                        <option value="text">Texto</option>
                        <option value="textarea">Área de Texto</option>
                        <option value="signature">Firma</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Placeholder (guía para el usuario)"
                      value={field.placeholder}
                      onChange={(e) =>
                        handleFieldChange(
                          sectionIndex,
                          fieldIndex,
                          "placeholder",
                          e.target.value
                        )
                      }
                      className="form-input"
                    />
                    <label>
                      Obligatorio:
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            "required",
                            e.target.checked
                          )
                        }
                      />
                    </label>
                  </div>
                ))}
                <Button
                  type="button"
                  label="Agregar Campo"
                  onClick={() => handleAddField(sectionIndex)}
                />
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          label="Agregar Sección"
          onClick={handleAddSection}
        />
        <div className="form-buttons">
          <Button type="submit" label="Guardar" className="form-submit-btn" />
          <Button
            type="button"
            label="Cancelar"
            className="form-cancel-btn"
            onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
}

export default AddFormulario;
