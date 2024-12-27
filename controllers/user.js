import {User} from '..models/user.js'
import bcrypt from "bcrypt"


export const register = async (req, res)=>{
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password) {
            return res.status(403).json({
                success : false,
                message : "All fields required"
            })
        }
        // find if already registered email 
        const user = await User.findOne(email);
        if(user) {
            return res.status(403).json({
                success : false,
                message : "This email ID is already registered"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName, 
            email,
            password:hashedPassword
        
        });
        return res.status(201).json({
            success : true,
            message : "Account created successfully."
        })
    } catch (error) {
        console.log("Registeration Failed");
        
    }
}