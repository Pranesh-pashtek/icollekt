module.exports = (sequelize, Sequelize) => {
    const Totalproductbranch = sequelize.define(
        "totalproductbranch",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            branch_id: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
            branch_name: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
           product_name: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
           // join_banner: {
             //   type: Sequelize.STRING,
               // allowNull : false
            //},
                     
        },
        { timestamps: false }
    );
  
    return Totalproductbranch;
  };