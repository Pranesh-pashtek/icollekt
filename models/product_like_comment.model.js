module.exports = (sequelize, Sequelize) => {
    const Product_like_comments = sequelize.define(
        "products_like_comments",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            comment_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            likecount: {
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

    return Product_like_comments;
};