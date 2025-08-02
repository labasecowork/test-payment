import { Router } from "express";
import {
  handleVisaCallback,
  getPaymentResultController,
} from "../../controllers/index.js";

const router = Router();

// Endpoint para recibir el callback de Niubiz, procesar el pago y redirigir al frontend
router.post("/visa-callback", handleVisaCallback);

// Endpoint para obtener el resultado de un pago
router.get("/payment-result/:purchaseNumber", getPaymentResultController);

export default router;
