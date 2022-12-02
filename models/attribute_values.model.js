module.exports = (sequelize, Sequelize) => {
    const Attribute_values = sequelize.define(
        "attribute_values",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            attribute_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },

            value: {
                type: Sequelize.STRING,
                allowNull: false

            },
            color_code: {
                type: Sequelize.STRING,
                allowNull: false

            },

        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Attribute_values;
};