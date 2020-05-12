// Update this constant with your ServiceNow credentials
const options = {
    url: 'https://dev86930.service-now.com/',
    username: 'admin',
    password: '@Snehasajjan143',
    serviceNowTable: 'change_request'
};

// Import built-in Node.js package path.
const path = require('path');

/**
 * Import the ServiceNowConnector class from local Node.js module connector.js.
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, './connector.js'));

/**
 * @function mainOnObject
 * @description Instantiates an object from the imported ServiceNowConnector class
 *   and tests the object's get and post methods.
 */
function mainOnObject() {
    // Instantiate an object from class ServiceNowConnector.
    const connector = new ServiceNowConnector(options);

    // Test the object's get and post methods.
    // You must write the arguments for get and post.
    connector.get((data, error) => {
        if (error) {
            console.error(`\nError returned from GET request:\n${JSON.stringify(error)}`);
        } else {
            let resultdata = []
            let obj = JSON.parse(data.body)
            obj.result.forEach(data => {
                resultdata.push(formateResponse(data))
            })
            console.log(`\nResponse returned from GET request:\n${JSON.stringify(resultdata)}`)
        }
    });
    connector.post((data, error) => {
        if (error) {
            console.error(`\nError returned from POST request:\n${JSON.stringify(error)}`);
        } else {
            let obj = JSON.parse(data.body)
            let respondata = formateResponse(obj.result)
            console.log(`\nResponse returned from POST request:\n${JSON.stringify(respondata)}`)
        }
    });

}

function formateResponse(data) {
    return {
        'change_ticket_number': data.number,
        'active': data.active,
        'priority': data.priority,
        'description': data.description,
        'work_start': data.work_start,
        'work_end': data.work_end,
        'change_ticket_key': data.sys_id
    }
}

// Call mainOnObject to run it.
mainOnObject();

