const db = require('../database/models');

const recipeController = {
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await db.Recipe.findAll({ where: { userId: req.user.id } });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipes.' });
    }
  },

  getRecipeById: async (req, res) => {
    try {
      const recipe = await db.Recipe.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!recipe) return res.status(404).json({ message: 'Recipe not found.' });
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recipe.' });
    }
  },

  createRecipe: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const { title, description, ingredients, instructions } = req.body;
      const recipe = await db.Recipe.create({ title, description, ingredients, instructions, userId: req.user.id }, { transaction: t });

      await t.commit();
      res.status(201).json(recipe);
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: 'Error creating recipe.' });
    }
  },

  updateRecipe: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const { title, description, ingredients, instructions } = req.body;
      const recipe = await db.Recipe.findOne({ where: { id: req.params.id, userId: req.user.id }, transaction: t });
      if (!recipe) {
        await t.rollback();
        return res.status(404).json({ message: 'Recipe not found.' });
      }

      await recipe.update({ title, description, ingredients, instructions }, { transaction: t });
      await t.commit();
      res.status(200).json(recipe);
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: 'Error updating recipe.' });
    }
  },

  deleteRecipe: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const recipe = await db.Recipe.findOne({ where: { id: req.params.id, userId: req.user.id }, transaction: t });
      if (!recipe) {
        await t.rollback();
        return res.status(404).json({ message: 'Recipe not found.' });
      }

      await recipe.destroy({ transaction: t });
      await t.commit();
      res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (error) {
      await t.rollback();
      res.status(500).json({ message: 'Error deleting recipe.' });
    }
  },
};

module.exports = recipeController;

