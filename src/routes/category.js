import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.get("/", services.categories.getAllCategories);

router.get(
  "/:id",
  param("id").isInt({ min: 1, max: 50 }),
  services.categories.getCategory
);

router.post(
  "/",
  body("title").isLength({ min: 3, max: 30 }),
  services.categories.addCategory
);

router.put(
  "/:id",
  body("title").isLength({ min: 3, max: 30 }),
  services.categories.editCategory
);

router.delete(
  "/:id",
  param("id").isInt({ min: 1, max: 50 }),
  services.categories.deleteCategory
);

export default router;
