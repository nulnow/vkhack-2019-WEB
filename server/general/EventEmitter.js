const subscribers = {}

class EventEmitter {
    static subscribe(event, func) {
        if (!(typeof func === 'function')) {
            throw Error('func is not a function')
        }

        if (!subscribers[event]) {
            subscribers[event] = []
        }
        subscribers[event].push(func)
    }

    static emit(event, payload) {
        if (!subscribers[event]) {
            subscribers[event] = []
        }
        subscribers[event].forEach(subscriber => {
            subscriber(payload)
        })
    }
}

EventEmitter.TYPES = {
    USER_BLOCKED: 'USER_BLOCKED',
    USER_REGISTERED: 'USER_REGISTERED',
    USER_NOTIFY: 'USER_NOTIFY',
}

module.exports = EventEmitter