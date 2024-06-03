module.exports = (sequelize, dataTypes) => {
    let alias = 'Recipe';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        deletedAt: {
            type: dataTypes.DATE
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: "recipes",
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedAt',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
    const Recipe = sequelize.define(alias, cols, config); 

    Recipe.associate = function(models) {
        Recipe.belongsTo(models.User, { foreignKey: "userId" })
        Recipe.belongsToMany(models.Ingredient, { through: models.RecipeIngredient, foreignKey: 'recipeId', otherKey: 'ingredientId' });
        Recipe.hasMany(models.Instruction, { foreignKey: 'recipeId' });
    }

    return Recipe
};