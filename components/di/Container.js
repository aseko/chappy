const {
    ClassInjection,
    SingletonInjection,
    FactoryInjection,
    InstanceInjection
} = require('./injectors')

class Container {
    constructor() {
        this.store = new Map()
    }

    set(type, name, item, args) {
        this.checkName(name)
        this.store.set(name, new type(item, args))
    }

    get(name, args) {
        const injector = this.store.get(name)
        if (!injector) throw new Error(`"${name}" not register`)
        return injector.instance(args)
    }

    checkName(name) {
        if (this.store.has(name)) throw new Error(`Name "${name}" already exist`)
    }
}

Container.AS_CLASS = ClassInjection
Container.AS_SINGLETON = SingletonInjection
Container.AS_FACTORY = FactoryInjection
Container.AS_INSTANCE = InstanceInjection

module.exports = Container