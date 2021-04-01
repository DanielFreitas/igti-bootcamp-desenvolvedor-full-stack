import express from "express";
import { handleError } from "./helpers/errors.js";
import appRoute from "./routes/app.route.js";
import morgan from "morgan";
import { connect } from "./config/db.config.js";

const app = express();

app.use(express.json());
app.use(appRoute);
app.use(morgan("dev"));

app.use((err, req, res, next) => {
  handleError(err, res);
});

connect();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;
