const router = require("express").Router();
const { User, Event } = require("../../models");

// Get all User
router.get("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      (req.session.logged_in = true), res.status(200).json(userData);
    });
  } catch (err) {
    res.status(404).json({ err: "error loading page" });
  }
});

// Get one User
router.get("/:id", async (req, res) => {
  // Find a single User by the id
});

// Create a new User
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  // Delete one User by its `id` value
  // Delete associated events first
});

module.exports = router;

