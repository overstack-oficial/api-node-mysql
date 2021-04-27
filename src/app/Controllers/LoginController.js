const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const bcrypt = require("bcryptjs");

class LoginController {
  async index(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } })

    if(!userExist){
      return res.status(400).json({
        error: true,
        message: "Usuário não existe!"
      })
    }

    if(!(await bcrypt.compare(password, userExist.password))){
      return res.status(400).json({
        error: true,
        message: "Senha inválida!"
      })
    }
    
    return res.status(200).json({
      error: false,
      user: { name: userExist.name, email: userExist.email},
      token: jwt.sign(
        { id: userExist.id },
        config.secret,
        { expiresIn: config.expireIn }
      )
    })

  }
}

module.exports = new LoginController();