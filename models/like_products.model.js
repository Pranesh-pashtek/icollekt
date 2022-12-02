module.exports = (sequelize, Sequelize) => {
    const Like_products = sequelize.define(
        "like_products",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },

            status: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            likes: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Like_products;
};