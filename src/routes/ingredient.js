import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.get("/", services.ingredients.getAllIngredients);

router.get(
  "/:id",
  param("id").isInt({ min: 1, max: 100 }),
  services.ingredients.getIngredient
);

router.post(
  "/",
  body("title").isLength({ min: 2, max: 50 }),
  body("unit").isLength({ min: 1, max: 5 }),
  services.ingredients.addIngredient
);

router.put(
  "/:id",
  body("title").isLength({ min: 2, max: 50 }),
  body("unit").isLength({ min: 1, max: 5 }),
  services.ingredients.editIngredient
);

router.delete(
  "/:id",
  param("id").isInt({ min: 1, max: 100 }),
  services.ingredients.deleteIngredient
);

export default router;
