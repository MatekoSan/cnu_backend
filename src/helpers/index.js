import sequelize from "../models";

export async function populateDB() {
  await sequelize.models.ingredient.bulkCreate([
    {
      title: "salt",
      unit: "g",
    },
    {
      title: "black_pepper",
      unit: "g",
    },
    {
      title: "water",
      unit: "ml",
    },
    {
      title: "beef_meat",
      unit: "g",
    },
    {
      title: "flour",
      unit: "g",
    },
    {
      title: "oil",
      unit: "ml",
    },
    {
      title: "potatoes",
      unit: "g",
    },
    {
      title: "onion",
      unit: "pcs",
    },
    {
      title: "garlic",
      unit: "pcs",
    },
    {
      title: "carrot",
      unit: "pcs",
    },
    {
      title: "egg",
      unit: "pcs",
    },
    {
      title: "sugar",
      unit: "g",
    },
    {
      title: "milk",
      unit: "ml",
    },
    {
      title: "butter",
      unit: "g",
    },
    {
      title: "baking_powder",
      unit: "g",
    },
    {
      title: "tomato",
      unit: "g",
    },
    {
      title: "spaghetti",
      unit: "g",
    },
    {
      title: "basil",
      unit: "g",
    },
    {
      title: "oregano",
      unit: "g",
    },
    {
      title: "parmesan_cheese",
      unit: "g",
    },
  ]);

  await sequelize.models.recipe.bulkCreate([
    {
      title: "beef_stew",
      text: "In a large pot coated with oil, cook 2 onions until light brown. Add beef and cook until seared on all sides, 10 minutes, working in batches. Season with salt and pepper. Bring to a boil then reduce heat to a simmer for about 30 to 45 minutes. Add potatoes and simmer until cooked. Bon apetite!",
      rating: 4,
    },
    {
      title: "pancakes",
      text: "In a medium bowl, whisk together milk, oil and eggs. Add flour to milk mixture and whisk. Heat a skillet over medium and put a drop of oil. For each pancake, spoon 2 to 3 tablespoons of batter onto skillet and spread batter into a round. Cook until surface of pancakes have some bubbles, 1 to 2 minutes. Flip carefully and cook until browned on the underside. Voila!",
      rating: 3,
    },
    {
      title: "scrambled_eggs",
      text: "Whisk 2  eggs, 20 ml of milk and a pinch of salt together until the mixture has just one consistency. Heat a small non-stick frying pan, then add a 25 g of butter and let it melt. Pour in the egg mixture and let it sit, without stirring, for 20 seconds. Stir it over from the bottom of the pan. Let it sit for another 10 seconds then stir and fold again. Repeat until the eggs are softly set and slightly runny in places. Enjoy!",
      rating: 5,
    },
    {
      title: "waffles",
      text: "In a large bowl, mix together 100 grams of flour, pinch of salt, 10 g of baking powder and 50 g of sugar; set aside. Preheat waffle iron to desired temperature. In a separate bowl, beat 3 eggs. Stir in 150 ml of milk and 30 grams of butter. Pour the milk mixture into the flour mixture; beat until blended. Ladle the batter into a preheated skillet. Cook the waffles until golden and crisp. Yummy!",
      rating: 2,
    },
    {
      title: "spaghetti_with_tomato_sauce",
      text: "In a large pan, heat the oil over medium heat. Add the onion and sauté for 5 minutes until soft. Add the garlic and sauté for 2 more minutes. Add the tomatoes, salt and pepper, oregano, basil.  Bring to a simmer, lower the heat to medium-low, and simmer gently for about 20 minutes. Taste and adjust the seasonings as needed. Meanwhile, bring a large pot of water to a boil over high heat, add a couple tablespoons of salt. Cook the pasta. Drain the pasta and pour about half the sauce over, stirring to combine. Season each portion with shredded parmesan and fresh basil",
      rating: 1,
    },
  ]);

  await sequelize.models.recipeIngredients.bulkCreate([
    // Recipe #1
    {
      recipeId: 1,
      ingredientId: 1,
    },
    {
      recipeId: 1,
      ingredientId: 2,
    },
    {
      recipeId: 1,
      ingredientId: 3,
    },
    {
      recipeId: 1,
      ingredientId: 4,
    },
    {
      recipeId: 1,
      ingredientId: 6,
    },
    {
      recipeId: 1,
      ingredientId: 7,
    },
    {
      recipeId: 1,
      ingredientId: 8,
    },
    // Recipe #2
    {
      recipeId: 2,
      ingredientId: 5,
    },
    {
      recipeId: 2,
      ingredientId: 6,
    },
    {
      recipeId: 2,
      ingredientId: 11,
    },
    {
      recipeId: 2,
      ingredientId: 12,
    },
    {
      recipeId: 2,
      ingredientId: 13,
    },
    // Recipe #3
    {
      recipeId: 3,
      ingredientId: 1,
    },
    {
      recipeId: 3,
      ingredientId: 11,
    },
    {
      recipeId: 3,
      ingredientId: 13,
    },
    {
      recipeId: 3,
      ingredientId: 14,
    },
    // Recipe #4
    {
      recipeId: 4,
      ingredientId: 1,
    },
    {
      recipeId: 4,
      ingredientId: 5,
    },
    {
      recipeId: 4,
      ingredientId: 11,
    },
    {
      recipeId: 4,
      ingredientId: 12,
    },
    {
      recipeId: 4,
      ingredientId: 13,
    },
    {
      recipeId: 4,
      ingredientId: 14,
    },
    {
      recipeId: 4,
      ingredientId: 15,
    },
    // Recipe #5
    {
      recipeId: 5,
      ingredientId: 1,
    },
    {
      recipeId: 5,
      ingredientId: 2,
    },
    {
      recipeId: 5,
      ingredientId: 3,
    },
    {
      recipeId: 5,
      ingredientId: 6,
    },
    {
      recipeId: 5,
      ingredientId: 8,
    },
    {
      recipeId: 5,
      ingredientId: 9,
    },
    {
      recipeId: 5,
      ingredientId: 16,
    },
    {
      recipeId: 5,
      ingredientId: 17,
    },
    {
      recipeId: 5,
      ingredientId: 18,
    },
    {
      recipeId: 5,
      ingredientId: 19,
    },
    {
      recipeId: 5,
      ingredientId: 20,
    },
  ]);

  await sequelize.models.category.bulkCreate([
    {
      title: "stews",
    },
    {
      title: "meat_meals",
    },
    {
      title: "desserts",
    },
    {
      title: "breakfasts",
    },
    {
      title: "pasta_meals",
    },
  ]);

  await sequelize.models.categoryRecipes.bulkCreate([
    {
      categoryId: 1,
      recipeId: 1,
    },
    {
      categoryId: 2,
      recipeId: 1,
    },
    {
      categoryId: 3,
      recipeId: 2,
    },
    {
      categoryId: 4,
      recipeId: 3,
    },
    {
      categoryId: 4,
      recipeId: 4,
    },
    {
      categoryId: 5,
      recipeId: 5,
    },
  ]);
}
