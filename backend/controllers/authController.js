import User from "../models/User.js";
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req,res) => {

    try{

        //hashing password
        const salt =bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);

        console.log(req.body.username);
        console.log(req.body.email);
    

        const newUser = new User(
            {
                username: req.body.username,
                email: req.body.email,
                password: hash,
                photo: req.body.photo
            }
        );
            await newUser.save();

            res.status(200).json({success:true, message:'Successfully created'});


    }
    catch(err){
        res.status(500).json({success:false, message:'Failed to create. Please Try again!!!'})
  ;
}
}


export const login  = async(req,res) => {
    try{

        const email = req.body.email;
        const user = await User.findOne({email})
        console.log("user",user);
        console.log("user",email);
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }

        const checkCorrectPassword = await bcrypt.compare(req.body.password,
            user.password)
            console.log("user",checkCorrectPassword);


            if(!checkCorrectPassword){
                return res.status(401).json({
                    success:false,
                    message:'Incorrect email or password'
                })
            }

            const {password,role,...rest} =user._doc;
            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET_KEY,
                {expiresIn: "15d"}
            );

                //set the token in the browser cookies and send the response to client
                res.cookie("accessToken",token,
                    {
                        httpOnly: true,
                        expires: token.expiresIn
                    }
                ).status(200).json({

                    token,
                    data: {...rest},
                    role
                });

            
    }
    catch(err){
          res.status(500).json({
            success:false,
            message:'Failed to login'
        });
    }
};
