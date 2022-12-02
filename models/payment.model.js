module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define(
        "payments",
        {

            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            seller_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            amount: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            // final_price: {
            //     type: Sequelize.DOUBLE(20, 2),
            //     allowNull: true
            // },
            payment_details: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            payment_method: {
                type: Sequelize.STRING,
                allowNull: true
            },
            txn_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

        },
        { timestamps: false }
    );

    return Payment;
};