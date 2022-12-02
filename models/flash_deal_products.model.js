module.exports = (sequelize, Sequelize) => {
    const Flash_deal_products = sequelize.define(
        "flash_deal_products",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            flash_deal_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },

            discount: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            discount_type: {
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

    return Flash_deal_products;
};