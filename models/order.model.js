module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define(
        "orders",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            combined_order_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            guest_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            seller_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },

            shipping_address: {
                type: Sequelize.TEXT,
                allowNull: true

            },
            delivery_status: {
                type: Sequelize.INTEGER,
                allowNull: true,
                // set(val) {
                //     this.setDataValue('delivery_status', val.toLowerCase());
                // }

            },
            payment_type: {
                type: Sequelize.STRING,
                allowNull: true

            },
            payment_status: {
                type: Sequelize.STRING,
                allowNull: true

            },
            payment_details: {
                type: Sequelize.INTEGER,
                allowNull: true

            },

            grand_total: {
                type: Sequelize.DOUBLE,
                allowNull: true

            },
            coupon_discount: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            code: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            date: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            viewed: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            delivery_viewed: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            payment_status_viewed: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            commission_calculated: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    // created_at:{
    //     type: Sequelize.DATE,
    //     allowNull:false
    // },
    // updated_at:{
    //     type:Sequelize.DATE,
    //     allowNull:false
    // },
    //     created_at: Sequelize.DATE,
    //     updated_at: Sequelize.DATE,
    // },

    //     { freezeTableName : true },
    //     { timestamps: false },

    //   );

    return Orders;
};