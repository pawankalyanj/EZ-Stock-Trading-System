export const newsletterController = async(req,res)=>{

        var firstName = req.body.fName;
        var lastName = req.body.lName;
        var email = req.body.emailId; 
    
        var data  = {
            members: [{
            email_address : email,
            status       :  'unsubscribed',
             merge_fields :  {
                    FNAME : firstName,
                    LNAME : lastName
             }
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
    
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    
        console.log(response.statusCode);
        
        });
    
        request.setHeader("Content-Type","application/json")
        request.write(jsonData);
        request.end();
    
};