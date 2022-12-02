module.exports = (sequelize, Sequelize) => {
    const Order_details = sequelize.define(
        "order_details",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            seller_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            variation: {
                type: Sequelize.TEXT,
                allowNull: true

            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: true

            },
            tax: {
                type: Sequelize.DOUBLE,
                allowNull: false

            },
            shipping_cost: {
                type: Sequelize.DOUBLE,
                allowNull: false

            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            payment_status: {
                type: Sequelize.STRING,
                allowNull: false

            },
            delivery_status: {
                type: Sequelize.STRING,
                allowNull: true

            },
            shipping_type: {
                type: Sequelize.STRING,
                allowNull: true

            },
            pickup_point_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            product_referral_code: {
                type: Sequelize.STRING,
                allowNull: true

            },

        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Order_details;
};