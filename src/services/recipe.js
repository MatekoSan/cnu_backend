import { validationResult } from "express-validator";

async function getAllRecipes(req, res) {
  try {
    const allRecipes = await req.context.models.recipe.findAll({
      include: [
        {
          model: req.context.models.ingredient,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: {
            attributes: [],
          },
        },
        {
          model: req.context.models.category,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: {
            attributes: [],
          },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.send(allRecipes);
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
}

async function getRecipe(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const oneRecipe = await req.context.models.recipe.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: req.context.models.ingredient,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            through: {
              attributes: [],
            },
          },
          {
            model: req.context.models.category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
            through: {
              attributes: [],
            },
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (oneRecipe) {
        res.send(oneRecipe);
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

async function addRecipe(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const newRecipe = await req.context.models.recipe.create(req.body);

      const ingredients =
        req.body.ingredients && req.body.ingredients.length > 0
          ? req.body.ingredients
          : [];
      const categories =
        req.body.categories && req.body.categories.length > 0
          ? req.body.categories
          : [];

      for (let ingredientId of ingredients) {
        await req.context.models.recipeIngredients.create({
          recipeId: newRecipe.id,
          ingredientId: ingredientId,
        });
      }
      for (let categoryId of categories) {
        await req.context.models.categoryRecipes.create({
          recipeId: newRecipe.id,
          categoryId: categoryId,
        });
      }

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

async function editRecipe(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.recipe.update(req.body, {
        where: { id: req.params.id },
      });

      await req.context.models.recipeIngredients.destroy({
        where: { recipeId: req.params.id },
      });

      await req.context.models.categoryRecipes.destroy({
        where: { recipeId: req.params.id },
      });

      const ingredients =
        req.body.ingredients && req.body.ingredients.length > 0
          ? req.body.ingredients
          : [];
      const categories =
        req.body.categories && req.body.categories.length > 0
          ? req.body.categories
          : [];

      for (let ingredientId of ingredients) {
        await req.context.models.recipeIngredients.create({
          recipeId: req.params.id,
          ingredientId: ingredientId,
        });
      }
      for (let categoryId of categories) {
        await req.context.models.categoryRecipes.create({
          recipeId: req.params.id,
          categoryId: categoryId,
        });
      }

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

async function deleteRecipe(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.recipe.destroy({
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

async function getRating(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const oneRating = await req.context.models.recipe.findOne({
        attributes: ["id", "title", "rating"],
        where: [{ id: req.params.id }],
      });

      if (oneRating) {
        res.send(oneRating);
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

async function editRating(req, res) {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      await req.context.models.recipe.update(
        { rating: req.body.rating },
        {
          where: { id: req.params.id },
        }
      );
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
  getAllRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRating,
  editRating,
};
