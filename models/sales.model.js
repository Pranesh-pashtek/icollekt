module.exports = (sequelize, Sequelize) => {
    const Sales = sequelize.define(
        "sales",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            min_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            comments: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

        },

        { timestamps: false }
    );

    return Sales;
};