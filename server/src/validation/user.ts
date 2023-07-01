import Joi from 'joi';

const UserCreate = Joi.object({
  first_name: Joi.string().min(3).max(26),
});

export default UserCreate;
