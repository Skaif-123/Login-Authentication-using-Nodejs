import Joi from "joi";

const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    role: Joi.string().min(4).max(5).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      message: "bad request",
      error,
    });
  }
  next();
};
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),   
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      success: false,
      message: "bad request",
      error,
    });
  }
  next();
};

export { loginValidation, signUpValidation };

