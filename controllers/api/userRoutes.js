const router = require('express').Router();
const { User, Comment, Post } = require('../../models');
// api/users

// get all users 
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        { User }
      ],
    })
  }
}
)

// create user 
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username, 
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.userName = userData.userName;
      req.session.logged_in = true;

      res.status(200).json({user: userData, message: 'User Created!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// login user 
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'No user found' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
// logout users

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log('Logged Out Safely! Phew!')
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
