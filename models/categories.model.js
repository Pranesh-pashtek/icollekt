module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define(
        "categories",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            parent_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            level: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            name: {
                type: Sequelize.STRING,
                allowNull: false

            },
            order_level: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            commision_rate: {
                type: Sequelize.INTEGER,
                allowNull: false

            },

            banner: {
                type: Sequelize.STRING,
                allowNull: false

            },
            icon: {
                type: Sequelize.STRING,
                allowNull: false

            },
            featured: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            top: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            digital: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false

            },
            meta_title: {
                type: Sequelize.STRING,
                allowNull: false

            },
            meta_description: {
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

    return Categories;
};