module.exports = {
    setters: function(setter) {
        return {
            'hardware': {
                'hardware id': 'withId',
                'model name': 'withModel',
                'model version': 'withModelVersion',
                'manufacturer name': 'withManufacturer'
            },
            'software': {
                'software id': 'withId',
                'software name': 'withName',
                'software version': 'withVersion',
                'software type': 'withType',
                'hardware id': 'withHardwareId',
                'model name': 'withModel',
                'model version': 'withModelVersion',
                'manufacturer name': 'withManufacturer'
            },
            'operational status': {
                'id': 'withId',
                'entity type': 'withEntityType'
            },
            'specific type': {
                'id': 'withId',
                'entity type': 'withEntityType'
            },
            'administrative state': {
                'id': 'withId',
                'entity type': 'withEntityType'
            },
            'communications module type': {
                'type': 'withType'
            },
            'fields definition': {
                'type': 'withType'
            },
            "certificates": {
                "assignable": "assignable",
                "administrable": "administrable",
                "findFields": "findFields"
            },
            'entity': {
                'provisioned data': 'onProvisioned',
                'collected data': 'onCollected'
            },
            'multiple entity': {
                'on devices': 'onDevices',
                'on subscribers': 'onSubscribers',
                'on subscriptions': 'onSubscriptions',
                'on communications Modules': 'onCommunicationsModules'
            },
            "basicTypes search": {
                "withPublicParameters": "withPublicParameters"
            }
        }[setter];
    }
};