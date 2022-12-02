module.exports = (sequelize, Sequelize) => {
    const Paypal = sequelize.define(
        "paypals",
        {

            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            seller_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            product_id: {
                type: Sequelize.STRING,
                allowNull: true
            },

            payment_id: {
                type: Sequelize.STRING,
                allowNull: true
            },

            payerId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            payment_methord: {
                type: Sequelize.STRING,
                allowNull: true
            },

            amount: {
                type: Sequelize.STRING,
                allowNull: true
            },

            // product_name: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },

            created_time: {
                type: Sequelize.STRING,
                allowNull: true
            },

        },
        { timestamps: false }
    );

    return Paypal;
};