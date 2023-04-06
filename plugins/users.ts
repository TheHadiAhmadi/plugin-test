import { services } from "../services"

export default {
    name: 'users', 
    ssrvices: {
        '/api': services
    }
    // init(ctx) {
    //     ctx.addService(services)
    // }
} 
