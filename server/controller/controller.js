var Userdb = require('../model/model');

exports.create=(req,res) =>{
    if(!req.body){
        res.status(400).send({ message : "Space cannot be blank!"});
        return;
    }
    // create new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        position: req.body.position,
        status : req.body.status
    })
    
    // save user 
    user
        .save(user)
        .then(data => {
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a save operation"
            });
        });
    
} 
//get a  single user/all users
exports.find=(req,res) =>{

    if(req.query.id){

        const id= req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send[{message:"Cannot find user with id" +id}]
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Cannot find user with id" +id})
        })

    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({message:err.message || "Error occured while getting user information!"})
        })
    }
 }
// Find a single user with an id
exports.findById = (req, res) => {
    const id = req.params.id;
    Userdb.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot find user with id " + id });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving user with id " + id });
        });
};

//update user
exports.update=(req,res) =>{
    if(!req.body){
        return res
        .status(400)
        .send({message: "Updated data cannot be empty"})
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body, {useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot updat euser with ${id}.Maybe user not found."})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error Update user information"})
    })
}

//delete user
exports.delete=(req,res) =>{
    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message: "Cannot delete the user with id ${id}."})
            }else{
                res.send({
                    message:"User was deleted successfully!"
                })
            }
    })
    .catch(err =>{
        res.status(500).send({message:"Could not delete user with id="+id

        });
    });
}