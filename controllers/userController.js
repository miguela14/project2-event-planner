const User = require ('..models/user');

async function createUser(req, res) {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        req.session.save(()=> {
            req.session.user_id = userData.id
            req.session.logged_in = true;
            res.status(200).json(userData)
        });
    }catch (err) {
        res.status(500).json({ error: 'error creating user'});
    }
}
module.exports = {
    createUser,
};
        