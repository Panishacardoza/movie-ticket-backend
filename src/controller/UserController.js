import Bookings from "../model/Bookings";
import User from "../model/User";
import bcrypt from "bcryptjs";

// localhost:5000/user
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ users });
};

// localhost:5000/user/signup
export const singUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  let user;
  try {
    user = new User({ name, email, password: hashedPassword });
    user = await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ id: user._id });
};

// localhost:5000/user/:id
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something wewnt wrong" });
  }

  res.status(200).json({ message: "Update Sucessfully" });
};

// localhost:5000/user/:id
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.status(200).json({ message: "Deleted Sucessfully" });
};

// localhost:5000/user/login/
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(err);
  }

  // validate existing user
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res.status(200).json({ message: "Login Sucessful", id: existingUser._id});
};

export const getBookingOfUser = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await Bookings.find({ user: id });
  } catch (err) {
    console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }

  return res.status(200).json({ booking });
};


export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch(err) {
    return console.log(err)
  }

  if(!user) {
    return res.status(500).json({message: "Unexpected Error Occured"})
  }

  return res.status(200).json({user})
}

