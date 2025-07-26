const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');

module.exports = (srv) => {
    srv.on('test', async (req) => {
        var path = "/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/$metadata"

        console.log(req.data.destName);

        try {
            const result = await executeHttpRequest(
                {
                    destinationName: req.data.destName,
                    URL: path
                },
                {
                    method: 'GET'
                }
            )
            console.log(result.data)

            //Return data to be added once connectivity is established successfully
            object = { "message": "TEST" };
            return object;
        }
        catch (error) {
            console.log(error.stack)
            req.error(error.stack)
        }
    })
}