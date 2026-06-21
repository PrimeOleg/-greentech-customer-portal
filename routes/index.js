import express from "express";
const router = express.Router(); // creates a new router object allowing handling requests modularly
import db from "../config/db.js";

router.get("/", (req, res) => {
  res.render("index");
});

// checking if the user is allowed to view the dashboard
router.get("/dashboard", (req, res) => {
  if (!req.session.userId) {
    res.render("login");
  }
  // query which will get the user's name and their bookings
  db.query(
    "SELECT * FROM bookings WHERE user_id = ? ORDER BY date_created DESC",
    [req.session.userId],
    (err1, bookings) => {
      if (err1) return res.send("error", err1);

      db.query(
        "SELECT * FROM carbon_calculator WHERE user_id = ? ORDER BY date_of_calculation ASC",
        [req.session.userId],
        (err2, electricity) => {
          if (err2) return res.send("error", err2);

          console.log(bookings, electricity);
          res.render("dashboard", {
            user: req.session.userName,
            bookings: bookings,
            electricityData: electricity,
          });
        }
      );
    }
  );
});

// Carbon calculator functionality implementation
router.get("/calculator", (req, res) => {
  res.render("calculator");
});

router.post("/calculate", (req, res) => {
  const efactor = 0.233;
  const tfactor = 0.411;

  const electricity = req.body.electricity;
  const distance = req.body.distance;

  const totalCo2 = (electricity * efactor + distance * tfactor).toFixed(3);
  // if the user has signed in their results will be saved otherwise they will be prompted to sign up
  if (req.session.userId) {
    db.query(
      "INSERT INTO carbon_calculator (user_id, electricity_kwh, distance_travelled_miles, total_carbon) VALUES (?, ?, ?, ?)",
      [req.session.userId, electricity, distance, totalCo2],
      async (err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.render("calculator", { Co2: totalCo2 });
        }
      }
    );
  } else if (!req.session.userId) {
    const userGuest = true; // determining if the user is guest and rendering a boolean value if they are. For ejs usage
    res.render("calculator", { Co2: totalCo2, guest: userGuest });
  }
});

// Booking services system - checking if the user has signed in
router.get("/booking", (req, res) => {
  if (!req.session.userId) {
    res.render("login");
  } else {
    res.render("booking", { user: req.session.userName });
  }
});

router.post("/book", (req, res) => {
  const { service, preferred_date, extra_info } = req.body;
  // double validation in case user gets access to the dashboard while not signed in
  if (req.session.userId) {
    db.query(
      "INSERT INTO bookings (user_id, service, date_booked, extra_info) VALUES (?, ?, ?, ?)",
      [req.session.userId, service, preferred_date, extra_info],
      (err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.redirect("/dashboard"); // redirecting the user to their dashboard where the booking history will be displayed
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

router.post("/delete-booking/:id", (req, res) => {
  if (req.session.userId) {
    db.query(
      "DELETE FROM bookings WHERE id = ? AND user_id = ?",
      [req.params.id, req.session.userId],
      (err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.redirect("/dashboard");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

router.get("/blog", (req, res) => {
  res.render("blogs");
});

router.get("/products", (req, res) => {
  res.render("product");
});

router.get("/404", (req, res) => {
  res.render("../public/partials/404");
});

export default router; // making the routers available for usage in external files specifically app.js
