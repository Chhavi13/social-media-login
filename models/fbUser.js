module.exports = (sequelize, Sequelize) => {
    const FbUser = sequelize.define("fbuser", {
        id: {
            type: Sequelize.STRING,
            required: true,
            primaryKey: true
        },
        displayName: {

            type: Sequelize.STRING,
    
        },
        email: {
            type: Sequelize.STRING,
            required:true
        },

        gender: {
            type: Sequelize.STRING,
            required:true
        },



        image:{
            type:Sequelize.STRING
        },


        email:{
            type: Sequelize.STRING,
            required:true
        }
        // },
        // isdeleted:{
        //     type:Sequelize.BOOLEAN,
        //     defaultValue: false

        // },
        // isActive:{
        //     type:Sequelize.BOOLEAN,
        //     defaultValue: false
        // }

    })
    return FbUser;


}