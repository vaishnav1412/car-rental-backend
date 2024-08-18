const joi = require('@hapi/joi')

const authSchema = joi.object({
    name:joi.string(),
    email:joi.string(),
    password:joi.string().min(7).required(),
    confirmPassword:joi.string().min(7).required(),
})
module.exports = {
    authSchema,
}
