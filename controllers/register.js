const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("unable to register"));
};

const handleFacebookRegister = (req, res, db) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json("incorrect form submission");
  }
  return db("users").insert({ email: email, name: name }).then(user => console.log(user))
};

module.exports = {
  handleRegister: handleRegister,
  handleFacebookRegister
};
