import express from "express";
import cors from "cors";
import { authRoutes, paymentRoutes } from "./routes/index.js";

const app = express();

// Middleware para manejar CORS y parsear JSON y URL-encoded
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", authRoutes);
app.use("/", paymentRoutes);

// Middleware para manejar rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    path: req.originalUrl,
    method: req.method,
  });
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
  res.status(500).json({
    error: "Error interno del servidor",
    message: error.message,
  });
});

export default app;
