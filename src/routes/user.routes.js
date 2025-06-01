import { Router } from "express";
import registerUser from "../controllers/user.controller.js";

const router = Router()
//after being redirect to users it will come here then everything here ownwards

router.route("/register").post(registerUser)


export default router

// https://localhost:8080/api/v1/users/register