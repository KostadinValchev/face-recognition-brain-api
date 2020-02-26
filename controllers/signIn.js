const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch(err => res.status(400).json("wrong credentials"));
};

const handleFacebookSignIn = (req, res, db) => {
  const { email, userid } = req.body;

  db.select("email", "userid")
    .from("facebook_login")
    .where("userid", "=", userid)
    .then(data => {
      if (data[0].email === email) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable to get facebook user"));
      }
    })
    .catch(err => res.status(400).json("wrong facebook credentials"));
};

module.exports = {
  handleSignIn,
  handleFacebookSignIn
};
