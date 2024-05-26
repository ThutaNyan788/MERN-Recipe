const User = require("../model/User")
const bcrypt = require("bcrypt");

const UserController = {
    login: (req, res) => {
        return res.json({ msg: "hit login api" })
    },
    register: async (req, res) => {
        try {
            let { name, email, password } = req.body;
            
            let user =await User.register(name,email,password);

            return res.json(user)
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }
    }
}


module.exports = UserController;