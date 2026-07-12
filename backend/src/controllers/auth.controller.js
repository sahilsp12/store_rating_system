const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const register = async (req, res) => {
    try {
        const { name, email, address, password } = req.body;

        
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

       
        await prisma.user.create({
            data: {
                name,
                email,
                address,
                password: hashedPassword,
                role: "USER"
            }
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    register
};