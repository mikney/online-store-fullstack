import {Router} from "express";
const router = Router();
import userController from "../controllers/userController"
import authMiddleware from "../middelware/authMiddleware";


router.post('/registration', userController.registration)
router.get('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)


export default router;