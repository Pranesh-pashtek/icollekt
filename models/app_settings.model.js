module.exports = (sequelize, Sequelize) => {
    const App_settings = sequelize.define(
        "app_settings",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false        
           },
             logo: {
                    type: Sequelize.STRING,
                    allowNull: false        
                },
             currency_id: {
                type: Sequelize.INTEGER,
                allowNull: false        
            },
            currency_format: {
                type: Sequelize.CHAR,
                allowNull: false        
            },
            facebook: {
                type: Sequelize.STRING,
                allowNull: false        
            },
            twitter: {
                type: Sequelize.STRING,
                allowNull: false        
            },  
            instagram: {
                type: Sequelize.STRING,
                allowNull: false        
            },
            youtube: {
                type: Sequelize.STRING,
                allowNull: false        
            },
            google_plus: {
                type: Sequelize.STRING,
                allowNull: false        
            },
           // Timestamps
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
            },        
       // {freezeTableName: true},
        { timestamps: false },
        
    );
  
    return App_settings;
  };