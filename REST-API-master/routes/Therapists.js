const express = require("express");
const router = express.Router();
const Therapist = require("../models/Therapist");
let props = [
  'firstname',
  'lastname',
  'id',
  'tz_number',
  'profession',
  'institute',
  'login',
  'password',
];

const ObjType = Therapist; 


//Get All
router.get("/", async (req, res) => {
  try {
    const users = await ObjType.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get One
router.get("/:id", getUser, (req, res) => {
  res.json(res.user);
});

//Create One
router.post("/", async (req, res) => {
  let obj = [];
  props.forEach( (prop) => {
    obj[prop] = req.body[prop]
  });
  const user = new Therapist(obj);
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Patch One
router.patch("/:id", getUser, async (req, res) => {
  props.forEach( (prop) => {
    if (req.body[prop] != null) {
      res.user[prop] = req.body[prop];
    }
  })
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Put One
router.put("/:id", getUser, async (req, res) => {
  try {
    const updatedUser = await res.user.set(req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "Therapist has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getUser middleware
async function getUser(req, res, next) {
  let user;
  try {
    user = await Therapist.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find Therapist" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
