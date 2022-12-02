module.exports = (sequelize, Sequelize) => {
    const Slots = sequelize.define(
        "slots",
        {
            id: {
                type: Sequelize.INTEGER,
                 primaryKey: true,
                // autoIncrement: true,
                allowNull: false
            },
           
            name: {
                type: Sequelize.STRING,
                allowNull: false

            },
           
           
            description: {
                type: Sequelize.STRING,
                allowNull: false

            },
            type: {
                type: Sequelize.STRING,
                allowNull: false

            },
            start_time: {
                type: Sequelize.TIME,
                allowNull: false

            },
            end_time: {
                type: Sequelize.TIME,
                allowNull: false

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false

            },

        },


        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Slots;
};