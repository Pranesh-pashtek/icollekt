module.exports = (sequelize, Sequelize) => {
    const Product_Comment = sequelize.define(
        "products_comments",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true

            },

        },

        {
            timestamps: false,
            created_at: 'created_at',
            updated_at: 'updated_at'
        }

    )
    return Product_Comment;
}