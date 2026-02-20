/* ======================
   Get user profile
====================== */
export const getUserDetails = async (req, res, next) => {
  try {
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
    });
  } catch (err) {
    next(err);
  }
};
