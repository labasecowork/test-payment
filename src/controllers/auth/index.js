import { generateToken, generateSession } from "../../services/index.js";
import {
  getClientIp,
  validateRequiredFields,
  handleHttpError,
} from "../../utils/index.js";

/**
 * Controlador para generar token de acceso
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 */
export const getToken = async (req, res) => {
  try {
    const token = await generateToken();

    console.log("Token generado exitosamente");
    console.log("data token security:", { token });

    res.send(token);
  } catch (error) {
    console.error("Error generando token:", error);
    const errorResponse = handleHttpError(
      error,
      "Error al generar token de acceso"
    );

    res.status(500).json({
      error: errorResponse.message,
      details: error.message,
    });
  }
};

/**
 * Controlador para generar sesión de pago
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 */
export const createSession = async (req, res) => {
  try {
    const { token, amount, purchaseNumber } = req.body;

    // Validar datos requeridos
    const validation = validateRequiredFields(req.body, ["token", "amount"]);
    if (!validation.isValid) {
      return res.status(400).json({
        error: validation.message,
      });
    }

    // Obtener la IP del cliente
    const clientIp = await getClientIp();

    const sessionResponse = await generateSession(
      token,
      amount,
      clientIp,
      purchaseNumber
    );

    console.log("Sesión generada exitosamente para amount:", amount);
    console.log("data:", sessionResponse);

    res.json(sessionResponse);
  } catch (error) {
    console.error("Error generando sesión:", error);
    const errorResponse = handleHttpError(
      error,
      "Error al generar sesión de pago"
    );

    res.status(500).json({
      error: errorResponse.message,
      details: error.message,
    });
  }
};
