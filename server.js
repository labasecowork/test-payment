import app from "./src/app.js";

const PORT = 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Disponible en: http://localhost:${PORT}`);
});

export default app;
