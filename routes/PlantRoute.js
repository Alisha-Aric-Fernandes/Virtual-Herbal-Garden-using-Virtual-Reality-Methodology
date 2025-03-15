import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createPlantController, deletePlantController, getPlantController, getSinglePlantController, updatePlantController , plantModelController, plantFiltersController, plantCountController, plantListController, searchPlantController, relatedPlantController, plantCategoryController} from '../controllers/plantController.js';

import ExpressFormidable from 'express-formidable';

const router=express.Router();


//routes

router.post('/create-plant',requireSignIn,isAdmin,ExpressFormidable(),createPlantController);

router.get('/get-plant',getPlantController);

router.get('/get-plant/:slug',getSinglePlantController);
router.get("/plant-threeDModel/:pid", plantModelController);
router.delete("/delete-plant/:pid", deletePlantController);

router.put('/update-plant/:pid',requireSignIn,isAdmin,ExpressFormidable(),updatePlantController);

router.post("/plant-filters", plantFiltersController);


router.get("/plant-count", plantCountController);

router.get("/plant-list/:page", plantListController);


router.get("/search/:keyword", searchPlantController);
router.get("/related-plant/:pid/:cid", relatedPlantController);
router.get("/plant-category/:slug", plantCategoryController);


export default router;





