const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const { getDestination } = require('@sap-cloud-sdk/connectivity')

module.exports = (srv) => {
    srv.on('test', async (req) => {
        try {
            let apiPath = `/sap/opu/odata/IWFND/CATALOGSERVICE;v=2`;                
            const conn = await cds.connect.to('metadataService');
            conn.destination = req.data.destName;
            const result = await conn.get(apiPath);
            console.log(`POST performed successfully:${JSON.stringify(result)}`);        
            //Return data to be added once connectivity is established successfully
            object = { "message": "TEST" };
            return object;
        }
        catch (error) {
            console.log('Message:', error.rootCause?.message);
            console.log('Response body:', error.rootCause?.response?.data);
            console.log(error.stack)
            req.error(error.stack)
        }
    })
}