module.exports = (sequelize, Sequelize) => {
    const Attribute_translations = sequelize.define(
        "attribute_translations",
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

            name: {
                type: Sequelize.STRING,
                allowNull: false

            },
            lang: {
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

    return Attribute_translations;
};