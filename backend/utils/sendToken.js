const sendToken = (user, statusCode, res) => {
  const token = user.getjwt();
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
   maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
