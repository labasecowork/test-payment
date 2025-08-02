import axios from "axios";

/**
 * Obtiene la dirección IP del cliente
 * @returns {Promise<string>} Dirección IP del cliente
 */
export const getClientIp = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error obteniendo IP del cliente:", error);
    return "127.0.0.1"; // IP por defecto
  }
};

/**
 * Codifica credenciales en Base64
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {string} Credenciales codificadas en Base64
 */
export const encodeCredentials = (username, password) => {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString("base64");
};

/**
 * Crea headers para peticiones HTTP
 * @param {string} authorization - Token de autorización
 * @param {string} contentType - Tipo de contenido
 * @returns {Object} Headers configurados
 */
export const createHeaders = (
  authorization,
  contentType = "application/json"
) => ({
  headers: {
    Authorization: authorization,
    "Content-Type": contentType,
  },
});

/**
 * Maneja errores HTTP y los convierte en formato estándar
 * @param {Error} error - Error capturado
 * @param {string} defaultMessage - Mensaje por defecto
 * @returns {Object} Error formateado
 */
export const handleHttpError = (
  error,
  defaultMessage = "Error interno del servidor"
) => ({
  success: false,
  message: error?.response?.data?.message || error?.message || defaultMessage,
  error: error?.response?.data || null,
});

/**
 * Valida que los datos requeridos estén presentes
 * @param {Object} data - Datos a validar
 * @param {string[]} requiredFields - Campos requeridos
 * @returns {Object} Resultado de validación
 */
export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !data[field]);

  return {
    isValid: missingFields.length === 0,
    missingFields,
    message:
      missingFields.length > 0
        ? `Faltan campos requeridos: ${missingFields.join(", ")}`
        : null,
  };
};
