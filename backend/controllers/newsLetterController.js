import https from 'https'

export const subscribe = async(req,res)=>{

  
    var firstName = req.body.details.firstName;
    var lastName = req.body.details.lastName;
    var email = req.body.details.email; 

    var data  = {
        members: [{
        email_address : email,
        status       :  'subscribed',
        merge_fields :  {
                 FNAME : firstName,
                 LNAME : lastName
          }
        }
        ]
    }
    var jsonData= JSON.stringify(data);
    
    const url =  "https://us17.api.mailchimp.com/3.0/lists/a236c9153b";
    
    const options ={
    
        method: "POST",
        headers: {
            Authorization: "auth 2bf04733bf2ae5a8a351be45d87ff082-us17"
        }
        
    }
    
      
    const request = https.request(url, options, function (response) {
        let responseData = '';

        response.on('data', (chunk) => {
            responseData += chunk;
        });

        response.on('end', () => {
            try {
                const updateUser = JSON.parse(responseData);
                console.log("update usrt",updateUser);
                if (response.statusCode === 200) {
                    res.status(200).json({
                        success: true,
                        message: "Successfully subscribed",
                        data: updateUser,
                    });
                } else {
                    res.status(response.statusCode).json({
                        success: false,
                        message: "Failed to subscribe. Please try again.",
                    });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: 'Failed to Subscribe. Please Try again!!!',
                });
            }
        });
    });

    request.setHeader("Content-Type", "application/json");

    // Error handling for the request
    request.on('error', (err) => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Failed to Subscribe. Please Try again!!!',
        });
    });

    request.write(jsonData);
    request.end();
    
};