const loginUsers = require('../modals/userlogin schema');
const otp_Verification=require('../modals/otp schema')
const router=require('express').Router();
const bcrypt= require('bcrypt')
const nodemailer =require('nodemailer')
const jwt=require('jsonwebtoken')
const Joi = require('@hapi/joi')





router.route('/').get((req,res)=>{
    loginUsers.find()
    .then(loginUsers => res.status(200).send(loginUsers))
    .catch(err => res.status(400).send('error:'+err))
})



router.route('/registration').post(async(req, res) => {
    try {
        const schema = Joi.object({ Email: Joi.string().email().required(),Password:Joi.string().required().min(5),Repeat_Password:Joi.string().min(5) });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { Email } = req.body;

        if (req.body.Password === req.body.Repeat_Password) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.Password, salt, (err, hashedPassword) => {
                    const Password = hashedPassword;
                    const newUser = new loginUsers({ Email, Password });
                    newUser.save()
                        .then(() => res.status(201).send('user added'))
                        .catch(err => res.status(400).send('error:' + err))
                })
            })
        } else {
            // Moved this line inside the 'else' block
            res.status(501).send('password do not match');
        }
    } catch (e) {
        // Handle or log errors here
        console.error(e);
        res.status(500).send('Internal server error');
    }
});



router.route('/login').post(async (req,res)=>{
    try{
        const schema = Joi.object({ Email: Joi.string().email().required(), Password:Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        var user= await loginUsers.findOne({Email:req.body.Email})
        if(!user){
            return res.status(400).send('Email or User not found')
        }

        var validpassword = await bcrypt.compare(req.body.Password,user.Password)
        if(!validpassword){
            return res.status(400).send('Password incrroect')
        }
        
        res.status(200).send('login successfully')
        
    } 
    catch(e){
        
    }
   
})





// const sendOTPverification=async ({_id,email})=>{
//     try{
//         const otp = `${Math.floor(1000+Math.random()*9000)}`;
//     } catch(error){

//     }
// }




router.post('/forget-email',async (req,res)=>{
    try{
        const schema = Joi.object({ Email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        const{ Email }=req.body;

        const user = await loginUsers.findOne({Email});

        if(!user){
            return res.status(404).send({message:'user not found'})
        }

        const otp = Math.random().toString(36).slice(-4 )

        // res.send({message:'Success',token})

        // user.resetpasswordToken = token ;
        // user.resetpasswordExpires= Date.now() + 3600000;
        
        // await user.save()

        const transporter= nodemailer.createTransport({
            service:"gmail",
            auth: {
                user: "gokulsankargokulsankar7@gmail.com",
                pass: "pidi gmli njlk kwqv "
            },

        })
        const message={
            from :'gokulsankargokulsankar7@gmail.com',
            to : user.Email,
            subject : 'passreset request',
            text: `your account reset token code is ${otp}`
        };
        console.log(otp)

        // const hashOTP = await bcrypt.hash(otp,10);
        const newOTPverification = otp_Verification({
            userId:user._id,
            otp:otp,
            createAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        console.log(otp)

        await newOTPverification.save();
        await   transporter.sendMail(message);
        res.status(201).send({
            status:"PENDING",
            message:"Verification otp mail sended",
            data:{
                userId:user._id,
                Email,
                otp
            }
        })
    }catch(error){
        res.status(400).send({
            status:'failed',
            message:error.message
        })
    }

    
 });


 router.post('/verifyOTP', async (req, res) => {
    try {
      const { otp } = req.body;
      const user = await otp_Verification.findOne({otp});  
      if ( !otp) {
        res.status(400).send("empty otp is not allowed.");
      } else {
        const verify_otp = await otp_Verification.find({otp});
          
        if (verify_otp.length <= 0) {
          res.status(400).send("No matching OTP verification record found.");
        } else {
          const { expiresAt } = verify_otp[0];
          const hashedOTP = verify_otp[0].otp;
  
          if (expiresAt < Date.now()) {

            await otp_Verification.deleteMany({ otp });
            res.status(400).send("OTP code has expired.");
          } else {

            // const validOTP = await bcrypt.compare(otp, hashedOTP);
  
            if (!otp) {

              res.status(400).send("Invalid OTP code.");
            } else {

              await loginUsers.updateOne({ _id: otp_Verification.userId }, { verified: true });
              await otp_Verification.deleteMany({ otp })
              res.status(200).send({
                status: "verified",
                message: "User email verified",
                userId:user.userId
              
              });
            }
          }
        }
      }
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  

router.patch("/reset-password/:id", async (req, res) => {
  console.log(req.body);

  try {
    const schema = Joi.object({
      Password: Joi.string().required().min(5),
      Repeat_Password: Joi.string().required().min(5),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { Password, Repeat_Password } = req.body;

    if (Password !== Repeat_Password) {
      return res.status(403).send({ message: "Passwords do not match" });
    }

    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        return res.status(500).send({ error: "Failed to generate salt" });
      }

      bcrypt.hash(Password, salt, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).send({ error: "Failed to hash password" });
        }

        const newpassword = hashedPassword;

        try {
          const user = await loginUsers.findByIdAndUpdate(
            req.params.id,
            { Password: newpassword }, // Assuming 'password' is the field in your schema
            { new: true }
          );

          if (!user) {
            return res.status(404).send({ error: "User not found" });
          }

          return res.status(200).send({ message: "Password reset successful", user });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ error: "Internal server error" });
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;








//  router.post('/reset-pass/:token',async (req, res)=>{
//     const { token } = req.params;
//     const { password }=req.body;
//     try{
//         // res.send({message:'success'});
//         const user= await loginUsers.findOne({
//             resetpasswordToken : token,
//             resetpasswordExpires : {  $gt: Date.now() },
//         });

//          if(!user){
//             return res.status(404).send({message:'invalid token'})
//         }

//         const hashPassword= await bcrypt.hash(password,10);
//         user.password = hashPassword;  
//         user.resetpasswordToken=null;
//         user.resetpasswordExpires=null;

//         await user.save();

//         res.send({message:"password reset successfully"})
//     } catch(err){
//         res.send({
//             message:'Errpr'});
//     }
// });

module.exports=router;