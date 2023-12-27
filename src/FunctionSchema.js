export default class FunctionSchema {
  validators = [(val) => val instanceof Function];
  context = this;
  args = [];

  constructor(newValidators, context, args){
    if (newValidators) this.validators = newValidators;
    if (context) this.context = context;
    if (args) this.args = args;
  }

  isValid(val){
    if (this.context !== this) val = val.bind(this.context);
    if (this.args.length !== 0) val = val.bind(this.context, this.args);

    return this.validators.every((validator) => validator(val));
  }
  expect(val){
    const validator = (func) => func() === val;
    return new FunctionSchema ([...this.validators, validator], this.context, [...this.args]) // {...this.context} ? вроде не надо клонировать объект. так как мы привязываем конкретный объект в callWith. Но чет коробит от этого.
  }
  callWith(context){
    return new FunctionSchema([...this.validators], context, [...this.args]);
  }
  arguments(args){
    return new FunctionSchema([...this.validators], this.context, args);
  }
}