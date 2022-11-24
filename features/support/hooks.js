var { Before } = require('cucumber');
var OpengateAPI = require(process.cwd() + '/dist/opengate-api-npm');

Before({tags: "@guerrilla"}, async function (){
    this.ogapiFG = new OpengateAPI({url: this.guerrillaApi})
    const _this = this
    await new Promise(async (callback, error) => {
        this.ogapiFG.Napi.get(_this.guerillaPath, undefined, undefined, {
                f: 'set_email_address',
                email_user: 'ogapi',
                lang: 'en'
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