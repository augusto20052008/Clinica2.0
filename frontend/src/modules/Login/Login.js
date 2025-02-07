import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../utils/api";
import { getUserRole} from "../../utils/authUtils";
import "./login.css";
import logo from "../../assets/images/LogoCorazon.png";
import doctors from "../../assets/images/img aparte/DoctoresLogin.png";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // 1️⃣ Enviar credenciales al backend
      const response = await loginRequest({ correo: values.email, contraseña: values.password });

      // 2️⃣ Validar respuesta
      if (!response?.token) {
        throw new Error("No se recibió un token válido del servidor.");
      }

      // 3️⃣ Guardar token en localStorage
      localStorage.setItem("jwt_token", response.token);

      // 4️⃣ Obtener rol del usuario
      const role = getUserRole();
      if (!role) {
        throw new Error("No se encontró un rol válido en el token.");
      }

      // 5️⃣ Redirigir según el rol
      const routes = {
        Administrador: "/admin/dashboard",
        Doctor: "/doctor/dashboard",
        Enfermera: "/enfermera/dashboard",
      };

      if (routes[role]) {
        message.success("Inicio de sesión exitoso");
        navigate(routes[role]);
      } else {
        throw new Error("Rol no reconocido.");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      message.error(error.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo de la clínica" className="logo" />
        <img src={doctors} alt="Doctores" className="doctors" />
      </div>
      <div className="login-right">
        <div className="login-box">
          <Title level={2}>Clínica Hospital <span>San José</span></Title>
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off" className="login-form">
            <Form.Item
              label="Correo"
              name="email"
              rules={[
                { required: true, message: "Por favor, ingresa tu correo" },
                { type: "email", message: "Correo no válido" },
              ]}
            >
              <Input placeholder="Ingresa tu correo" />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Por favor, ingresa tu contraseña" }]}
            >
              <Input.Password placeholder="Ingresa tu contraseña" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;


