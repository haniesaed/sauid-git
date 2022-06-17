const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5500;
require("dotenv").config();
require("./src/config/connectDB");
app.use(express.json());
app.use(morgan("dev"));

app.use(cors());
require("./src/routes/index.routes")(app);
app.listen(port, () => console.log(`server is runing on port ${port}`));
