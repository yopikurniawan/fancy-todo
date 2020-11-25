const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

const authentication = async (req, res, next) => {
  const {access_token} = req.headers
  try {
    if (!access_token) {
      throw {msg: 'Authentication failed'}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({where: {email: decoded.email}})
      
      if (!user) {
        throw {msg: 'Authentication failed'}
      } else {
        req.loggedInUser = decoded
        console.log("🚀 ~ file: authentication.js ~ line 17 ~ authentication ~ req.loggedInUser", req.loggedInUser)
        next()
      }
    }
  } catch (error) {
    next(error) 
  }
}

module.exports = authentication