import jwtDecode from "jwt-decode";

/** Obtiene el token del localStorage */
export const getToken = () => localStorage.getItem("jwt_token");

/** Verifica si el token ha expirado */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (err) {
    console.error("Error al decodificar el token:", err);
    return true;
  }
};

/** Cierra sesión eliminando el token y redirigiendo al login */
export const logout = (navigate) => {
  localStorage.clear();
  if (navigate) navigate("/");
};

/** Verifica el token y redirige si es inválido */
export const checkTokenAndRedirect = (navigate) => {
  const token = getToken();
  
  if (!token || isTokenExpired(token)) {
    logout(navigate);
    return false;
  }
  
  return true;
};

/** Obtiene el rol del usuario desde el token */
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.rol || null;
  } catch (err) {
    console.error("Error al obtener el rol del token:", err);
    return null;
  }
};
