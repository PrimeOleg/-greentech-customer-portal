import express, { response } from "express";
import bcrypt from "bcryptjs"; // importing the bcrypt module for user's password encryption
const router = express.Router(); // creates a new router object allowing handling of requests modularly
import db from "../config/db.js";
import validator from "express-validator";
const { checkSchema, validationResult } = validator;
const errorSchema = {
  email: {
    isEmail: { errorMessage: "Enter a valid email" },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters longs",
    },
  },
};

// rendering the data into the ejs template to show users using get request
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Signup Functionality using post route and bcrypt and express-validator to check for password length
router.post("/signup", checkSchema(errorSchema), async (req, res) => {
  const { username, email, password } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.render("signup", {
      message: error
        .array()
        .map((i) => `${i.msg}`)
        .join(" "),
    });
  }
  const hashed = await bcrypt.hash(password, 10);

  // database query - that will insert the new user into the database based on information they provided
  db.query(
    "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
    [username, email, hashed],
    async (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).render("signup", {
            message: "User already exists in the database",
          }); // informing the user of the error that occured along with status code
        } else {
          console.log(err); // debugging purposes
          return res.status(400).render("signup", { message: err });
        }
      }
      res.redirect("/login");
    }
  );
});

// Login Functionality that will check user's credentials and allow them to sign in
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // in case the validation in ejs does not pass and the field are empty
  if (!email || !password) {
    return res
      .status(400)
      .render("login", { message: "The fields cannot be left empty" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(400).render(err);
      } else if (results.length === 0) {
        return res
          .status(404)
          .render("login", { message: "User not found please sign up" });
      }
      const user = results[0]; // storage of the user data
      console.log(bcrypt.compare(password, user.password_hash));

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match)
        return res
          .status(403)
          .render("login", { message: "Wrong Password Try Again" });
      req.session.userId = user.id;
      req.session.userName = user.name;

      res.redirect("/dashboard");
    }
  );
});

// Logout Functionality redirecting user's to their main homepage
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

export default router; // making the routers available for usage in external files specifically index.js
