const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("user not found!");
      }
    })
    .catch(err => res.status(400).json("error getting user"));
};

const handleFacebookProfile = (req, res, db) => {
  const userid = req.params.id;
  db.select("*")
    .from("facebook_login")
    .where({ userid })
    .then(user => {
      if (user.length) {
        res.status(200).json("user is authenticated");
      } else {
        res.status(204).json("no such a user with facebook credentials");
      }
    });
};

const handleResetPassword = (req, res, db, bcrypt) => {
  const { email, password, newPassword } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        const newPass = bcrypt.hashSync(newPassword);
        return db("login")
          .update("hash", newPass)
          .where("email", email)
          .then(user => {
            res.status(200).json("Password successfully changed");
          })
          .catch(err => res.status(400).json("Unable to change password"));
      } else {
        res.status(400).json("Wrong or invalid password");
      }
    })
    .catch(err => res.status(400).json("Wrong credentials"));
};

module.exports = {
  handleProfile,
  handleFacebookProfile,
  handleResetPassword
};
