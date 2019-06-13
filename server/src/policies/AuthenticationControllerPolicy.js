const Joi = require('joi')

module.exports = { // looking if data pass or fail
    register(req, res, next) {
        const schema = {
            companyname: Joi.string(),
            firstname: Joi.string(),
            lastname: Joi.string(),
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
            purpose: Joi.string()
        }
        const { error, value } = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'companyname':
                    res.status(400).send({
                        error: 'You must provide a valid company name'
                    })
                    break;
                case 'firstname':
                    res.status(400).send({
                        error: 'You must provide a valid first name'
                    })
                    break;
                case 'lastname':
                    res.status(400).send({
                        error: 'You must provide a valid last name'
                    })
                    break;
                case 'username':
                    res.status(400).send({
                        error: 'You must provide a valid username'
                    })
                    break;
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break;
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must contain ONLY the following characters: lower case, upper case, numerics
                        <br>
                        2. It must be at least 8 characters in length and not greater than 32 characters in length`
                    })
                    break;
                case 'purpose':
                    res.status(400).send({
                        error: 'You must provide a valid purpose'
                    })
                    break;
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next() // going to the next instruction (va_list())
        }
    }
}
