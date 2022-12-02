
module.exports = (sequelize, Sequelize) => {
    const Help = sequelize.define(
        "helps",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            help_questions: {
                type: Sequelize.STRING,
                allowNull: false

            },
            messages: {
                type: Sequelize.STRING,
                allowNull: false
            },
            from_mail: {
                type: Sequelize.STRING,
                allowNull: true
            },
            to_mail: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: 'created_at',
            updatedAt: 'updated_at'

        },
        { timestamps: false }
    );

    return Help;
};