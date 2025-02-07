// VerFormularioModal.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Switch
} from "antd";
import dayjs from "dayjs";
import {
  fetchSeccionByTipoFormulario,
  fetchCamposByFormularioYSeccion,
  fetchFormularioRespuestabyId
} from "../../../../../utils/api";

/**
 * Función para renderizar dinámicamente el componente según "tipo_dato".
 * En modo lectura (solo ver), usamos `disabled` en todos los componentes
 */
const renderCampo = (campo) => {
    switch (campo.tipo_dato) {
      case "TEXT":
        // Input de texto en modo lectura
        return <Input disabled />;
      case "NUMBER":
        // Campo numérico en modo lectura
        return <Input type="number" disabled />;
      case "DATE":
        // DatePicker en modo lectura
        return <DatePicker style={{ width: "100%" }} disabled />;
      case "BOOLEAN":
        // Switch en modo lectura
        return <Switch disabled />;
      case "ENUM":
        // Select en modo lectura (si "opciones" está presente)
        if (campo.opciones) {
          const opcionesArray = campo.opciones.split(",");
          return (
            <Select disabled>
              {opcionesArray.map((opt) => (
                <Select.Option key={opt} value={opt}>
                  {opt}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return <Select disabled />;
      case "FLOAT":
        // InputNumber para valores decimales, disabled
        return <InputNumber style={{ width: "100%" }} step={0.01} disabled />;
      default:
        // Por defecto, un Input de texto disabled
        return <Input disabled />;
    }
  };
  

const VerFormularioModal = ({ visible, onClose, formulario }) => {
  // Estado: lista de secciones (contiene id_formulario_tipo, id_seccion, nombre_seccion)
  const [secciones, setSecciones] = useState([]);
  // Índice de la sección activa
  const [seccionActiva, setSeccionActiva] = useState(0);
  // Campos de la sección activa
  const [campos, setCampos] = useState([]);

  // 1) Instancia del formulario de Ant Design para poder setear valores.
  const [form] = Form.useForm();

  /**
   * Efecto: al abrir el modal, si existe "id_formulario_tipo" en `formulario`,
   * se obtienen las secciones desde la API.
   */
  useEffect(() => {
    if (!visible || !formulario?.id_formulario_tipo) return;

    (async () => {
      try {
        const data = await fetchSeccionByTipoFormulario(
          formulario.id_formulario_tipo
        );
        const mapeado = data.map((obj) => ({
          id_seccion: obj.id_seccion,
          id_formulario_tipo: obj.id_formulario_tipo,
          nombre_seccion: obj.nombre_seccion
        }));

        setSecciones(mapeado);
        setSeccionActiva(0); // Seleccionar la primera sección
      } catch (error) {
        console.error("Error al cargar secciones:", error);
      }
    })();
  }, [visible, formulario]);

  /**
   * Efecto: cada vez que secciones o seccionActiva cambien, cargamos los campos
   * usando "id_formulario_tipo" y "id_seccion".
   */
  useEffect(() => {
    if (secciones.length === 0) return;

    const seccionSeleccionada = secciones[seccionActiva];
    if (
      !seccionSeleccionada?.id_formulario_tipo ||
      !seccionSeleccionada?.id_seccion
    )
      return;

    (async () => {
      try {
        // 2) Cargar campos
        const dataCampos = await fetchCamposByFormularioYSeccion(
          seccionSeleccionada.id_formulario_tipo,
          seccionSeleccionada.id_seccion
        );
        setCampos(dataCampos);
      } catch (error) {
        console.error("Error al cargar campos:", error);
      }
    })();
  }, [secciones, seccionActiva]);

  /**
   * Efecto: cuando 'campos' cambian (ya sea al cambiar de sección o al terminar de cargarlos),
   * consultamos las respuestas para cada campo y las llenamos en el formulario.
   */
  useEffect(() => {
    // Limpiamos el form primero, para evitar datos residuales
    form.resetFields();

    if (!formulario?.id_formulario) return;   // Necesitamos el id_formulario
    if (campos.length === 0) return;          // Si no hay campos, no hacemos nada

    (async () => {
      try {
        // 3) Para cada campo llamamos a fetchFormularioRespuestabyId
        // en paralelo usando Promise.all
        const respuestas = await Promise.all(
          campos.map((campo) =>
            fetchFormularioRespuestabyId(formulario.id_formulario, campo.id_campo)
              .catch((err) => {
                console.error("Error al obtener respuesta:", err);
                return null; // manejamos errores devolviendo null
              })
          )
        );

        // 'respuestas' será un array con los valores devueltos o null en caso de error
        // Creamos un objeto con la forma { "campo-xx": valor, ... }
        const newValues = {};
        respuestas.forEach((resp, index) => {
          if (resp && resp.valor !== undefined) {
            // El nombre del campo en el form es "campo-{id_campo}"
            const campoName = `campo-${campos[index].id_campo}`;
            // Asignamos el valor que viene de la API
            newValues[campoName] = transformarValor(resp.valor, campos[index]);
          }
        });

        // Fijamos los valores en el formulario
        form.setFieldsValue(newValues);
      } catch (error) {
        console.error("Error obteniendo respuestas:", error);
      }
    })();
  }, [campos, formulario, form]);

  /**
   * Función auxiliar para transformar el valor si es DATE o BOOLEAN,
   * para que encaje con el componente (DatePicker, Switch, etc.)
   */
  const transformarValor = (valorString, campo) => {
    switch (campo.tipo_dato) {
      case "DATE":
        // Si es fecha, la convertimos a dayjs para que DatePicker la pueda mostrar
        return dayjs(valorString);
      case "BOOLEAN":
        // Si es boolean, la convertimos a true/false
        // Suponiendo que "valorString" venga como "1"/"0" o "true"/"false"
        return valorString === "1" || valorString.toLowerCase() === "true";
      case "NUMBER":
      case "FLOAT":
        // Convertir a número
        const num = parseFloat(valorString);
        return isNaN(num) ? null : num;
      default:
        // Para TEXT, ENUM, etc., devolvemos como string tal cual
        return valorString;
    }
  };

  // Cambiar la sección activa (recalculará campos + respuestas)
  const handleCambiarSeccion = (indice) => {
    setSeccionActiva(indice);
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width={800}>
      {/* Contenedor principal con dos columnas */}
      <div style={{ display: "flex" }}>
        {/* Columna izquierda: lista de secciones */}
        <div
          style={{
            width: "220px",
            borderRight: "1px solid #f0f0f0",
            padding: "16px"
          }}
        >
          <h2>Secciones</h2>
          {secciones.map((sec, i) => (
            <Button
              key={sec.id_seccion}
              block
              type={i === seccionActiva ? "primary" : "default"}
              style={{ marginBottom: "10px", textAlign: "left" }}
              onClick={() => handleCambiarSeccion(i)}
            >
              {sec.nombre_seccion}
            </Button>
          ))}
        </div>

        {/* Columna derecha: campos */}
        <div style={{ flex: 1, padding: "16px" }}>
          <Form layout="vertical" form={form}>
            {campos.length > 0 ? (
              campos.map((campo) => (
                <Form.Item
                  key={campo.id_campo}
                  label={campo.nombre_campo}
                  name={`campo-${campo.id_campo}`}
                  rules={[
                    {
                      required: campo.requerido === 1,
                      message: `${campo.nombre_campo} es requerido`
                    }
                  ]}
                >
                  {renderCampo(campo)}
                </Form.Item>
              ))
            ) : (
              <p>No hay campos disponibles para esta sección.</p>
            )}
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default VerFormularioModal;
