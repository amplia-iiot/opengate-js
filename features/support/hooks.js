var { Before } = require('cucumber');
const request = require('superagent');

Before({tags: "@guerrilla"}, async function (){
    const _this = this
    await new Promise(async (callback, error) => {
        request.get(_this.guerrillaApi).query({
                f: 'set_email_address',
                email_user: 'ogapi',
                lang: 'en'
        }).end((err, response) => {
            if(err){
                console.log(err);
                _this.error = err;
                error(err)
            }else {
                console.log('RESPONSE: ', response)
                callback()
            }
        })
    })
})