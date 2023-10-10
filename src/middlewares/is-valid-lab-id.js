import { Exception } from '../util/exception.js'
import { Lab } from '../data/mongooseModels.js'

export const isValidLabId = async (req, res, next) => {
  const { tokenDecoded } = req.headers

  const { lab } = tokenDecoded

  if (!lab) {
    throw new Exception('This user does not have a lab', 400)
  }

  const userLabIdIsValid = await Lab.findById(tokenDecoded.lab)

  if (!userLabIdIsValid) {
    throw new Exception('This user does not have access to this lab', 400)
  }

  return next()
}
