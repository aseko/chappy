const Container = require('./Container')

class DependencyInjection {
    constructor() {
        this.container = new Container
    }

    registerInstance(name, instance) {
        this.container.set(Container.AS_INSTANCE, name, instance)
    }

    registerClass(name, constructor, ...args) {
        this.container.set(Container.AS_CLASS, name, constructor, args)
    }

    registerSingleton(name, constructor, ...args) {
        this.container.set(Container.AS_SINGLETON, name, constructor, args)
    }

    registerFactory(name, fn, ...args) {
        this.container.set(Container.AS_FACTORY, name, fn, args)
    }

    get(name, ...args) {
        return this.container.get(name, args)
    }
}

module.exports = DependencyInjection