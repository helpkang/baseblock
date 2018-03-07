const UdpClinet = require('./UdpClient')


const UdpFactory = function () {
    const instances = {}
    return {
        get (key = 'default') {
            
            const oldInstance = instances[key]
            if (oldInstance) return oldInstance
            
            const newInstance = new UdpClinet()
            instances[key] = newInstance
            return newInstance
            
        }
    }

}

module.exports = UdpFactory()