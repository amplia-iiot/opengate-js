module.exports = {
    setters: function(setter) {
        return {
            'certificate': {
                'id': 'withId'
            },
            'user': {
                'email': 'withEmail'
            },
            'organization': {
                'name': 'withName'
            },
            'bundle': {
                'name': 'withName',
                'version': 'withVersion'
            }
        }[setter];
    },
    methods: function(method) {
        return {
            'certificate': 'withId',
            'user': 'withEmail',
            'organization': 'withName',
            'bundle': 'withVersion'
        }[method];
    }
};
