export default class FunctionSchema {
  validators = [(val) => val instanceof Function];
  context = null;

  constructor(newValidators, context){
    if (newValidators) this.validators = newValidators;
    if (context) this.context = context;
  }

  isValid(val){
    if (this.context !== null) val = val.bind(this.context);
    return this.validators.every((validator) => validator(val));
  }
  expect(val){
    const validator = (func) => func() === val;
    return new FunctionSchema ([].concat(this.validators, validator), this.context)
  }
  callWith(context){
    const a = new FunctionSchema([].concat(this.validators), context);
    return a; 
  }
}