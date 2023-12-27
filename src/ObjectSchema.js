const objLength = (obj) => Object.keys(obj).length;
const isPlaneObject = (obj) => Object.getPrototypeOf(obj) === Object.prototype;

export default class ObjectSchema {
  validatorsObject = null;

  constructor (validatorsObject){
    if(validatorsObject) this.validatorsObject = validatorsObject;
  }

  shape(validatorsObject){
    return new ObjectSchema(validatorsObject)
  }
  
  isValid(inspectedObject){
    const validDeepObj = (inspectedObj, validatorsObject) => {
      if (objLength(inspectedObj) !== objLength(validatorsObject)) return false;

      return Object.entries(inspectedObj).every(([key, val]) => {

        if (!isPlaneObject(inspectedObj[key])) return validatorsObject[key].isValid(val);
        return validDeepObj(inspectedObj[key], validatorsObject[key]);         
      })
    }
    return validDeepObj(inspectedObject, this.validatorsObject)
  }
}