module.exports = (sequelize, Sequelize) => {
    const Followers = sequelize.define(
        "followers",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            from_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            to_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            // // Timestamps
            // created_at: Sequelize.DATE,
            // updated_at: Sequelize.DATE,
        },

        // { timestamps: false }
    );

    return Followers;
};