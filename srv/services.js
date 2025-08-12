const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const { getDestination } = require('@sap-cloud-sdk/connectivity')

module.exports = (srv) => {
    srv.on('test', async (req) => {
        let path = `/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/$metadata`

        console.log(req.data.destName);

        try {

            const destination = await getDestination({ destinationName: req.data.destName });

            console.log(JSON.stringify(destination))

            if (destination === undefined || destination === null) {
                throw Error(`Destination ${req.data.destName} not found.`);
            }

            const result = await executeHttpRequest(
                destination,
                {
                    method: 'get',
                    URL: path
                }
            )
            console.log(`Response from OData service: ${JSON.stringify(result.data)}`);

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