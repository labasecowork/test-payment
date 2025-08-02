import { generateToken, generateAuthorization } from "../visa/index.js";

// Almacén en memoria para guardar los resultados de los pagos
export const paymentResults = new Map();

/**
 * Procesa el resultado de un pago, se usa para obtener el resultado de la transacción
 * @param {import("../../types/index.js").PaymentData} paymentData - Datos del pago
 * @returns {Promise<import("../../types/index.js").PaymentResult>} Resultado del pago
 */
export const processPayment = async (paymentData) => {
  try {
    const { amount, purchaseNumber, transactionToken } = paymentData;

    const token = await generateToken();
    const authResponse = await generateAuthorization(
      amount,
      purchaseNumber,
      transactionToken,
      token
    );

    if (authResponse.dataMap?.STATUS === "Authorized") {
      return {
        success: true,
        message: authResponse.dataMap.ACTION_DESCRIPTION,
        purchaseNumber,
        transactionDate: authResponse.dataMap.TRANSACTION_DATE,
        card: authResponse.dataMap.CARD,
        brand: authResponse.dataMap.BRAND,
        amount: authResponse.order?.amount || amount,
        currency: authResponse.order?.currency || "PEN",
        rawData: authResponse,
      };
    } else {
      return {
        success: false,
        message: authResponse.data?.ACTION_DESCRIPTION || "Error en el pago",
        purchaseNumber,
        transactionDate:
          authResponse.data?.TRANSACTION_DATE || new Date().toISOString(),
        amount,
        currency: "PEN",
        rawData: authResponse,
      };
    }
  } catch (error) {
    console.error("Error procesando pago:", error);
    return {
      success: false,
      message: "Error procesando el pago",
      purchaseNumber: paymentData.purchaseNumber,
      transactionDate: new Date().toISOString(),
      amount: paymentData.amount,
      currency: "PEN",
      rawData: error?.response?.data,
    };
  }
};

/**
 * Guarda el resultado de un pago en memoria
 * @param {string} purchaseNumber - Número de compra
 * @param {import("../../types/index.js").PaymentResult} paymentResult - Resultado del pago
 */
export const savePaymentResult = (purchaseNumber, paymentResult) => {
  paymentResults.set(purchaseNumber, paymentResult);
  console.log("Resultado del pago guardado:", {
    purchaseNumber,
    success: paymentResult.success,
    message: paymentResult.message,
  });
};

/**
 * Obtiene el resultado de un pago guardado
 * @param {string} purchaseNumber - Número de compra
 * @returns {import("../../types/index.js").PaymentResult | null} Resultado del pago o null si no existe
 */
export const getPaymentResult = (purchaseNumber) => {
  return paymentResults.get(purchaseNumber) || null;
};

/**
 * Crea un resultado de error estándar
 * @param {string} purchaseNumber - Número de compra
 * @param {number} amount - Monto
 * @param {string} message - Mensaje de error
 * @returns {import("../../types/index.js").PaymentResult} Resultado de error
 */
export const createErrorResult = (
  purchaseNumber,
  amount,
  message = "Error interno del servidor"
) => ({
  success: false,
  message,
  purchaseNumber,
  transactionDate: new Date().toISOString(),
  amount,
  currency: "PEN",
  rawData: null,
});
