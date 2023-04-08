import { services } from "./services";

// Define a function to generate client-side services based on backend services
function generateClientServices(services) {
    const clientServices = {};
    for (const serviceName of Object.keys(services)) {
      const service = services[serviceName];
      const clientService = {};
      for (const methodName of Object.keys(service)) {
        clientService[methodName] = async function(request) {
          // Make a request to the backend API using the method name and request data
          const res = await fetch(`http://localhost:3000/api/${serviceName}/${methodName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
          })
          const response = await res.json()

          if(res.status === 500) {
            throw new Error(response)
          }

          return response;
        };
      }
      clientServices[serviceName] = clientService;
    }
    return clientServices;
  }

  
  const clientServices: any = generateClientServices(services);
  
  // Example usage of the client-side services
  clientServices.UserService.Get({ id: 1 })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });

    clientServices.ProductService.Get({ id: 4 })
    .then(response => {
      console.log(response);
    })
    // .catch(error => {
    //   console.error(error);
    // });
  