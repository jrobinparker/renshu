const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatenProfileInput(data) {
  let errors = {}

  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.level = !isEmpty(data.level) ? data.level : ''

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = 'Handle must be between 2 and 30 characters in length.'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Username is required.'
  }

  if (Validator.isEmpty(data.level)) {
    errors.level = 'JLPT level is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
