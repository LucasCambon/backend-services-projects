module.exports = (sequelize, dataTypes) => {
    let alias = 'Instruction';
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
        tableName: "instructions",
        timestamps: true,
        paranoid: true,
        deletedAt: 'deletedAt',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
    const Instruction = sequelize.define(alias, cols, config); 

    Instruction.associate = models => {
        Instruction.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
    };

    return Instruction
};