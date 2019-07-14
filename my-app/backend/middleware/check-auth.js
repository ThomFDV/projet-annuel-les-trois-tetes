const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("headers failed!");
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res.status(401).send("bearer failed!");
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "JWSecret-PA-poker-is-incredible", null, async (error, decryptedToken) => {
      if (error) {
        return res.status(401).send("verify failed:" + error.message);
      }

      if (!req.user) {
        return res.status(401).send("User data failed:" + error.message);
      }

      console.log("\n\nCalling next!\n\n");
      next();
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
