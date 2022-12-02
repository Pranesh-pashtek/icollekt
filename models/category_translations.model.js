module.exports = (sequelize, Sequelize) => {
    const Category_translations = sequelize.define(
        "category_translations",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
           
            category_id: {
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

    return Category_translations;
};