
module.exports = (sequelize, Sequelize) => {
    const Reports = sequelize.define(
        "reports",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            reason_for_report: {
                type: Sequelize.STRING,
                allowNull: false

            },
            description: {
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

    return Reports;
};