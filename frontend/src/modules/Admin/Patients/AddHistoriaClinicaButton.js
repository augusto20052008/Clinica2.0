import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

const AddHistoriaClinicaButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      label="Agregar Historia Clínica"
      onClick={() => navigate("/admin/historia-clinica")}
    />
  );
};

export default AddHistoriaClinicaButton;
