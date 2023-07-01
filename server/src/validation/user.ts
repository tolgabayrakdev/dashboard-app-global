import Joi from 'joi';

const UserCreate = Joi.object({
  first_name: Joi.string().min(3).max(26).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export default UserCreate;
