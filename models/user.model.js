module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "users",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_collection: {
                type: Sequelize.STRING,
                allowNull: true
            },
            user_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true

            },
            password: {
                type: Sequelize.STRING,
                allowNull: true

            },
            name: {
                type: Sequelize.STRING,
                allowNull: false

            },
            date_of_birth: {
                type: Sequelize.STRING,
                allowNull: true
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true
            },
            verification_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            new_email_verificiation_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            provider_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            email_verified_at: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            remember_token: {
                type: Sequelize.STRING,
                allowNull: true
            },
            device_token: {
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
            postal_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            customer_package_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            banned: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            referral_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            remaining_uploads: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            profile_pic: {
                type: Sequelize.STRING,
                allowNull: true
            },
            banner_img: {
                type: Sequelize.STRING,
                allowNull: true
            },

            referred_by: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true
            },
            avatar_original: {
                type: Sequelize.STRING,
                allowNull: true
            },
            userfollower: {
                type: Sequelize.STRING,
                allowNull: true
            },
            userfollowing: {
                type: Sequelize.STRING,
                allowNull: true
            },
            followers: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            following: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM('0', '1'),
                allowNull: true
            },
            hashtags: {
                type: Sequelize.STRING,
                allowNull: true
            },
            delivery_notification: {
                type: Sequelize.STRING,
                allowNull: true
            },
            inbox_notification: {
                type: Sequelize.STRING,
                allowNull: true
            },
            group_notification: {
                type: Sequelize.STRING,
                allowNull: true
            },

            created_at: 'created_at',
            updated_at: 'updated_at'

        },
        { timestamps: false }
    );

    return User;
};