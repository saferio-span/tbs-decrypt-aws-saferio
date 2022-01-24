# TBS Decrypt Aws pdf Url - Test

This is a sample based on Node Js, express, aws-sdk and axios to show how to decrypt the pdf url produced by TaxBandits . This sample includes a function `decryptLink`

## Configuration

You need to signup with TaxBandits Sandbox Developer Console at https://sandbox.taxbandits.com to get the keys to pass them in the function. See below for more directions:

> Using this function we can get the auth token for taxbandits api

### To get the sandbox keys:


- Go to Sandbox Developer console: https://sandbox.taxbandits.com.
- Signup or signin to Sandbox
- Navigate to Settings and then to API Credentials. Copy pdf key

### The sandbox urls: (Please make sure to use the right versions)

- Sandbox Application URL: https://testapp.taxbandits.com


### The function `decryptLink` consist of 1 parameter which is an object
```
{
    url:"Your pdf url",
    awsAccessKey:"Your Aws access key",
    awsSecretKey:"Your Aws secret key",
    pdfKey:"Your Pdf key"
}
```

On successful execution we will be getting an object with status, message and accessToken

```
{
    bufferData:"Example Data",
    err:null,
    status : "success",
    message : "Successfully decrypted the link"
}
```

> Usage

Let `details` be the object derived on successful execution, We can utilize it by sending it in the header of api call

```

res.status(200).send(details.bufferData)

```
> Node Js usage code

```

const express = require('express');
const router = express.Router();
const decryptLink = require("tbs-decrypt-aws-link-saferio-demo")

router.post('/getPdf', async (req, res) => {

    const cred = {
        url: req.url,
    	awsAccessKey: req.accesskey,
        awsSecretKey: req.secretkey,
        pdfKey: req.pdfKey
    }
    const data = await decryptLink(cred)
    res.status(200).send(data.bufferData);

});

```
> React Js usage code

```

const handlePdfDecryption = async ()=>{

    const res = await axios(`/getPdf`,{
                method: 'post',
                responseType: 'blob',
                data:{
                    url:"Your pdf url",
                    awsAccessKey:"Your Aws access key",
                    awsSecretKey:"Your Aws secret key",
                    pdfKey:"Your Pdf key"
                },
            })

    const pdfData = await res.data
    const file = new Blob(
        [pdfData], 
        {type: 'application/pdf'})
    const fileURL = URL.createObjectURL(file)
    window.open(fileURL,"_blank")

}

```


