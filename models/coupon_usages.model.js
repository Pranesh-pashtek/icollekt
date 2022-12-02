module.exports = (sequelize, Sequelize) => {
    const Coupon_usages = sequelize.define(
        "coupon_usages",
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
            coupon_id: {
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

    return Coupon_usages;
};