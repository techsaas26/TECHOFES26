import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  T_ID: { type: String, unique: true, required: true, index: true },
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  passwordHash: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  rollNo: { type: String, required: true },
  college: { type: String, required: true },
  failedAttempts: { type: Number, default: 0 },
}, { timestamps: true });

// Hide sensitive fields in JSON responses
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
