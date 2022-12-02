module.exports = (sequelize, Sequelize) => {
    const Productswishlist = sequelize.define(
        "wishlists",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },

            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Productswishlist;
};