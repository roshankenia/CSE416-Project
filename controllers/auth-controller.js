const auth = require("../auth");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

getLoggedIn = async (req, res) => {
  try {
    let userId = auth.verifyUser(req);
    if (!userId) {
      return res.status(400).json({
        loggedIn: false,
        user: null,
        errorMessage: "?",
      });
    }

    const loggedInUser = await User.findOne({ _id: userId });
    console.log("loggedInUser: " + loggedInUser);

    return res.status(200).json({
      loggedIn: true,
      user: loggedInUser,
    });
  } catch (err) {
    console.log("err: " + err);
    res.json(false);
  }
};

findById = async (req, res) => {
  console.log("Find User with id: " + JSON.stringify(req.params.id));

  await User.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    } else if (!user) {
      return res.status(400).json({ success: false, error: "User not found" });
    }
    console.log("Found user: " + JSON.stringify(user));

    return res.status(200).json({ success: true, user: user });
  }).catch((err) => console.log(err));
};

removeFriendRequest = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const { sentUserEmail, receivedUserEmail } = req.body;
  console.log(sentUserEmail, " ", receivedUserEmail);

  //first find sent user
  await User.findOne({ email: sentUserEmail }, async (err1, sentUser) => {
    console.log("found sent user: " + JSON.stringify(sentUser));
    //now find received user
    await User.findOne({ email: receivedUserEmail }, (err2, receivedUser) => {
      console.log("found receieve user: " + JSON.stringify(receivedUser));

      sentUserId = JSON.stringify(sentUser._id);
      //remove request from received user
      for (var i = 0; i < receivedUser.requests.length; i++) {
        requestId = JSON.stringify(receivedUser.requests[i]._id);
        console.log(sentUserId, " and ", requestId);
        if (requestId == sentUserId) {
          console.log("ids equal");
          receivedUser.requests.splice(i, 1);
          break;
        }
      }

      receivedUser.guest = false;

      receivedUser
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            receivedUser: receivedUser,
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Friend Request not removed!",
          });
        });
    }).catch((err2) => console.log(err));
  }).catch((err1) => console.log(err));
};

removeFriend = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const { sentUserEmail, receivedUserEmail } = req.body;
  console.log(sentUserEmail, " ", receivedUserEmail);

  //first find sent user
  await User.findOne({ email: sentUserEmail }, async (err1, sentUser) => {
    console.log("found sent user: " + JSON.stringify(sentUser));
    //now find received user
    await User.findOne({ email: receivedUserEmail }, (err2, receivedUser) => {
      console.log("found receive user: " + JSON.stringify(receivedUser));

      sentUserId = JSON.stringify(sentUser._id);
      //remove friend from received user
      for (var i = 0; i < receivedUser.friends.length; i++) {
        requestId = JSON.stringify(receivedUser.friends[i]._id);
        console.log(sentUserId, " and ", requestId);
        if (requestId == sentUserId) {
          console.log("ids equal");
          receivedUser.friends.splice(i, 1);
          break;
        }
      }

      receivedUserId = JSON.stringify(receivedUser._id);
      //remove friend from sent user
      for (var i = 0; i < sentUser.friends.length; i++) {
        requestId = JSON.stringify(sentUser.friends[i]._id);
        console.log(receivedUserId, " and ", requestId);
        if (requestId == receivedUserId) {
          console.log("ids equal");
          sentUser.friends.splice(i, 1);
          break;
        }
      }

      receivedUser.guest = false;
      sentUser.guest = false;

      sentUser.save();

      receivedUser
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            receivedUser: receivedUser,
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Friend not removed!",
          });
        });
    }).catch((err2) => console.log(err));
  }).catch((err1) => console.log(err));
};

addFriendRequest = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const { sentUserEmail, receivedUserEmail } = req.body;
  console.log(sentUserEmail, " ", receivedUserEmail);

  //first find sent user
  await User.findOne({ email: sentUserEmail }, async (err1, sentUser) => {
    console.log("found sent user: " + JSON.stringify(sentUser));
    //now find received user
    await User.findOne({ email: receivedUserEmail }, (err2, receivedUser) => {
      console.log("found sent user: " + JSON.stringify(receivedUser));

      if (!receivedUser.requests.includes(sentUser)) {
        receivedUser.requests.push(sentUser);
      }

      receivedUser.guest = false;

      receivedUser
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            receivedUser: receivedUser,
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Friend Request not sent!",
          });
        });
    }).catch((err2) => console.log(err));
  }).catch((err1) => console.log(err));
};

