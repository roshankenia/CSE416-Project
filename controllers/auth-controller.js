const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

getLoggedIn = async (req, res) => {
  try {
    let userId = auth.verifyUser(req);
    if (!userId) {
      return res.status(200).json({
        loggedIn: false,
        user: null,
        errorMessage: "?",
      });
    }

    const loggedInUser = await User.findOne({ _id: userId });
    console.log("loggedInUser: " + loggedInUser);

    return res.status(200).json({
      loggedIn: true,
      user: {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        username: loggedInUser.username,
      },
    });
  } catch (err) {
    console.log("err: " + err);
    res.json(false);
  }
};

loginUser = async (req, res) => {
  console.log("loginUser");
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const existingUser = await User.findOne({ username: username });
    console.log("existingUser: " + existingUser);
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Wrong username or password provided.",
      });
    }

    console.log("provided password: " + password);
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      console.log("Incorrect password");
      return res.status(401).json({
        errorMessage: "Wrong username or password provided.",
      });
    }

    // LOGIN THE USER
    const token = auth.signToken(existingUser._id);
    console.log(token);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          username: existingUser.username,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

logoutUser = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    }).status(200)
    .json({
      success: true,
      })
    .send();
};

registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordVerify, username, guest } =
      req.body;
    console.log(
      "create user: " +
        firstName +
        " " +
        lastName +
        " " +
        email +
        " " +
        password +
        " " +
        passwordVerify +
        " " +
        username
    );
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordVerify ||
      !username
    ) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }
    console.log("all fields provided");
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 8 characters.",
      });
    }
    console.log("password long enough");
    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }
    console.log("password and password verify match");
    const existingUser = await User.findOne({ email: email });
    console.log("existingUser: " + existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorMessage: "An account with this email address already exists.",
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("passwordHash: " + passwordHash);

    const newUser = new User({
      guest,
      firstName,
      lastName,
      email,
      passwordHash,
      username,
    });
    const savedUser = await newUser.save();
    console.log("new user saved: " + savedUser._id);

    // LOGIN THE USER
    const token = auth.signToken(savedUser._id);
    console.log("token:" + token);

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          username: savedUser.username,
        },
      });

    console.log("token sent");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu - user knows current password and wants to change their password
changePassword = async (req, res) => {
  try{
    const {username, currPassword, newPassword, newPassVerify} = req.body;

    const currentUser = await User.findOne({ username: username });
    console.log("currentUser: " + currentUser);
    if (!currentUser) {
      return res.status(401).json({
        errorMessage: "Current User's username not found in database.",
      });
    }

    // Checking to see if user entered their correct current password
    console.log("provided verification password: " + currPassword);
    const passwordCorrect = await bcrypt.compare(
      currPassword,
      currentUser.passwordHash
    );
    if (!passwordCorrect) {
      console.log("Incorrect password");
      return res.status(401).json({
        errorMessage: "Wrong password provided.",
      });
    }

    // Checking to see if the new password was entered twice correctly
    if (newPassword !== newPassVerify) {
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });
    }

    // Hashing the new password and changing the user's password to the new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    console.log("passwordHash: " + newPasswordHash);

    // ***I'm not sure if this is the proper way to set the new password hash
    currentUser.passwordHash = newPasswordHash;
    await currentUser.save();

    res
      .status(200)
      .json({
        success: true,
        user: {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          username: currentUser.username,
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu - user does not know current password and needs to recover account by resetting password
resetPassword = async (req, res) => {
  try {
    const {email} = req.body;

    const existingUser = await User.findOne({email: email})
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Current User's email not found in database.",
      });
    }

    //We should generate a random password here but for now it is hardcoded
    const tempPassword = '12345678'
    //We would then email the generated password to the given email address here

    // Hashing the new password and changing the user's password to the new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(tempPassword, salt);
    console.log("passwordHash: " + newPasswordHash);

    // ***I'm not sure if this is the proper way to set the new password hash
    existingUser.set({passwordHash: newPasswordHash});
    await existingUser.save();

    res
      .status(200)
      .json({
        success: true,
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          username: existingUser.username,
        }
      });

  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu - user wants to delete their account
deleteAccount = async (req, res) => {
  try{
    const {username, password} = req.body;

    const currentUser = await User.findOne({ username: username });
      console.log("currentUser: " + currentUser);
      if (!currentUser) {
        return res.status(401).json({
          errorMessage: "Current User's username not found in database.",
        });
      }
  
      // Checking to see if user entered their correct current password
      console.log("provided verification password: " + currPassword);
      const passwordCorrect = await bcrypt.compare(
        password,
        currentUser.passwordHash
      );
      if (!passwordCorrect) {
        console.log("Incorrect password");
        return res.status(401).json({
          errorMessage: "Wrong password provided.",
        });
      }
  
    // mongoose finds user by username and deletes user from database
    // not sure if this is the best way to delete from database
    const deletedUser = await findOneAndDelete({username: username})
    if (!deletedUser) {
      return res.status(401).json({
        errorMessage: "Current User's username not found in database and user could not be deleted.",
      });
    }
  
    res
        .status(200)
        .json({
          success: true,
          user: {
            firstName: deletedUser.firstName,
            lastName: deletedUser.lastName,
            email: deletedUser.email,
            username: deletedUser.username,
          },
        });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  resetPassword,
  deleteAccount
};
