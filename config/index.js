const VISA_DEVELOPMENT = true; // True: Ambiente QA | False: Ambiente Producción

// Desarrollo Visa
const VISA_DEV_MERCHANT_ID = "456879852"; // Código Soles
const VISA_DEV_USER = "integraciones@niubiz.com.pe";
const VISA_DEV_PWD = "_7z3@8fF";
const VISA_DEV_URL_SECURITY =
  "https://apisandbox.vnforappstest.com/api.security/v1/security";
const VISA_DEV_URL_SESSION = `https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/${VISA_DEV_MERCHANT_ID}`;
const VISA_DEV_URL_JS =
  "https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js";
const VISA_DEV_URL_AUTHORIZATION = `https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/${VISA_DEV_MERCHANT_ID}`;

// Producción Visa
const VISA_PRD_MERCHANT_ID = "527127703";
const VISA_PRD_USER = "integraciones.visanet@necomplus.com";
const VISA_PRD_PWD = "d5e7nk$M";
const VISA_PRD_URL_SECURITY =
  "https://apiprod.vnforapps.com/api.security/v1/security";
const VISA_PRD_URL_SESSION = `https://apiprod.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/${VISA_PRD_MERCHANT_ID}`;
const VISA_PRD_URL_JS =
  "https://static-content.vnforapps.com/v2/js/checkout.js";
const VISA_PRD_URL_AUTHORIZATION = `https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/${VISA_PRD_MERCHANT_ID}`;

// Configuración visa actual
export const VISA_MERCHANT_ID = VISA_DEVELOPMENT
  ? VISA_DEV_MERCHANT_ID
  : VISA_PRD_MERCHANT_ID;
export const VISA_USER = VISA_DEVELOPMENT ? VISA_DEV_USER : VISA_PRD_USER;
export const VISA_PWD = VISA_DEVELOPMENT ? VISA_DEV_PWD : VISA_PRD_PWD;
export const VISA_URL_SECURITY = VISA_DEVELOPMENT
  ? VISA_DEV_URL_SECURITY
  : VISA_PRD_URL_SECURITY;
export const VISA_URL_SESSION = VISA_DEVELOPMENT
  ? VISA_DEV_URL_SESSION
  : VISA_PRD_URL_SESSION;
export const VISA_URL_JS = VISA_DEVELOPMENT ? VISA_DEV_URL_JS : VISA_PRD_URL_JS;
export const VISA_URL_AUTHORIZATION = VISA_DEVELOPMENT
  ? VISA_DEV_URL_AUTHORIZATION
  : VISA_PRD_URL_AUTHORIZATION;

export {
  VISA_DEVELOPMENT,
  VISA_DEV_MERCHANT_ID,
  VISA_DEV_USER,
  VISA_DEV_PWD,
  VISA_DEV_URL_SECURITY,
  VISA_DEV_URL_SESSION,
  VISA_DEV_URL_JS,
  VISA_DEV_URL_AUTHORIZATION,
  VISA_PRD_MERCHANT_ID,
  VISA_PRD_USER,
  VISA_PRD_PWD,
  VISA_PRD_URL_SECURITY,
  VISA_PRD_URL_SESSION,
  VISA_PRD_URL_JS,
  VISA_PRD_URL_AUTHORIZATION,
};
