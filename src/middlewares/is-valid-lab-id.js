import { Exception } from '../util/exception.js'

export const isValidLabId = async (req, res, next) => {
  const { tokenDecoded } = req.headers

  const { lab } = tokenDecoded

  if (!lab) {
    throw new Exception('This user does not have a lab', 400)
  }

  return next()
}
