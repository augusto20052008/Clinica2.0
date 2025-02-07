import React, { useState } from "react";
import ListaFormularios from "./Formularios";
import SeleccionarFormularioYPaciente from "./SeleccionarFormulario";
import SeleccionarSecciones from "./SeleccionarSecciones";
import ConfirmarVinculacion from "./ConfirmarVinculacion";

const FormularioWizard = () => {
    const [step, setStep] = useState(1);
    const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [seccionesSeleccionadas, setSeccionesSeleccionadas] = useState([]);

    const avanzarPaso = () => setStep((prev) => prev + 1);
    const retrocederPaso = () => setStep((prev) => prev - 1);

    return (
        <div style={{ padding: "20px" }}>
            {step === 1 && <ListaFormularios onAgregar={() => setStep(2)} />}

            {step === 2 && <SeleccionarFormularioYPaciente onNext={(formulario, paciente) => {
                setFormularioSeleccionado(formulario);
                setPacienteSeleccionado(paciente);
                avanzarPaso();
            }} />}

            {step === 3 && <SeleccionarSecciones
                formularioId={formularioSeleccionado}
                onSiguiente={(respuestasSeccion) => {
                    setSeccionesSeleccionadas((prev) => [...prev, ...respuestasSeccion]);
                    avanzarPaso();
                }}
                onAtras={retrocederPaso}
            />}

            {step === 4 && (
                <ConfirmarVinculacion
                    formularioId={formularioSeleccionado}
                    pacienteId={pacienteSeleccionado}
                    respuestas={seccionesSeleccionadas}
                    onConfirmar={() => {
                        setStep(1);
                    }}
                    onAtras={retrocederPaso}
                />
            )}
        </div>
    );
};

export default FormularioWizard;
