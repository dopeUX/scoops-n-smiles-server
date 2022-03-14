require('dotenv').config({ path: '.env' });
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const {router} = require('../connection');

router.route('/login/').post(async (req, res) => {
  // console.log(req.body);

  const user = await userModel.findOne({
    email: req.body.email,
  })
  if (user) {
    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (isPassValid) {
      const token = jwt.sign({
        email: user.email
      }, process.env.JWT_SECRET_KEY);
      console.log('user exists TOKEN:' + token);
      return res.json({ token: token, user: true });
    }
    else {
      return res.json({ status: 'error logging in user' })
    }
  }
  else {
    return res.json({ user: false });
  }

});

module.exports = router;