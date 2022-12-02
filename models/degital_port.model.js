module.exports = (sequelize, Sequelize) => {
    const Digital_post = sequelize.define(
        "digital_ports",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            message: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
        },

        { timestamps: false }
    );

    return Digital_post;
};