import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./userSchema.js";
import crypto from "crypto";
const app = express();

app.use(express.json());
app.use(cors());
const key = Buffer.from(
  "7fa02178579af63c6dd789559c685bce76cdd72a7ef17faa3cd5d713528a4d09asds",
  "hex"
);
const iv = Buffer.from("caa1c9280dacd693a60cb5215cdf3773", "hex");
const mongoURL =
  process.env.REACT_APP_MONGODB_URL
mongoose.connect(mongoURL, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
function encrypt(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}
function decrypt(text) {
  let encryptedText = Buffer.from(text, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
app.get("/", (req, res) => {
  const data = User.find()
    .exec()
    .then((users) => {
      console.log(decrypt(users[1].givenName));
    });
  res.send("hello");
});


app.post("/checkAdd", (req, res) => {
  const email = req.body.email;
  const userName = req.body.userName;
  const password = req.body.password;
  const encryptPasswordObject = encrypt(password);
  User.findOne({ email: email }).then((user, err) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      // Create new user if user does not exist
      const newUser = new User({
        email: email,
        userName: userName,
        password: encryptPasswordObject.encryptedData,
        webLinks: {
          linkedin: "Enter your linkedin link",
          github: "Enter your github link",
          twitter: "Enter your twitter link",
          facebook: "Enter your facebook link",
          instagram: "Enter your instagram link",
          website: "Enter your website link",
        },
        profInfo: {
          education: "Enter your highest education",
          profession: "Enter your profession",
        },
        follower: 2,
        aboutYou: "Write Something about you",
      });
      newUser.save().then((upuser, err) => {
        if (err) {
          console.log(err);
        } else {
          res.send(["New user created:", newUser]);
        }
      });
    } else {
      const realPassword = decrypt(user.password);
      if (realPassword === password) {
        res.send(["password matched", user]);
      } else {
        res.send("password not matched");
      }
    }
  });
});

app.post("/update/aboutme", async (req, res) => {
  const newBoutme = req.body.aboutMe;
  const user = await User.findOne({
    $or: [{ email: req.body.email }],
  }).exec();
  user.aboutYou = newBoutme;
  user.save().then((err) => console.log("updated aboutme"));
});
app.post("/update/weblinks", async (req, res) => {
  const newlinks = req.body.webLinks;
  const user = await User.findOne({
    $or: [{ email: req.body.email }],
  }).exec();
  console.log(newlinks)
  user.webLinks.linkedin = newlinks[0];
  user.webLinks.facebook = newlinks[1];
  user.webLinks.instagram = newlinks[2];
  user.webLinks.github = newlinks[3];
  user.webLinks.twitter = newlinks[4];
  user.webLinks.website = newlinks[5];
  user.save().then((user) => console.log("updated weblinks"+user));
});
app.post("/update/password", async (req, res) => {
  const newPassword = req.body.password;
  const user = await User.findOne({
    $or: [{ email: req.body.email }],
  }).exec();
  const encryptPasswordObject = encrypt(newPassword);
  user.password =encryptPasswordObject.encryptedData;
  user.save().then((err) => console.log("updated password"));
});
app.listen(5000 || process.env.PORT, () => console.log("asds"));