addFriend = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const { sentUserEmail, receivedUserEmail } = req.body;
  console.log(sentUserEmail, " ", receivedUserEmail);

  //first find sent user
  await User.findOne({ email: sentUserEmail }, async (err1, sentUser) => {
    console.log("found sent user: " + JSON.stringify(sentUser));
    //now find received user
    await User.findOne({ email: receivedUserEmail }, (err2, receivedUser) => {
      console.log("found receieved user: " + JSON.stringify(receivedUser));

      //update friends list of each
      sentUser.friends.push(receivedUser);
      receivedUser.friends.push(sentUser);

      sentUserId = JSON.stringify(sentUser._id);
      //remove request from received user
      for (var i = 0; i < receivedUser.requests.length; i++) {
        requestId = JSON.stringify(receivedUser.requests[i]._id);
        console.log(sentUserId, " and ", requestId);
        if (requestId == sentUserId) {
          console.log("ids equal");
          receivedUser.requests.splice(i, 1);
          break;
        }
      }

      sentUser.guest = false;
      receivedUser.guest = false;

      sentUser.save();
      receivedUser
        .save()
        .then(() => {
          console.log("SUCCESS!!!");
          return res.status(200).json({
            success: true,
            receivedUser: receivedUser,
          });
        })
        .catch((error) => {
          console.log("FAILURE: " + JSON.stringify(error));
          return res.status(404).json({
            error,
            message: "Friends not added!",
          });
        });
    }).catch((err2) => console.log(err));
  }).catch((err1) => console.log(err));
};

searchUsers = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      errorMessage: "Improperly formatted request",
    });
  }

  const { username } = req.body;
  console.log(username);

  await User.find(
    { username: { $regex: new RegExp("^" + username, "i") } },
    (err, usernames) => {
      console.log("found usernames: " + JSON.stringify(usernames));
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!usernames) {
        console.log("!usernames.length");
        return res
          .status(404)
          .json({ success: false, error: "Users not found" });
      } else {
        console.log("Send the Users");
        return res.status(200).json({ success: true, usernames: usernames });
      }
    }
  ).catch((err) => console.log(err));
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
        user: existingUser,
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
    })
    .status(200)
    .json({
      success: true,
    })
    .send();
};

createGuest = async (req, res) => {
  try {
    const { username, guest } = req.body;
    console.log("create user: " + username);
    if (!username) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const newUser = new User({
      guest,
      username,
    });
    const savedUser = await newUser
      .save()
      .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
          success: true,
          newUser: newUser,
          message: "Guest Created!",
        });
      })
      .catch((error) => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
          error,
          message: "Guest not created!",
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordVerify,
      username,
      guest,
    } = req.body;
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
        user: savedUser,
      });

    console.log("token sent");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu - user knows current password and wants to change their password
changePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword, newPassVerify } = req.body;

    const currentUser = await User.findOne({ username: username });
    console.log("currentUser: " + currentUser);
    if (!currentUser) {
      return res.status(401).json({
        errorMessage: "Current User's username not found in database.",
      });
    }

    // Checking to see if user entered their correct current password
    console.log("provided verification password: " + currentPassword);
    const passwordCorrect = await bcrypt.compare(
      currentPassword,
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

    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// @Jeff Hu - user does not know current password and needs to recover account by resetting password
resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(401).json({
        errorMessage: "Current User's email not found in database.",
      });
    }

    //We should generate a random password here but for now it is hardcoded
    const tempPassword = "12345678";
    //We would then email the generated password to the given email address here

    // Hashing the new password and changing the user's password to the new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(tempPassword, salt);
    console.log("passwordHash: " + newPasswordHash);

    existingUser.passwordHash = newPasswordHash;
    await existingUser.save();

    res.status(200).json({
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

// @Jeff Hu - user wants to delete their account
deleteAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const currentUser = await User.findOne({ username: username });
    console.log("currentUser: " + currentUser);
    if (!currentUser) {
      return res.status(401).json({
        errorMessage: "Current User's username not found in database.",
      });
    }

    // Checking to see if user entered their correct current password
    console.log("provided verification password: " + password);
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
    const deletedUser = await User.findOneAndDelete({ username: username });
    if (!deletedUser) {
      return res.status(401).json({
        errorMessage:
          "Current User's username not found in database and user could not be deleted.",
      });
    }

    res.status(200).json({
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
  deleteAccount,
  createGuest,
  searchUsers,
  addFriendRequest,
  addFriend,
  removeFriendRequest,
  removeFriend,
  findById
};
