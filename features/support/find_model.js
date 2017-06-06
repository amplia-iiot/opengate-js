module.exports = {
    setters: function (setter) {
        return {

            'bundle': {
                'nameAndversion': 'findByNameAndVersion'
            },
            'communications module': {
                'organizationAndid': 'findByOrganizationAndId'
            },
            'IoT Profile': {
                'organizationAndid': 'findByOrganizationAndId'
            },
            'channel': {
                'organizationAndname': 'findByOrganizationAndName',
                'domainAndworkgroup': 'findByDomainAndWorkgroup',
                'domainAndworkgroupAndorganization': 'findByDomainAndWorkgroupAndOrganization'
            },
            'certificate': {
                'id': 'findById',
                'idAndformat': 'findByIdAndFormat'
            },
            'device': {
                'organizationAndid': 'findByOrganizationAndId'
            },
            'domain': {
                'name': 'findByName',
                'nameWithHierarchy': 'findByNameWithHierarchy'
            },
            'executions': {
                'id': 'findExecutionsById'
            },

            'operation': {
                'id': 'findById'
            },
            'organization': {
                'name': 'findByName',
                'domainAndworkgroup': 'findByDomainAndWorkgroup'
            },
            'periodicity': {
                'id': 'findPeriodicityById'
            },
            'user': {
                'email': 'findByEmail'
            },
            'rule configuration': {
                'organizationAndchannelAndname': 'findByOrganizationAndChannelAndName',
                'organizationAndchannel': 'findByOrganizationAndChannel'
            },
            'workgroup': {
                'domainAndname': 'findByDomainAndName'
            }
        }[setter];
    },
    getter_response: function (getter) {
        return {
            'bundle name': '/name',
            'certificate name': '/name',
            'communications module id': '/id',
            'channel name': '/name',
            'device id': '/id',
            'domain name': '/name',
            'hierarchy domain name': '/domains[0]/name',
            'execution type': '/name',
            'operation status': '/report/summary/status',
            'operation type': '/request/name',
            'organization name': '/name',
            'periodic operation type': '/job/request/name',
            'periodic schedule': '/schedule',
            'periodic status': '/status',
            'user email': '/email',
            'rule configuration name': '/name',
            'workgroup name': '/name',
            'profile id': '/id',
            'profile name': '/name',
            'profile version': '/version',
            'profile description': '/description',
            'flavour[0] name': '/flavours[0]/name',
            'flavour[1] name': '/flavours[1]/name',
            'flavour[0] datastream[0] id': '/flavours[0]/datastreams[0]/id',
            'flavour[0] datastream[0] qrating version': '/flavours[0]/datastreams[0]/qrating/version',
            'flavour[1] datastream[0] id': '/flavours[1]/datastreams[0]/id',
        }[getter];
    }
};