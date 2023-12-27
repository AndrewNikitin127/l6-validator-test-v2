export default class StringSchema {
  validators = [(val) => typeof val === 'string'];

  isValid(val){
    return this.validators.every((validator) => validator(val));
  }
}