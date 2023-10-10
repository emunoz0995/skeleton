const AuthService = require('../services/auth.services');
const transporter = require('../utils/mailer');


const register = async(req, res) => {
    try {
        const user = req.body;


        const result = await AuthService.register(user);
        if(result){
            res.status(201).json({message: 'user created'});
                await transporter.sendMail({
                    from: 'javichodk@gmail.com',
                    to: result.email,
                    subject: 'Email confirmation',
                    html: "<h1>Bienvenido a la mejor app de chat creada por mi</h1> <p>Tienes que confirmar tu email</p><p> Solo haz click en el siguiente <a href='#'' target='new_blank'> enlace </a>" ,
                });
        } else {
            res.status(400).json({message: 'somethign wrong'})
        }
    } catch (error) {
        res.status(400).message(error.message);
    }

}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email){
            res.status(400).json({
                error:'Missing data',
                message:'Not email provided'
            });
        }
        if(!password){
            res.status(400).json({
                error:'Missing data',
                message:'Not password provided'
            });
        }
    const result = await AuthService.login({email, password});
    if(result.isValid){
        const { username, id, email } = result.user;
        const userData = { username, id, email };
        const token = await AuthService.genToken(userData);
        result.user.token = token;
        res.json(result.user);
    }
    } catch (error) {
        res.status(400).json({message: 'somethign wrong'})
    }
}

module.exports = {
    register,
    login,
}