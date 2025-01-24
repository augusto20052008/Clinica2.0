import jwtDecode from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (err) {
    console.error("Error decoding token:", err);
    return true;
  }
};

export const checkTokenAndRedirect = () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
};
