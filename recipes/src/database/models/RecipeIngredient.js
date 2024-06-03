module.exports = (sequelize, dataTypes) => {
    let alias = 'RecipeIngredient';
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
        tableName: "recipes_ingredients",
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedAt',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
    const RecipeIngredient = sequelize.define(alias, cols, config); 

    RecipeIngredient.associate = models => {
        RecipeIngredient.belongsTo(models.MeasureUnit, { foreignKey: 'measureUnitId' });
    };

    return RecipeIngredient
};