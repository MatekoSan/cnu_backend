import { validationResult } from "express-validator";

async function getAllIngredients(req, res) {
  try {
    const allIngredients = await req.context.models.ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send(allIngredients);
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function getIngredient(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const oneIngredient = await req.context.models.ingredient.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (oneIngredient) {
        res.send(oneIngredient);
      } else {
        res.sendStatus(404);
      }
    } else {
      req.log.info(`Validation error value: ${req.params.id}`);
      res.status(400);
      res.send("Validation error");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function addIngredient(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.ingredient.create(req.body);
      res.sendStatus(200);
    } else {
      req.log.info(`Validation error value: ${result}`);
      res.status(400);
      res.send("Validation error");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function editIngredient(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.ingredient.update(req.body, {
        where: { id: req.params.id },
      });
      res.sendStatus(200);
    } else {
      req.log.info(`Validation error value: ${result}`);
      res.status(400);
      res.send("Validation error");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function deleteIngredient(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.ingredient.destroy({
        where: { id: req.params.id },
      });
      res.sendStatus(200);
    } else {
      req.log.info(`Validation error value: ${result}`);
      res.status(400);
      res.send("Validation error");
    }
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

export default {
  getAllIngredients,
  getIngredient,
  addIngredient,
  editIngredient,
  deleteIngredient,
};
