/* ======================
   Get user profile
====================== */
export const getUserDetails = async (req, res, next) => {
  try {
<<<<<<< HEAD
    if (!req.user)
      throw { isCustom: true, message: "User not found", status: 404 };

    const {
      T_ID,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      rollNo,
      college,
    } = req.user;

    res.json({
      T_ID,
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      rollNo,
      college,
=======
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = req.user.toJSON();

    res.json({
      T_ID: user.T_ID,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      rollNo: user.rollNo,
      college: user.college,
      department: user.department,
      createdAt: user.createdAt,
>>>>>>> upstream/main
    });
  } catch (err) {
    next(err);
  }
};
