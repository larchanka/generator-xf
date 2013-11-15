$(function () {
    var App = new XF.App({
        initialize: function() {
        },

        settings: {
            applicationVersion: '1.1' + Math.random(),
            noCache: true,
            componentUrlPrefix: 'js/components/',
            templateUrlPrefix: 'tmpl/',
            dataUrlPrefix: 'mocks/'

        },

        animations: {
        default: ''
    },

    device: {
        types: [
        
        //Settings for mobile devices
        // {
            //     name: 'mobile',
            //     range: {
                //         max: 568,
                //         min: null
                //     },
                //     templatePath: 'mobile/',
                //     fallBackTo: 'default',
                //     defaultAnimation: 'default'
                // }, 
        
        
                //Settings for tablet devices
                // {
                    //     name: 'tablet',
                    //     range: {
                        //         max: 1024,
                        //         min: 569
                        //     },
                        //     templatePath: 'tablet/',
                        //     fallBackTo: 'default',
                        //     defaultAnimation: 'default'
                        // }, 
                        {
                            name: 'desktop',
                            range: {
                                max: null,
                                min: null
                            },
                            templatePath: 'desktop/',
                            defaultAnimation: 'fade'
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