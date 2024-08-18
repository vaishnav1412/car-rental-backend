const Connection = require('../models/connectionModel')
const Message = require('../models/messageModels')

 
const submitMessage = async(req,res)=>{
    try {
        
            const userId = req.body.userId
            const adminId = req.body.adminId
            const message = req.body.message

            const connection = await Connection.findOne({userId:userId})

            if(!connection){
                const connect = new ConnectionStates({
                    userId : userId,
                    adminId:adminId,
                    lastMessage:message
                })
                connection = await  connect.save()
            }
            const submitMessage = new Message ({
                fromId : userId,
                toId:adminId,
                connectionId:connection._id,
                message:message
            })
            submitMessage.save()

            res.status(200)
            .send({ success:true , connection, submitMessage,userId,adminId })
    } catch (error) {
        console.log(error);
    }
}


const getAllmessage = async(req,res)=>{
    try {
        
           const userId = req.body.userId
           const AdminId = req.body.adminId

           const connection = await Connection.findOne({userId : userId , adminId:AdminId })
           const message = await Message.findOne({connectionId:connection._id})
            res.status(200).send({
                message,
                userId ,
                adminId
            })
    } catch (error) {
        console.log(error);
    }
}

const adminSubmit = async(req,res) => {

    try {
        
        const userId = req.body.userId
        const adminId = req.body.adminId
        const message = req.body.message

        const connections = await Connection.findOne({userId:userId,adminId:adminId})

            if(!connections){
                const connect = new ConnectionStates({
                    userId : userId,
                    adminId:adminId,
                    lastMessage:message
                })
                connections = await  connect.save()
            }
            const submitMessage = new Message ({
                fromId : userId,
                toId:adminId,
                connectionId:connections._id,
                message:message
            })
            submitMessage.save()

            res.status(200)
            .send({ success:true , connections, submitMessage,userId,adminId })


    } catch (error) {
        console.log(error);
    }

}

    exports.module ({
        adminSubmit,
        getAllmessage,
        submitMessage
    })