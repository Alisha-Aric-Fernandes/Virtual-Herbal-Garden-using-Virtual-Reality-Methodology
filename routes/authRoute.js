import express from 'express';
import {registerController,loginController,testController,forgotPasswordController, updateProfileController} from '../controllers/authController.js';
import { isAdmin,requireSignIn } from '../middlewares/authMiddleware.js';
const router =express.Router();

router.post('/register',registerController);

//LOGIN ||POST

router.post ('/login',loginController)
//test routes

router.get('/test',requireSignIn,isAdmin,testController);

//protected routes

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
});
router.post('/forgot-password',forgotPasswordController);

router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


router.put('/profile',requireSignIn,updateProfileController);

export default router;