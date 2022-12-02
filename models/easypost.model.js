module.exports = (sequelize, Sequelize) => {
    const Easyport = sequelize.define(
        "easyports",
        {

            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            from_addrerss_id: {
                type: Sequelize.STRING,
                allowNull: true
            },

            to_address_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            parcel_id: {
                type: Sequelize.STRING,
                allowNull: true
            },

            // rate_id: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },

            // postage_label_id: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },

            // label_url: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            tracking_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            // tracker_id: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            // label_fee: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            // postage_fee: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            // insurance_fee: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            product_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            // user_name: {
            //     type: Sequelize.STRING,
            //     allowNull: true
            // },
            created_at: {
                type: Sequelize.STRING,
                allowNull: true
            },
            updated_at: {
                type: Sequelize.STRING,
                allowNull: true
            },
            shipping_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            seller_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            payment_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            amount: {
                type: Sequelize.STRING,
                allowNull: true
            },
        },
        { timestamps: false }
    );

    return Easyport;
};