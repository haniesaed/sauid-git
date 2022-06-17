const jwt = require('jsonwebtoken')
const getID = (token) => {
  var id
  jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
    if (decodedToken) id = decodedToken.id
    else throw new Error(err)
  })
  return id
}

module.exports = getID
