const AWS = require("aws-sdk")

const decryptLink = async (options)=>{
    const url = options.url
    const awsAccessKey = options.awsAccessKey
	const awsSecretKey = options.awsSecretKey
	const pdfKey = options.pdfKey

    const urlParts = url.split('.com/');
    AWS.config.update({ region: "us-east-1" }); // don't change this US-East-01

    const s3 = new AWS.S3({
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey
    });

    
    const ssecKey = Buffer.alloc(32, pdfKey,'base64') // you can get the key from Taxbandits API Console
 
    var params = {
        Key: urlParts[1], // File path without main domain URL.
        Bucket: "expressirsforms", // Get the Bucket Name from the URL given in the response
        SSECustomerAlgorithm: "AES256",
        SSECustomerKey: ssecKey,
    }
   
    // let output = {}
    return new Promise(async (resolve, reject) => {
        try{
            await s3.getObject(params,(err, data) => {
                // Handle any error and exit
                if (err)
                {
                    // console.log("Err");
                    return resolve({
                        blobData:null,
                        err,
                        status : "error",
                        message : "Please ensure the provided details are valid"
                    }) 
                }
                else
                {
                    // console.log("Success");
                    const bufferData = data.Body
                    return resolve({
                        bufferData,
                        err:null,
                        status : "success",
                        message : "Successfully decrypted the link"
                    }) 
                }
        
            });
        }
        catch(err)
        {
            return reject({
                blobData:null,
                err:"Promise reject",
                status : "error",
                message : "Please ensure the provided details are valid"
            })
        }
    })
    
    // s3Data.then(result=>{
    //     console.log(result);
    // })

}

module.exports = decryptLink