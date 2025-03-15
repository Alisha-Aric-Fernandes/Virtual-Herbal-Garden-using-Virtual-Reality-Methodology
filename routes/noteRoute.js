import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get('/',requireSignIn, getNotes);
router.post('/',requireSignIn, createNote);
router.put('/:id', requireSignIn,updateNote);
router.delete('/:id', requireSignIn,deleteNote);

export default router;
