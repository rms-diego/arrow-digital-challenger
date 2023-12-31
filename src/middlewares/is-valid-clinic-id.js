import { Clinic } from '../data/mongooseModels.js'
import { Exception } from '../util/exception.js'

export const isValidClinicId = async (req, res, next) => {
  const { tokenDecoded } = req.headers

  const { clinic } = tokenDecoded

  if (!clinic) {
    throw new Exception('This user does not have a clinic', 400)
  }

  const userClinicIdIsValid = await Clinic.findById(tokenDecoded.clinic)

  if (!userClinicIdIsValid) {
    throw new Exception('This user does not have access to this clinic', 400)
  }

  return next()
}
