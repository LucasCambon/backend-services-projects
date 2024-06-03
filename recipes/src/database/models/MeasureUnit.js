module.exports = (sequelize, dataTypes) => {
    let alias = 'MeasureUnit';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        step_number: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        instruction: {
            type: dataTypes.TEXT,
            allowNull: false
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
        tableName: "measure_units",
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedAt',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
    const MeasureUnit = sequelize.define(alias, cols, config); 

    MeasureUnit.associate = models => {
        MeasureUnit.hasMany(models.RecipeIngredient, { foreignKey: 'measureUnitId' });
    };

    return MeasureUnit
};