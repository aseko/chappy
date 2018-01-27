const expect = require('chai').expect

const Di = require('../index')

describe('Dependency Injector', function () {
    it('set injection without errors', function () {
        const container = new Di()
        container.registerClass('InjectionName1', class {
        })
        container.registerSingleton('InjectionName2', class {
        })
        container.registerFactory('InjectionName3', () => {
        })

        container.registerClass('InjectionName4', class {
        }, 1, 2, 3)
        container.registerSingleton('InjectionName5', class {
        }, 1, 2, 3)
        container.registerFactory('InjectionName6', () => {
        }, 1, 2, 3)
    })

    it('get injection without errors', function () {
        const container = new Di()
        container.registerClass('InjectionName1', class {
        })
        container.registerSingleton('InjectionName2', class {
        })
        container.registerFactory('InjectionName3', () => {
        })

        container.registerClass('InjectionName4', class {
        }, 1, 2, 3)
        container.registerSingleton('InjectionName5', class {
        }, 1, 2, 3)
        container.registerFactory('InjectionName6', () => {
        }, 1, 2, 3)

        container.get('InjectionName1')
        container.get('InjectionName2')
        container.get('InjectionName3')
        container.get('InjectionName4')
        container.get('InjectionName5')
        container.get('InjectionName6')
        container.get('InjectionName6', 4, 5, 6)
    })

    it('correct returning class', function () {
        class TestClass {
            constructor(name) {
                this.name = name
            }

            sayName() {
                return this.name
            }
        }

        const container = new Di()
        container.registerClass('Bob', TestClass, 'Bob')
        container.registerClass('Tom', TestClass, 'Tom')
        expect(container.get('Bob')).to.be.instanceof(TestClass)
        expect(container.get('Tom')).to.be.instanceof(TestClass)
        expect(container.get('Bob')).to.be.not.equal(container.get('Bob'))
    })

    it('correct returning singleton', function () {
        class TestClass {
            constructor(name) {
                this.name = name
            }

            sayName() {
                return this.name
            }
        }

        const container = new Di()
        container.registerSingleton('Bob', TestClass, 'Bob')
        expect(container.get('Bob')).to.be.instanceof(TestClass)
        expect(container.get('Bob')).to.be.equal(container.get('Bob'))
    })

    it('correct returning factory', function () {
        class TestClass {
            constructor(name) {
                this.name = name
            }

            sayName() {
                return this.name
            }
        }

        const container = new Di()
        container.registerFactory('SomeFactory', (name) => (new TestClass(name)), 'defaultName')
        expect(container.get('SomeFactory')).to.be.instanceof(TestClass)
        expect(container.get('SomeFactory')).to.be.not.equal(container.get('SomeFactory'))
        expect(container.get('SomeFactory').sayName()).to.be.equal('defaultName')
        expect(container.get('SomeFactory', 'Bob').sayName()).to.be.equal('Bob')
    })
})