module.exports = (sequelize, Sequelize) => {
    const Carts = sequelize.define(
        "carts",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            address_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            cart_status: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            owner_id: {
                type: Sequelize.INTEGER,
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
            quantity: {
                type: Sequelize.DATE,
                allowNull: true
            },
            price: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: true
            },
            variation: {
                type: Sequelize.STRING,
                allowNull: true
            },
            tax: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: true
            },
            shipping_cost: {
                type: Sequelize.DOUBLE(20, 2),
                allowNull: true
            },
            shipping_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            discount: {
                type: Sequelize.DOUBLE(10, 2),
                allowNull: true,
                defaultValues: 0.00
            },
            product_referral_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            coupon_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            coupon_applied: {
                type: Sequelize.STRING,
                allowNull: true
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true
            } 
        },
        { timestamps: false }
    );

    return Carts;
};