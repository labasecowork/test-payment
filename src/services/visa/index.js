import axios from "axios";
import {
  VISA_USER,
  VISA_PWD,
  VISA_URL_SECURITY,
  VISA_URL_SESSION,
  VISA_URL_AUTHORIZATION,
} from "../../../config/index.js";
import { encodeCredentials, createHeaders } from "../../utils/index.js";

/**
 * Genera un token de acceso para las APIs de Visa
 * @returns {Promise<string>} Token de acceso
 */
export const generateToken = async () => {
  const credentials = encodeCredentials(VISA_USER, VISA_PWD);
  const headers = {
    headers: {
      Accept: "*/*",
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    responseType: "text",
  };

  const response = await axios.post(VISA_URL_SECURITY, {}, headers);
  return response.data;
};

/**
 * Genera una sesión de pago para Visa
 * @param {string} token - Token de autorización
 * @param {number} amount - Monto de la transacción
 * @param {string} clientIp - IP del cliente
 * @param {string} [purchaseNumber] - Número de compra opcional
 * @returns {Promise<import("../types/index.js").SessionResponse>} Respuesta con sessionKey
 */
export const generateSession = async (
  token,
  amount,
  clientIp,
  purchaseNumber
) => {
  const headers = createHeaders(token);

  /** @type {import("../types/index.js").SessionData} */
  const sessionData = {
    channel: "web",
    amount: amount,
    antifraud: {
      clientIp: clientIp,
      merchantDefineData: {
        MDD4: "integraciones.guillermo@necomplus.com",
        MDD32: "250376",
        MDD75: "Registrado",
        MDD77: "7",
      },
    },
    dataMap: {
      cardholderCity: "Lima",
      cardholderCountry: "PE",
      cardholderAddress: "Av Principal A-5. Campoy",
      cardholderPostalCode: "15046",
      cardholderState: "LIM",
      cardholderPhoneNumber: "986322205",
    },
  };

  const response = await axios.post(VISA_URL_SESSION, sessionData, headers);

  return {
    sessionKey: response.data.sessionKey,
    purchaseNumber: purchaseNumber || null,
  };
};

/**
 * Genera una autorización de pago para Visa para obtener el resultado de la transacción
 * @param {number} amount - Monto de la transacción
 * @param {string} purchaseNumber - Número de compra
 * @param {string} transactionToken - Token de transacción
 * @param {string} token - Token de acceso generado
 * @returns {Promise<import("../types/index.js").VisaAuthorizationResponse>} Respuesta de autorización
 */
export const generateAuthorization = async (
  amount,
  purchaseNumber,
  transactionToken,
  token
) => {
  /** @type {import("../types/index.js").VisaAuthorizationRequest} */
  const authData = {
    captureType: "manual",
    channel: "web",
    countable: true,
    order: {
      amount: amount,
      currency: "PEN",
      purchaseNumber: purchaseNumber,
      tokenId: transactionToken,
    },
    dataMap: {
      urlAddress: "https://desarrolladores.niubiz.com.pe/",
      partnerIdCode: "",
      serviceLocationCityName: "LIMA",
      serviceLocationCountrySubdivisionCode: "LIMA",
      serviceLocationCountryCode: "PER",
      serviceLocationPostalCode: "15074",
    },
  };

  const headers = createHeaders(token);
  const response = await axios.post(VISA_URL_AUTHORIZATION, authData, headers);

  return response.data;
};
