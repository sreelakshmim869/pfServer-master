const users = require('./Models/userSchema')
const jwt = require('jsonwebtoken')
// register Logic
exports.register = async(req,res)=>{
    console.log('Inside register controller function');
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Account alerday exist !!! please Login....")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(`Register API Faild, Error : ${err}`)
    }
   
} 


// Login Logic
exports.login = async (req, res) => {
    console.log('Inside login controller function');
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email,password });
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id},"superscript12345")
            res.status(200).json({
                existingUser,token
            })
        } else {
            // Assuming you have a method to compare passwords in your userSchema
            res.status(404).json("Incorrect Email / Password");
        }

    } catch (err) {
        res.status(401).json(`Login API Failed, Error: ${err}`);
    }
}