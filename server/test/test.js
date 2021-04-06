const assert = require ('chai').assert;
const sayHello = require('../api/routes/test').sayHello;

describe('App', function(){
    it('app should say hello', function(){
        let result  = sayHello()
        assert.equal(result, 'hello')
    })
    it('sayHello should return type string', function(){
        let result = sayHello()
        assert.typeOf(result, 'string')
    })
})