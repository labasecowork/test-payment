import {
  processPayment,
  savePaymentResult,
  getPaymentResult,
  createErrorResult,
} from "../../services/index.js";
import { validateRequiredFields } from "../../utils/index.js";

/**
 * Controlador para recibir el callback de Niubiz, procesar el pago y redirigir al frontend
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 */
export const handleVisaCallback = async (req, res) => {
  const { amount, purchaseNumber, reservation } = req.query;
  const { transactionToken } = req.body;

  // Validar datos requeridos
  if (!amount || !purchaseNumber || !transactionToken) {
    return res.status(400).send("Faltan datos");
  }

  try {
    console.log("Procesando pago para:", {
      amount,
      purchaseNumber,
      transactionToken,
    });

    // Procesar el pago usando la lógica del frontend
    /** @type {import("../types/index.js").PaymentData} */
    const paymentData = {
      amount: parseFloat(amount),
      purchaseNumber,
      transactionToken,
    };

    const paymentResult = await processPayment(paymentData);

    // Guardar el resultado en memoria
    savePaymentResult(purchaseNumber, paymentResult);

    // Redirigir al frontend con solo el purchaseNumber
    const redirectUrl = `http://31.97.218.15:4173/client/reservations/${reservation}?purchaseNumber=${purchaseNumber}`;

    console.log("Redirigiendo a:", redirectUrl);
    res.redirect(302, redirectUrl);
  } catch (error) {
    console.error("Error procesando callback:", error);

    // Guardar error en memoria
    const errorResult = createErrorResult(
      purchaseNumber,
      parseFloat(amount),
      "Error interno del servidor"
    );

    savePaymentResult(purchaseNumber, errorResult);

    // Redirigir al frontend incluso en caso de error
    const redirectUrl = `http://31.97.218.15:4173/client/reservations/${reservation}?purchaseNumber=${purchaseNumber}`;
    res.redirect(302, redirectUrl);
  }
};

/**
 * Controlador para obtener el resultado de un pago
 * @param {Request} req - Request de Express
 * @param {Response} res - Response de Express
 */
export const getPaymentResultController = (req, res) => {
  const { purchaseNumber } = req.params;

  // Validar datos requeridos
  const validation = validateRequiredFields(req.params, ["purchaseNumber"]);
  if (!validation.isValid) {
    return res.status(400).json({
      error: validation.message,
    });
  }

  const paymentResult = getPaymentResult(purchaseNumber);

  if (!paymentResult) {
    return res.status(404).json({
      error: "Resultado de pago no encontrado",
      purchaseNumber,
    });
  }

  console.log("Resultado de pago consultado:", {
    purchaseNumber,
    success: paymentResult.success,
  });

  res.json(paymentResult);
};
