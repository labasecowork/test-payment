import { Router } from "express";
import { getToken, createSession } from "../../controllers/index.js";

const router = Router();

// Endpoint para generar token de acceso
router.get("/token", getToken);

// Endpoint para generar sesión de pago
router.post("/token/session", createSession);

export default router;
