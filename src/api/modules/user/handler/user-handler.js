import { Exception } from '../../../../util/exception.js'

export class UserHandler {
  #userModel

  constructor(userModel) {
    this.#userModel = userModel
  }

  /**
   * @description return all users
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  findMany = async (_req, res) => {
    const usersFound = await this.#userModel.find()
    const isEmpty = usersFound.length

    if (!isEmpty) {
      throw new Exception('No users found', 404)
    }

    return res.status(200).json(usersFound)
  }

  /**
   * @description return one user
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  findById = async (req, res) => {
    const { id } = req.params

    if (!id) {
      throw new Exception('is missing id', 400)
    }

    const userFound = await this.#userModel.findById(req.params.id)

    if (!userFound) {
      throw new Exception('user not found', 404)
    }

    return res.status(200).json(userFound)
  }

  /**
   * @description create one user
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  create = async (req, res) => {
    const { email } = req.body

    if (!email) {
      throw new Exception('email is required', 400)
    }

    const userFound = await this.#userModel.findOne({ email })

    if (userFound) {
      throw new Exception('user already exists', 400)
    }

    const user = new this.#userModel(req.body)
    const userCreated = await user.save()

    return res.status(201).json(userCreated)
  }

  /**
   * @description update one user
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  update = async (req, res) => {
    const { id } = req.params

    if (!id) {
      throw new Exception('id is required', 400)
    }

    await this.#userModel.findOneAndUpdate({ _id: id }, { $set: req.body })

    return res.status(204).end()
  }

  /**
   * @description delete one user
   * @param {Express<Request>} req the request object
   * @param {Express<Response>} res the response object
   */

  delete = async (req, res) => {
    const { id } = req.params

    if (!id) {
      throw new Exception('id is required', 400)
    }

    await this.#userModel.deleteOne({ _id: id })

    return res.status(204).end()
  }
}
