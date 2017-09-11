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
            },
            'area': {
                'identifier': 'withIdentifier',
                'organization': 'withOrganization'
            }
        }[setter];
    },
    methods: function(method) {
        return {
            'certificate': 'withId',
            'user': 'withEmail',
            'organization': 'withName',
            'bundle': 'withVersion',
            'area': 'withIdentifier'
        }[method];
    }
};
