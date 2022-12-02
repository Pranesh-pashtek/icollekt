module.exports = (sequelize, Sequelize) => {
    const Wallets = sequelize.define(
        "wallets",
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
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            payment_method: {
                type: Sequelize.STRING,
                allowNull: false

            },
            payment_details: {
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

    return Wallets;
};