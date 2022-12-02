module.exports = (sequelize, Sequelize) => {
    const Product_taxes = sequelize.define(
        "product_taxes",
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
            tax_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            tax: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: true

            },
            tax_type: {
                type: Sequelize.STRING,
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

    return Product_taxes;
};