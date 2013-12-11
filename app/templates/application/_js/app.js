XF.define(function () {
    return new XF.App({
        initialize: function() {

        },

        settings: {
            appVersion: '1.0',
            noCache: true,
            dataUrlPrefix: 'mocks/'
        },

        animations: {
            standardAnimation: 'slideleft'
        },

        device: {
            types: [
                {
                    name: 'desktop',
                    range: {
                        max: null,
                        min: 1025
                    },
                    templatePath: 'desktop/',
                    defaultAnimation: 'fade'
                },
                {
                    name: 'mobile',
                    range: {
                        max: 1024,
                        min: null
                    },
                    templatePath: 'mobile/'
                }
            ]
        },

        router: {
            routes: {
                '': 'home',
                '/': 'home',
                'about': 'about',
                'information': 'information',
                'contacts': 'contacts'
            },

            home: function() {
                $('.xf-header > a').addClass('hidden');
            },

            about: function(hash) {
                $('.xf-header > a').removeClass('hidden');
            },
            
            information: function(hash) {
                $('.xf-header > a').removeClass('hidden');
            },
            
            contacts: function(hash) {
                $('.xf-header > a').removeClass('hidden');
            }
        }

    });
});