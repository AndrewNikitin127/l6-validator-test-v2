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
    return new FunctionSchema ([].concat(this.validators, validator), this.context) // {...this.context} ? вроде не надо клонировать объект. так как мы привязываем конкретный объект в callWith. Но чет коробит от этого.
  }
  callWith(context){
    return new FunctionSchema([].concat(this.validators), context);
  }
}