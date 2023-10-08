import { Router } from 'express'
import { Lab } from '../../../data/mongooseModels.js'
import { LabHandler } from './handler/lab-handler.js'
import { validateToken } from '../../../middlewares/token-validation.js'
import { isAdminMiddleware } from '../../../middlewares/is-admin-validation.js'
import { isValidLabId } from '../../../middlewares/is-valid-lab-id.js'

const router = Router()

const labHandler = new LabHandler(Lab)

router.get('/', validateToken, labHandler.findMany)
router.get('/:id', validateToken, labHandler.findById)
router.post(
  '/',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  labHandler.create
)
router.put(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  labHandler.update
)
router.delete(
  '/:id',
  validateToken,
  isAdminMiddleware,
  isValidLabId,
  labHandler.delete
)

export default router
