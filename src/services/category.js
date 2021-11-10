import { validationResult } from "express-validator";

async function getAllCategories(req, res) {
  try {
    const allCategories = await req.context.models.category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: ["id"],
    });
    res.send(allCategories);
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function getCategory(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const oneCategory = await req.context.models.category.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: req.context.models.recipe,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            through: {
              attributes: [],
            },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (oneCategory) {
        res.send(oneCategory);
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

async function addCategory(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.category.create(req.body);
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

async function editCategory(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.category.update(req.body, {
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

async function deleteCategory(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.category.destroy({
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
  getAllCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
