/*
api/auth/index.js mounts all routes inside the models folder
these routes are mounted in ../../server.js on the route '/api/auth'
*/
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'auth API'
  });
});

export default router;
