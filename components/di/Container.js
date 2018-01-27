class AbstractInjection {
    constructor(item, args = []) {
        if (!item) throw new Error(`Can't register injection ${item}`)
        this.item = item
        this.args = args
    }

    instance() {
        throw new Error('Need overwrite this method')
    }
}

class ClassInjection extends AbstractInjection {
    instance() {
        return new this.item(...this.args)
    }
}

class SingletonInjection extends AbstractInjection {
    constructor(...args) {
        super(...args)
        this._instance = null
    }

    instance() {
        if (!this._instance) this._instance = new this.item(...this.args)
        return this._instance
    }
}

class FactoryInjection extends AbstractInjection {
    instance(args) {
        args = args.length ? args : this.args
        return this.item(...args)
    }
}

class InstanceInjection extends AbstractInjection {
    instance() {
        return this.item
    }
}

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