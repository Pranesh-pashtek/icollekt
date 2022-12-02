module.exports = (sequelize, Sequelize) => {
    const Search = sequelize.define(
        "searches",
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
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            account_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        },

        { timestamps: false }
    );
    return Search;
};