const bcrypt = require("bcrypt")
const joi = require("joi")
const express = require("express")
const { User } = require("../models/user")
const genAuthToken = require("../utils/genAuthToken")

const router = express.Router()

router.post("/", async (req, res) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if(!user) return res.status(400).send("Invalid email or password...");

  const isValid = await bcrypt.compare(req.body.password, user.password)

  if(!isValid) return res.status(400).send("Invalid email or password...");

    const token = genAuthToken(user)

    res.send(token)
})

module.exports = router