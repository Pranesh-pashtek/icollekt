module.exports = (sequelize, Sequelize) => {
    const ProductStock = sequelize.define(
        "product_stocks",
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
            sku: {
                type: Sequelize.STRING,
                allowNull: true

            },
            price: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: true

            },
            qty: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            created_at:{
                type: Sequelize.DATE
            },
            updated_at:{
                type: Sequelize.DATE
            }
        },
        { timestamps: false }
    );

    return ProductStock;
};