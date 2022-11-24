var { Before } = require('cucumber');
var axios = require('axios');

Before({tags: "@guerrilla"}, async function (){
    await new Promise(async (callback, error) => {
        axios.get(`${this.guerrillaApi}set_email_address`, {
            params: {
                email_user: 'ogapi',
                lang: 'en'
            }
        }).then((response) => {
            console.log('RESPONSE: ', response)
            callback()
        }).catch((err) => {
            console.log(err);
            _this.error = err;
            error(err)
        })
    })
})