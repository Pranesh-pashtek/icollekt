module.exports = (sequelize, Sequelize) => {
    const Brand_translations = sequelize.define(
        "brand_translations",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            brand_id: {
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

    return Brand_translations;
};