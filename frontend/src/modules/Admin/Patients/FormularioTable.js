import React, { useEffect, useState } from "react";
import Table from "../../../components/common/Table";
import { fetchFormularioById } from "../../../utils/api";

const FormulariosTable = ({ idHistoriaClinica }) => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFormularios = async () => {
            try {
                const data = await fetchFormularioById(idHistoriaClinica);
                setFormularios(data);
            } catch (err) {
                setError(`Error al cargar los formularios. ${err}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (idHistoriaClinica) {
            loadFormularios();
        }
    }, [idHistoriaClinica]);

    const columns = [
        { label: "ID Formulario", accessor: "idFormulario" },
        { label: "Nro Historia Clínica", accessor: "nroHistoriaClinica" },
        { label: "Fecha Creación", accessor: "fechaCreacionF" },
        { label: "Última Modificación", accessor: "fechaUltimaModificacionF" },
        { label: "Estado", accessor: "estadoFormulario" }
    ];

    if (!idHistoriaClinica) {
        return <p>No se proporcionó el ID de Historia Clínica.</p>;
    }

    if (loading) {
        return <p>Cargando formularios...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!formularios || formularios.length === 0) {
        return <p>No se encontraron formularios para esta historia clínica.</p>;
    }

    return (
        <div>
            <h3>Formularios Asociados</h3>
            <Table columns={columns} data={formularios} />
        </div>
    );
};

export default FormulariosTable;