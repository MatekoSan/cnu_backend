import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

// Recipe routes
router.get("/", services.recipes.getAllRecipes);

router.get(
  "/:id",
  param("id").isInt({ min: 1, max: 75 }),
  services.recipes.getRecipe
);

router.post(
  "/",
  body("title").isLength({ min: 2, max: 50 }),
  body("rating").isInt({ min: 1, max: 5 }),
  services.recipes.addRecipe
);

router.put(
  "/:id",
  body("title").isLength({ min: 2, max: 50 }),
  body("rating").isInt({ min: 1, max: 5 }),
  services.recipes.editRecipe
);

router.delete(
  "/:id",
  param("id").isInt({ min: 1, max: 75 }),
  services.recipes.deleteRecipe
);

// Rating routes
router.get(
  "/:id/rating",
  param("id").isInt({ min: 1, max: 75 }),
  services.recipes.getRating
);

router.put(
  "/:id/rating",
  param("id").isInt({ min: 1, max: 75 }),
  body("rating").isInt({ min: 1, max: 5 }),
  services.recipes.editRating
);

export default router;
