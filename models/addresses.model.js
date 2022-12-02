module.exports = (sequelize, Sequelize) => {
    const Addresses = sequelize.define(
        "addresses",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            country: {
                type: Sequelize.STRING,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true
            },
            longitude: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            latitude: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            postal_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true
            },
            set_default: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true
            },
            address_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            // Timestamps
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        },

        { timestamps: false }
    );

    return Addresses;
};