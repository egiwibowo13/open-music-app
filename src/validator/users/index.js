const { UserPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UsersValidator = {
  validateUserPayload: (payload) => {
    console.log({ payload });
    const validationResult = UserPayloadSchema.validate(payload);
    console.log({ validationResult });
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UsersValidator;
