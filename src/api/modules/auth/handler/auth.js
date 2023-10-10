import { Exception } from '../../../../util/exception.js'

export class AuthHandler {
  #userModel
  #jwt

  constructor(userModel, jwt) {
    this.#userModel = userModel
    this.#jwt = jwt
  }

  login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      throw new Exception('email and password is required', 400)
    }

    const userFound = await this.#userModel.findOne({ email, password })

    if (!userFound) {
      throw new Exception('user not found', 404)
    }

    const tokenPayload = {
      id: userFound._id.toString(),
      username: userFound.username,
      email: userFound.email,
      permissions: userFound.permissions,
      clinic: userFound.clinic,
      lab: userFound.lab,
    }

    const token = this.#jwt.encode(tokenPayload)

    res.cookie('token', token)
    return res.status(204).end()
  }
}
