const router = require("express").Router();
const { User} = require("../../models");
const { validateUser } = require ('utils/auth.js');

function redirectLogin(req, res, next) {
  if (!req.session.logged_in) {
      res.redirect('/login');
  } else {
      next();
  }
}
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
router.get("/:id", redirectLogin, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id} });
    if (!user) {
      res.status(404).json({error: 'User not found'});
      return;
    }
    res.status(200).json(user);
  }catch (err) {
    res.status(500).json({error: 'Server Error'})
  }
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
// Delete one User by its `id` value
router.delete("/:id", redirectLogin, async (req, res) => {
  try { 
    await User.destroy({ where: {id: req.params.id}});
    res.status(200).json({ message: "User deleted"});
  }catch (err) {
    res.status(500).json({ error: 'error deleting user'});
  }
  // Delete associated events first
});

module.exports = router;

