// importing all the required modules that will be need to run the server
import express from "express";
import session from "express-session";
const app = express();
const port = 3000;
import path from "path"; // provides a way of working with the directory
import { fileURLToPath } from "url";
// As ECMAscript over common.js is used __dirname has to be assigned
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import db from "./config/db.js";

// adding middleware and routing
app.use(express.static("public")); // specifying where all the static files (files that will not change) are located
app.use(express.urlencoded({ extended: true })); // used to parse the requests
app.set("view engine", "ejs"); // setting up the view engine for rendering the web pages
app.set("views", path.join(__dirname, "views")); // joins the specified path into one

app.use(
  session({
    // using express session to organise application's functionality
    secret: "Rolsa Technologies",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // integrating session timeout
  })
);

// all paths are relative to the public directory
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";

app.use("/", indexRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
