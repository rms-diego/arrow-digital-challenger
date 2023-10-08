import { Router } from 'express'
import { Clinic } from '../../../data/mongooseModels.js'
import { ClinicHandler } from './handler/clinic-handler.js'
import { validateToken } from '../../../middlewares/token-validation.js'
import { isAdminMiddleware } from '../../../middlewares/is-admin-validation.js'
import { isValidClinicId } from '../../../middlewares/is-valid-clinic-id.js'

const router = Router()

const clinicHandler = new ClinicHandler(Clinic)

router.get('/', validateToken, clinicHandler.findMany)
router.get('/:id', validateToken, clinicHandler.findById)
router.post(
  '/',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  clinicHandler.create
)
router.put(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  clinicHandler.update
)
router.delete(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  clinicHandler.delete
)

export default router
