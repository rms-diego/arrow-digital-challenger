import { Router } from 'express'
import { Order } from '../../../data/mongooseModels.js'
import { OrderHandler } from './handler/order-handler.js'
import { validateToken } from '../../../middlewares/token-validation.js'
import { isAdminMiddleware } from '../../../middlewares/is-admin-validation.js'
import { isValidLabId } from '../../../middlewares/is-valid-lab-id.js'
import { isValidClinicId } from '../../../middlewares/is-valid-clinic-id.js'

const orderHandler = new OrderHandler(Order)
const router = Router()

// TODO: populate order with dentist and patient from clinic table

router.get(
  '/',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  isValidClinicId,
  orderHandler.findMany
)
router.get(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  isValidClinicId,
  orderHandler.findById
)
router.post(
  '/',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  isValidClinicId,
  orderHandler.create
)
router.put(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  isValidClinicId,
  orderHandler.update
)
router.delete(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  isValidClinicId,
  orderHandler.delete
)

export default router
