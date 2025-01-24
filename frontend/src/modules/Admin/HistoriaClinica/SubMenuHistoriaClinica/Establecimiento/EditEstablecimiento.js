import React, { useState } from "react";
import Button from "../../../../../components/common/Button";
import { updateEstablecimiento } from "../../../../../utils/api"; // Asegúrate de definir esta función en api.js

function EditEstablecimiento({ onClose, onRefresh, establecimiento }) {
  const [formData, setFormData] = useState({
    nombreEstablecimiento: establecimiento.nombreEstablecimiento || "",
    codigoEstablecimiento: establecimiento.codigoEstablecimiento || "",
    institucionSistema: establecimiento.institucionSistema || "",
    codigoParroquiaUO: establecimiento.codigoParroquiaUO || "",
    codigoCantonUO: establecimiento.codigoCantonUO || "",
    codigoProvinciaUO: establecimiento.codigoProvinciaUO || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEstablecimiento(establecimiento.idEstablecimiento, formData);
      alert("Establecimiento actualizado exitosamente");
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el establecimiento:", error);
      alert("Error al actualizar el establecimiento");
    }
  };

  return (
    <div className="edit-establecimiento-container">
      <h2>Editar Establecimiento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreEstablecimiento">Nombre:</label>
          <input
            type="text"
            name="nombreEstablecimiento"
            id="nombreEstablecimiento"
            value={formData.nombreEstablecimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoEstablecimiento">Código:</label>
          <input
            type="text"
            name="codigoEstablecimiento"
            id="codigoEstablecimiento"
            value={formData.codigoEstablecimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="institucionSistema">Sistema Institucional:</label>
          <input
            type="text"
            name="institucionSistema"
            id="institucionSistema"
            value={formData.institucionSistema}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoParroquiaUO">Código Parroquia:</label>
          <input
            type="text"
            name="codigoParroquiaUO"
            id="codigoParroquiaUO"
            value={formData.codigoParroquiaUO}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoCantonUO">Código Cantón:</label>
          <input
            type="text"
            name="codigoCantonUO"
            id="codigoCantonUO"
            value={formData.codigoCantonUO}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="codigoProvinciaUO">Código Provincia:</label>
          <input
            type="text"
            name="codigoProvinciaUO"
            id="codigoProvinciaUO"
            value={formData.codigoProvinciaUO}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <Button type="submit" label="Guardar" />
          <Button type="button" label="Cancelar" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}

export default EditEstablecimiento;
