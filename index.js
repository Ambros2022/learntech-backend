const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/* ===============================
   TRUST PROXY (IMPORTANT)
   Required behind Coolify / Traefik
================================ */
app.set("trust proxy", 1);

/* ===============================
   CORS CONFIGURATION
================================ */
app.use(
   cors({
      origin: [
         "https://learntechww.com",
         "https://www.learntechww.com",
         

         // test / preprod / dev
         "http://localhost:3000",
         "http://localhost:3001",
         "https://learntech-admin.vercel.app",
         "http://localhost:5173",
         "https://learntech-git-main-learntech-edu-solutions-pvt-ltds-projects.vercel.app",
         "https://learntech-git-ce0616-learntech-edu-solutions-pvt-ltds-projects.vercel.app"
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
   })
);

/* ===============================
   BODY PARSERS
================================ */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   FILE UPLOAD
================================ */
app.use(
   fileUpload({
      limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
      createParentPath: true,
      useTempFiles: true,
      tempFileDir: "/tmp"
   })
);

/* ===============================
   STATIC FILES
================================ */
app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use("/", express.static(path.join(__dirname, "storage")));
app.use(express.static(path.join(__dirname, "storage")));

/* ===============================
   DATABASE INIT
================================ */
const db = require("./app/models");

/* ===============================
   HEALTH CHECK (MANDATORY)
   Used by Coolify
================================ */
app.get("/health", (req, res) => {
   res.status(200).json({ status: "ok" });
});

/* ===============================
   DB CONNECTION CHECK
================================ */
app.get("/db-check", async (req, res) => {
   try {
      await db.sequelize.authenticate();
      res.status(200).json({ status: "success", message: "Database is connected successfully." });
   } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ status: "error", message: "Database connection failed.", error: error.message });
   }
});

/* ===============================
   ROOT / API ROUTES
================================ */
app.get("/", (req, res) => {
   res.json({ message: "Welcome to Learntechww.com API" });
});

app.get("/api", (req, res) => {
   res.json({ message: "Welcome to Learntechww.com v1.2811" });
});

/* ===============================
   API ROUTES
================================ */
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/web.routes")(app);

/* ===============================
   START SERVER (HTTP ONLY)
   SSL handled by Coolify / Traefik
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
   console.log(`🚀 Server running on port ${PORT}`);
});
