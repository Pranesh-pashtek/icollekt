module.exports = (sequelize, Sequelize) => {
    const Home_pages = sequelize.define(
        "home_pages",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            // user_id: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            title: {
                type: Sequelize.STRING,
                allowNull: true
            },
            hastag: {
                type: Sequelize.STRING,
                allowNull: true
            },
            discription: {
                type: Sequelize.STRING,
                allowNull: true
            },
            price: {
                type: Sequelize.STRING,
                allowNull: false
            },
            images: {
                type: Sequelize.JSON,
                allowNull: true
            },
            sharecount: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created_at: Sequelize.DATE,
            update_at: Sequelize.DATE,
        },

        { timestamps: false }
    );

    return Home_pages;
};