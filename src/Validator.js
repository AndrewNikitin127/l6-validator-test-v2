import StringSchema from './StringSchema.js'
import FunctionSchema from './FunctionSchema.js'

export default class Validator {
  string(){
    return new StringSchema();
  }
  function(){
    return new FunctionSchema();
  }
}