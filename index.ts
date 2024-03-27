import express from "express";
import auth from "./routes/auth";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());
app.use("/api/auth", auth);

app.listen(9111, () => console.log("Listening on port 9111..."));
