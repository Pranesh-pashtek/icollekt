module.exports = (sequelize, Sequelize) => {
    const Flashdeals = sequelize.define(
        "flash_deals",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false

            },
            start_date: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            end_date: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            featured: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            background_color: {
                type: Sequelize.STRING,
                allowNull: false

            },
            text_color: {
                type: Sequelize.STRING,
                allowNull: false

            },
            banner: {
                type: Sequelize.STRING,
                allowNull: false

            },

            slug: {
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

    return Flashdeals;
};