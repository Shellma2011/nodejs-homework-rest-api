const { User } = require("../../models/user");
const handleJimp = require("../../helpers/handleJimp");

const path = require("path");
const fs = require("fs/promises");
const { createError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    if (!id) {
      throw createError(401, "Not authorized");
    }

    const { originalname, path: tempUpload } = req.file;

    const [extension] = originalname.split(".").reverse();
    const fileName = `${id}.${extension}`;
    const resultUpload = path.join(avatarsDir, fileName);
    await handleJimp(tempUpload);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", fileName);

    await User.findByIdAndUpdate(id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = uploadAvatar;
