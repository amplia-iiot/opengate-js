module.exports = {
    requestResetPassword: {
        post: {
            '/provision/users/:user/reset': function (req) {
                const user = req.params.user
                if(user){
                    return {
                        statusCode: 200,
                        status: 200
                    }
                }else{
                    return {
                        statusCode: 400,
                        status: 400
                    }
                }
            }
        }
    },
    resetPassword: {
        post: {
            '/provision/users/:user/reset/:token': function (req) {
                const user = req.params.user
                const token = req.params.token
                const password = req.body.password
                if(user && token && password){
                    return {
                        statusCode: 200,
                        status: 200
                    }
                }else{
                    return {
                        statusCode: 400,
                        status: 400
                    }
                }
            }
        }
    }
}