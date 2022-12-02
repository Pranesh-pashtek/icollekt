module.exports = (sequelize, Sequelize) => {
    const Coins = sequelize.define(
        "user_posts",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image_upload: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            hashtags: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            title: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            max_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            min_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        { timestamps: false }
    );

    return Coins;
};
