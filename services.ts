  
  // Example backend services
  const UserService = {
    Get(request) {
        return {
            message: '123'
        };
    },
    Test: {
      TTT(request) {
        console.log(request)
        return request
      },
      Next: {
        ''(req) {
          return {'index': true}
        },
        Last() {
          return {a: 23}
        }
      },
      
    }

  };
  
  const ProductService = {
      Get(request) {
        if(request.id === 4)
            throw new Error('This is error')
        return 'response ' + request.id;
      }
    };
  
  
  // Define the backend services object
  export const services = {
    UserService,
    ProductService
  };