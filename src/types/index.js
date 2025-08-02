/**
 * @typedef {Object} PaymentData
 * @property {number} amount - Monto de la transacción
 * @property {string} purchaseNumber - Número de compra
 * @property {string} transactionToken - Token de transacción
 */

/**
 * @typedef {Object} PaymentResult
 * @property {boolean} success - Si el pago fue exitoso
 * @property {string} message - Mensaje de resultado
 * @property {string} purchaseNumber - Número de compra
 * @property {string} transactionDate - Fecha de transacción
 * @property {string} [card] - Número de tarjeta enmascarado
 * @property {string} [brand] - Marca de la tarjeta
 * @property {number} amount - Monto de la transacción
 * @property {string} currency - Moneda de la transacción
 * @property {Object} [rawData] - Datos crudos de la respuesta
 */

/**
 * @typedef {Object} VisaAuthorizationRequest
 * @property {string} captureType - Tipo de captura
 * @property {string} channel - Canal de la transacción
 * @property {boolean} countable - Si es contable
 * @property {Object} order - Datos de la orden
 * @property {number} order.amount - Monto
 * @property {string} order.currency - Moneda
 * @property {string} order.purchaseNumber - Número de compra
 * @property {string} order.tokenId - Token de transacción
 * @property {Object} dataMap - Datos adicionales
 * @property {string} dataMap.urlAddress - URL de dirección
 * @property {string} dataMap.partnerIdCode - Código de socio
 * @property {string} dataMap.serviceLocationCityName - Ciudad
 * @property {string} dataMap.serviceLocationCountrySubdivisionCode - Código de subdivisión
 * @property {string} dataMap.serviceLocationCountryCode - Código de país
 * @property {string} dataMap.serviceLocationPostalCode - Código postal
 */

/**
 * @typedef {Object} VisaAuthorizationResponse
 * @property {Object} dataMap - Datos de respuesta
 * @property {string} dataMap.STATUS - Estado de la transacción
 * @property {string} dataMap.ACTION_DESCRIPTION - Descripción de la acción
 * @property {string} dataMap.TRANSACTION_DATE - Fecha de transacción
 * @property {string} [dataMap.CARD] - Número de tarjeta
 * @property {string} [dataMap.BRAND] - Marca de la tarjeta
 * @property {Object} [order] - Datos de la orden
 * @property {number} [order.amount] - Monto
 * @property {string} [order.currency] - Moneda
 * @property {Object} [data] - Datos alternativos en caso de error
 */

/**
 * @typedef {Object} SessionData
 * @property {string} channel - Canal de la transacción
 * @property {number} amount - Monto
 * @property {Object} antifraud - Datos de antifraude
 * @property {string} antifraud.clientIp - IP del cliente
 * @property {Object} antifraud.merchantDefineData - Datos definidos por el comerciante
 * @property {Object} dataMap - Datos del portador de la tarjeta
 * @property {string} dataMap.cardholderCity - Ciudad
 * @property {string} dataMap.cardholderCountry - País
 * @property {string} dataMap.cardholderAddress - Dirección
 * @property {string} dataMap.cardholderPostalCode - Código postal
 * @property {string} dataMap.cardholderState - Estado
 * @property {string} dataMap.cardholderPhoneNumber - Teléfono
 */

/**
 * @typedef {Object} SessionResponse
 * @property {string} sessionKey - Clave de sesión
 * @property {string} [purchaseNumber] - Número de compra
 */

/**
 * @typedef {Object} HttpError
 * @property {Object} [response] - Respuesta HTTP
 * @property {Object} [response.data] - Datos de error
 * @property {string} message - Mensaje de error
 */

export // Los tipos se exportan para documentación con JSDoc
// No hay exportaciones reales ya que son solo definiciones de tipo
 {};
