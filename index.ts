import express from "express";
import auth from "./routes/auth";
import users from "./routes/users";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", users);

const PORT = 9111;

app.listen(PORT, () => console.log("Listening on port " + PORT));
