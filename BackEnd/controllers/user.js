import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import path from "path";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    //  console.log(req.body);
    //  console.log(req.file);

    if (!fullname || !email || !phoneNumber || !password || !role || !req.file) {
      return res.status(400).json({
        message: "something is missing",
        success: false
      })
    }
    const file = req.file;
    const fileuri = getDataUri(file);
      const cloudresponse = await cloudinary.uploader.upload(fileuri.content, { resource_type: "raw" });



    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exit with this email",
        success: false
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudresponse.secure_url
      }
    })

    return res.status(201).json({

      message: "Account created succesfully",
      success: true
    })
  } catch (err) {
    console.log(err);
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(req.body)
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false
      })
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false
      })
    }
    //check role is coorect or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exit with current role",
        success: false
      })
    }

    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1h' });

    //user bnaya bhej diya frontend pr
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).cookie("token", token, { maxAge:  60 * 60 * 1000, httpOnly: true, sameSite: 'None',secure:true }).json({
      message: `welcome back ${user.fullname}`,
      user,
      success: true
    })
  } catch (err) {
    console.log(err);
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true
    })
  } catch (err) {
    console.log(err);
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    //  console.log(req.body)
    // console.log(file)

    //cloudinary aayega
    if (req.file == undefined) {
      return res.status(400).json({
        message: "Upload Resume",
        success: false
      })
    }
    const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: "raw" });




    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      })
    }
    // updating data
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray

    // resume comes later here...
    // console.log(cloudResponse);
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname // Save the original file name
    }


    await user.save();


    //naya user bnaya bhej diya
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true
    })

  } catch (err) {
    console.log(err);
  }
}



// strict-What it does: The cookie won't be sent along with requests from other origins (i.e., cross-site requests).
//security purpoese -hacker cookie na dekh paye
// Why it's important: Helps defend against Cross-Site Request Forgery (CSRF) attacks.