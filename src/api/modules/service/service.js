import { Router } from 'express'
import { Service } from '../../../data/mongooseModels.js'
import { ServiceHandler } from './handler/service-handle.js'
import { isAdminMiddleware } from '../../../middlewares/is-admin-validation.js'
import { validateToken } from '../../../middlewares/token-validation.js'
import { isValidClinicId } from '../../../middlewares/is-valid-clinic-id.js'

const router = Router()

const serviceHandler = new ServiceHandler(Service)

router.get(
  '/',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  serviceHandler.findMany
)
router.get(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  serviceHandler.findById
)
router.post(
  '/',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  serviceHandler.create
)
router.put(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  serviceHandler.update
)
router.delete(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidClinicId,
  serviceHandler.delete
)

export default router
