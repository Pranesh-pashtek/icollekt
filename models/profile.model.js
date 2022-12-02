module.exports = (sequelize, Sequelize) => {
    const Profiles = sequelize.define(
        "users",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true

            },
            device_token: {
                type: Sequelize.STRING,
                allowNull: true
            },
            profile_pic: {
                type: Sequelize.JSON,
                allowNull:true
            },  
            banner_img: {
                type: Sequelize.JSON,
                allowNull: true
            },           
            status:{
                type: Sequelize.INTEGER,
                allowNull: true
            },
            user_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            // aboutme:{
            //     type: Sequelize.STRING,
            //     allowNull: true
            // }
           
           
        },
        { timestamps: false }
    );

    return Profiles;
};