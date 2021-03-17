let request = require(`request`);
const config = require(`../Config`);

exports.submit = ( assessment ) => {
  console.log('assessment==>',assessment)
    return new Promise((resolve, reject) => {
  
    //supply the correct uri and method here
    const options = {
      uri: `${config.api.url}/assessment/submit/`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        assessment:assessment
      },
      json:true
  };
  console.log('options-->', options)
      //this function sends a request to the API
      // finish the logic to handle the response when returned from the API
      request(options, (error, response) => {
        console.log('error===>', error)
            console.log('response===>', response)
      });
    });
  };