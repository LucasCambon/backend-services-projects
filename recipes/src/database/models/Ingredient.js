module.exports = (sequelize, dataTypes) => {
    let alias = 'Ingredient';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
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
    const Ingredient = sequelize.define(alias, cols, config); 

    Ingredient.associate = models => {
        Ingredient.belongsToMany(models.Recipe, { through: models.RecipeIngredient, foreignKey: 'ingredientId', otherKey: 'recipeId' });
    };

    return Ingredient
};