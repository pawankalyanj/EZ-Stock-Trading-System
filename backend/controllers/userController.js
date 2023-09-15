import User from '../models/User.js'

export const updateUser = async(req,res) =>{
    const id = req.params.id
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true});

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updateUser,

        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to Updtae"
        });
    }

}


export const deleteUser = async(req,res) =>{
    const id = req.params.id
    try{
        const deleteUser = await User.findByIdAndDelete(id, {
            
        }, {new:true});

        res.status(200).json({
            success: true,
            message: "Successfully deleted"

        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to delete"
        });
    }
    
}
export const getAllUsers = async(req,res) =>{


    try{
        const getUsers = await User.find({});

        res.status(200).json({
            success: true,
            message: "Successfully retrieved",
            data: getUsers,

        });
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: "not found"
        });
    }
    
}

export const getSingleUser = async(req,res) =>{
    const id = req.params.id
    try{
        const getUser = await User.findById(id, {
            
        }, {new:true});

        res.status(200).json({
            success: true,
            message: "Successfully selected",
            data: getUser,

        });
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: "not found"
        });
    }
}

