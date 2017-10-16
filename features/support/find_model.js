module.exports = {
    setters: function (setter) {
        return {

            'bundle': {
                'nameAndversion': 'findByNameAndVersion'
            },
            'communications module': {
                'organizationAndid': 'findByOrganizationAndId'
            },
            'datamodel': {
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
            },
            'area': {
                'organizationAndidentifier': 'findByOrganizationAndIdentifier',
                'organization': 'findByOrganization'
            }
        }[setter];
    },
    getter_response: function (getter) {
        return {
            'bundle name': 'name',
            'certificate name': 'name',
            'communications module id': 'id',
            'channel name': 'name',
            'device id': 'id',
            'domain name': 'name',
            'hierarchy domain name': 'domains[0].name',
            'execution type': 'name',
            'operation status': 'report.summary.status',
            'operation type': 'request.name',
            'organization name': 'name',
            'periodic operation type': 'job.request.name',
            'periodic schedule': 'schedule',
            'periodic status': 'status',
            'user email': 'email',
            'rule configuration name': 'name',
            'workgroup name': 'name',
            'datamodel identifier': 'identifier',
            'datamodel name': 'name',
            'datamodel version': 'version',
            'datamodel description': 'description',
            'category[0] identifier': 'categories[0].identifier',
            'category[1] identifier': 'categories[1].identifier',
            'category[0] datastream[0] identifier': 'categories[0].datastreams[0].identifier',
            'category[0] datastream[0] qrating version': 'categories[0].datastreams[0].qrating.version',
            'category[1] datastream[0] identifier': 'categories[1].datastreams[0].identifier',
            'area identifier': 'identifier',
            'area name': 'name'
        }[getter];
    }
};
