const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/authController');

router.use('/authenticate', authenticate);

module.exports = router;

router.use('/authenticate',async(req,res,next)=>{
    try{
       const {signature}=req.body;
       const {accountAddress}=req.query

       if(!signature){
         return res.status(401).json({message:'Authentication failed!'})
       }
       const recoveredAddress = ethers.utils.verifyMessage("Authentication message",signature)
       if(accountAddress.toLowerCase()===recoveredAddress.toLowerCase()){
        let user = await UserModel.findOne({ userId: recoveredAddress });
        if (!user) {
            user = await UserModel.create({
                userId: recoveredAddress,
            });
        }
        const token  = jwt.sign({
            accountAddress
        },'secretKey')

        res.status(200).json({message:"Auhtentication Successful!",token:token})
       }else{
        res.status(404).json({authenticated:false,message:'Authenticaton Failed!'})
       }
    }catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
})
