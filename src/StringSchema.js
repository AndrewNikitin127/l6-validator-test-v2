export default class StringSchema {
  validators = [(val) => typeof val === 'string'];

  constructor(newValidators){
    if (newValidators) this.validators = newValidators;
  }

  isValid(val){
    return this.validators.every((validator) => validator(val));
  }
  hasSpaces(){
    const validator = (string) => string.includes(' ');
    return new StringSchema([].concat(this.validators, validator))
  }
}