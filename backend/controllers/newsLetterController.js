export const subscribe = async(req,res)=>{

      
        var email = req.body.email.email; 
    
        var data  = {
            members: [{
            email_address : email,
            status       :  'unsubscribed'
            }
            ]
        }
    
    var jsonData= JSON.stringify(data);
    
    const url =  "https://us8.api.mailchimp.com/3.0/lists/a9e03272f8";
    
    const options ={
    
        method: "POST",
    
        auth: "Sai:dcdd5949cd2e0aef69a10204556bd114-us8"
    }
    
      
     const request = https.request( url, options , function(response){
        try{
            response.status(200).json({
                success: true,
                message: "Successfully updated",
                data: updateUser,
    
            });
        }catch (err){
            res.status(500).json({success:false, message:'Failed to Subscribe. Please Try again!!!'})
        }
    
        });
    
        request.setHeader("Content-Type","application/json")
        request.write(jsonData);
        request.end();
    
};