const Joi = require("joi");

const signUpSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  profile_image: Joi.string().required(),
});

const updateUserSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    profile_image: Joi.string().required(),
  });

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  

function validateSchema(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req?.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      req.validatedData = value;
      next();
    };
  }

  const validateSignUp = validateSchema(signUpSchema);
  const validateSignIn = validateSchema(signInSchema);
  const validateUpdateUser = validateSchema(updateUserSchema);

module.exports = {
    validateSignUp,
    validateSignIn,
    validateUpdateUser
};
