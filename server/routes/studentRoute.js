import { Router } from "express";
import { loginStudent, registerStudent, logoutStudent} from "../controllers/studentController.js";
const router = Router();

router.route("student-signup").post(registerStudent);
router.route("login").post(loginStudent);
router.route("logout").get(logoutStudent);

export default router;
