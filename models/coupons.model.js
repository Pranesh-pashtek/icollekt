module.exports = (sequelize, Sequelize) => {
    const Coupons = sequelize.define(
        "coupons",
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
            code: {
                type: Sequelize.STRING,
                allowNull: true

            },
            type: {
                type: Sequelize.STRING,
                allowNull: true

            },
            details: {
                type: Sequelize.STRING,
                allowNull: true

            },
            discount: {
                type: Sequelize.DOUBLE,
                allowNull: true

            },
            discount_type: {
                type: Sequelize.STRING,
                allowNull: true

            },
            start_date: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            end_date: {
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

    return Coupons;
};