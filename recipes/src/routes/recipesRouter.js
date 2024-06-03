const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const authMiddleware = require('../middlewares/authMiddleware');
const { taskValidationRules } = require('../middlewares/validationRules');
const validate = require('../middlewares/dynamicValidation');

router.use(authMiddleware);

router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipeById);
router.post('/create', validate(taskValidationRules.createTask), recipesController.createRecipe);
router.put('/edit/:id', validate(taskValidationRules.updateTask), recipesController.updateRecipe);
router.delete('/delete/:id', recipesController.deleteRecipe);

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *       401:
 *         description: Access denied. No token provided or Invalid token.
 *       404:
 *         description: No recipes found
 *       500:
 *         description: Error retrieving recipes
 */

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Successfully retrieved recipe
 *       401:
 *         description: Access denied. No token provided or Invalid token.
 *       404:
 *         description: Recipe not found or not authorized
 *       500:
 *         description: Error retrieving recipe
 */

/**
 * @swagger
 * /api/recipes/create:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - ingredients
 *               - instructions
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       401:
 *         description: Access denied. No token provided or Invalid token.
 *       500:
 *         description: Error creating recipe
 */

/**
 * @swagger
 * /api/recipes/edit/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       401:
 *         description: Access denied. No token provided or Invalid token.
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Error updating recipe
 */

/**
 * @swagger
 * /api/recipes/delete/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Access denied. No token provided or Invalid token.
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Error deleting recipe
 */

module.exports = router;