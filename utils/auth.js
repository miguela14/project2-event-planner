const User = require ('..models/User');

async function validateUser(email, password) {
    const user = await User.findOne({ where: {email}});
    if (!user){
        return false;
    }
    const validPassword = await user.checkPassword(password);
    if(!validPassword) {
        return false;
    }
    return true;
}


module.exports = {
    validateUser,
};