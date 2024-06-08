const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  console.log("i am in auth middleware");
  console.log("headers ",req.headers);
  console.log("headers ",req.body);
  
  const { authorization } = req.headers

  console.log("here in auth token ",authorization)
  if (!authorization) {
    
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, 'MysecretKey')

    const founduser=await User.findOne({ _id })
    req.user = founduser.email
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth