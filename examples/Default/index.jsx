/* eslint no-template-curly-in-string: 0 */
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import ensureArray from 'ensure-array';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SideNav from '../SideNav';
import contentGenerator from './contentGenerator';

// fake array for contentGenerator
const generateContent = [
    {
        'icon': 'area-chart fa-fw',
        'label': 'Reporting Hub',
        'id': 'reporting-hub',
        'content': [
            {
                'label': 'All Products',
                'to': '/reporting-hub',
                'id': 'reporting-hub|all-products'
            },
            {
                'icon': 'car fa-fw',
                'label': 'Driver',
                'to': '/reporting-hub/Driver',
                'key': 'Driver-0',
                'id': 'reporting-hub|driver'
            },
            {
                'icon': 'hand-stop-o fa-fw',
                'label': 'Rider',
                'to': '/reporting-hub/Rider',
                'key': 'Rider-1',
                'id': 'reporting-hub|rider'
            },
            {
                'icon': 'cutlery fa-fw',
                'label': 'Eater',
                'to': '/reporting-hub/Eater',
                'key': 'Eater-2',
                'id': 'reporting-hub|eater'
            },
            {
                'icon': 'truck fa-fw',
                'label': 'Courier',
                'to': '/reporting-hub/Courier',
                'key': 'Courier-3',
                'id': 'reporting-hub|courier'
            },
            {
                'icon': 'coffee fa-fw',
                'label': 'Restaurants',
                'to': '/reporting-hub/Restaurants',
                'key': 'Restaurants-4',
                'id': 'reporting-hub|restaurants'
            }
        ]
    },
    {
        'icon': 'line-chart fa-fw',
        'label': 'Maple',
        'id': 'mapple',
        'content': [
            {
                'icon': 'us_canada region',
                'label': 'US_CANADA',
                'id': 'mapple|us_canada',
                'content': [
                    {
                        'icon': 'hand-stop-o fa-fw',
                        'label': 'RIDER',
                        'id': 'mapple|us_canada|rider',
                        'to': '/maple/us_canada/rider/Q4_2018',
                        'key': 'Rider-0'
                    },
                    {
                        'icon': 'car fa-fw',
                        'label': 'DRIVER',
                        'id': 'mapple|us_canada|driver',
                        'to': '/maple/us_canada/driver/Q4_2018',
                        'key': 'Driver-1'
                    },
                    {
                        'icon': 'cutlery fa-fw',
                        'label': 'EATER',
                        'id': 'mapple|us_canada|eater',
                        'to': '/maple/us_canada/eater/Q4_2018',
                        'key': 'Eater-2'
                    }
                ]
            },
            {
                'icon': 'india region',
                'label': 'INDIA',
                'id': 'mapple|india',
                'content': [
                    {
                        'icon': 'hand-stop-o fa-fw',
                        'label': 'RIDER',
                        'id': 'mapple|india|rider',
                        'to': '/maple/india/rider/Q4_2018',
                        'key': 'Rider-0'
                    },
                    {
                        'icon': 'car fa-fw',
                        'label': 'DRIVER',
                        'id': 'mapple|india|driver',
                        'to': '/maple/india/driver/Q4_2018',
                        'key': 'Driver-1'
                    }
                ]
            }
        ]
    },
    {
        'icon': 'bullseye fa-fw',
        'label': 'Audience Publisher',
        'id': 'audience-manager',
        'to': '/audience-publisher'
    },
    {
        'icon': 'tag fa-fw',
        'label': 'Campaign Naming',
        'id': 'campaign-naming',
        'to': '/campaign-naming'
    },
    {
        'icon': 'sliders fa-fw',
        'label': 'Campaign Management',
        'id': 'campaign-management',
        'to': '/last-mile/tools/campaign-creation'
    },
    {
        'icon': 'briefcase fa-fw',
        'label': 'Budget Management',
        'id': 'budget-management',
        'content': [
            {
                'icon': 'emea region',
                'label': 'EMEA',
                'id': 'budget-management|emea',
                'content': [
                    {
                        'icon': 'hand-stop-o fa-fw',
                        'label': 'Rider',
                        'id': 'budget-management|EMEA|RIDER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|EMEA|RIDER|channel-overview',
                                'to': '/last-mile/tools/bm-emea/rider/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|emea|rider|country-overview',
                                'to': '/last-mile/tools/bm-emea/rider/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|EMEA|RIDER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|RIDER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/rider/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|EMEA|RIDER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-emea/rider/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|EMEA|RIDER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-emea/rider/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|EMEA|RIDER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|RIDER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/rider/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|EMEA|RIDER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-emea/rider/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|EMEA|RIDER|display|partner',
                                        'to': '/last-mile/tools/bm-emea/rider/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'id': 'budget-management|EMEA|RIDER|sotial',
                                'label': 'Social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|RIDER|sotial|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/rider/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|EMEA|RIDER|sotial|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-emea/rider/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|EMEA|RIDER|sotial|sub-channel',
                                        'to': '/last-mile/tools/bm-emea/rider/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'car fa-fw',
                        'label': 'Driver',
                        'id': 'budget-management|EMEA|DRIVER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|EMEA|DRIVER|channel-overview',
                                'to': '/last-mile/tools/bm-emea/driver/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|emea|driver|country-overview',
                                'to': '/last-mile/tools/bm-emea/driver/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|EMEA|DRIVER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|DRIVER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/driver/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|EMEA|DRIVER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-emea/driver/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|EMEA|DRIVER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-emea/driver/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|EMEA|DRIVER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|DRIVER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/driver/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|EMEA|DRIVER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-emea/driver/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|EMEA|DRIVER|display|partner',
                                        'to': '/last-mile/tools/bm-emea/driver/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|EMEA|DRIVER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|DRIVER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/driver/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|EMEA|DRIVER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-emea/driver/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|EMEA|DRIVER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-emea/driver/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'cutlery fa-fw',
                        'label': 'Eater',
                        'id': 'budget-management|EMEA|EATS',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|EMEA|EATS|channel-overview',
                                'to': '/last-mile/tools/bm-emea/eats/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|emea|eater|country-overview',
                                'to': '/last-mile/tools/bm-emea/eats/country-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|EMEA|EATS|campaign-type-overview',
                                'to': '/last-mile/tools/bm-emea/eats/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|EMEA|EATS|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|EATS|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/eats/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|EMEA|EATS|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-emea/eats/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|EMEA|EATS|search|sub-channel',
                                        'to': '/last-mile/tools/bm-emea/eats/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|EMEA|EATS|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|EATS|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/eats/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|EMEA|EATS|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-emea/eats/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|EMEA|EATS|display|partner',
                                        'to': '/last-mile/tools/bm-emea/eats/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|EMEA|EATS|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|EMEA|EATS|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-emea/eats/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|EMEA|EATS|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-emea/eats/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|EMEA|EATS|social|sub-channel',
                                        'to': '/last-mile/tools/bm-emea/eats/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'icon': 'apac region',
                'label': 'APAC',
                'id': 'budget-management|apac',
                'content': [
                    {
                        'icon': 'hand-stop-o fa-fw',
                        'label': 'Rider',
                        'id': 'budget-management|APAC|RIDER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|APAC|RIDER|channel-overview',
                                'to': '/last-mile/tools/bm-apac/rider/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|apac|rider|country-overview',
                                'to': '/last-mile/tools/bm-apac/rider/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|APAC|RIDER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|RIDER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/rider/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|APAC|RIDER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-apac/rider/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|APAC|RIDER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-apac/rider/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|APAC|RIDER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|RIDER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/rider/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|APAC|RIDER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-apac/rider/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|APAC|RIDER|display|partner',
                                        'to': '/last-mile/tools/bm-apac/rider/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': ' fa-laptop fa-fw',
                                'label': 'Programmatic',
                                'id': 'budget-management|APAC|RIDER|programmatic',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|RIDER|programmatic|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/rider/programmatic/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|APAC|RIDER|programmatic|partner-pivot',
                                        'to': '/last-mile/tools/bm-apac/rider/programmatic/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|APAC|RIDER|programmatic|partner',
                                        'to': '/last-mile/tools/bm-apac/rider/programmatic/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|APAC|RIDER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|RIDER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/rider/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|APAC|RIDER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-apac/rider/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|APAC|RIDER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-apac/rider/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'car fa-fw',
                        'label': 'Driver',
                        'id': 'budget-management|APAC|DRIVER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|APAC|DRIVER|channel-overview',
                                'to': '/last-mile/tools/bm-apac/driver/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|apac|driver|country-overview',
                                'to': '/last-mile/tools/bm-apac/driver/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|APAC|DRIVER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|DRIVER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/driver/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|APAC|DRIVER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-apac/driver/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|APAC|DRIVER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-apac/driver/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|APAC|DRIVER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|DRIVER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/driver/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|APAC|DRIVER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-apac/driver/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|APAC|DRIVER|display|partner',
                                        'to': '/last-mile/tools/bm-apac/driver/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|APAC|DRIVER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|DRIVER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/driver/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|APAC|DRIVER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-apac/driver/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|APAC|DRIVER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-apac/driver/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'cutlery fa-fw',
                        'label': 'Eater',
                        'id': 'budget-management|APAC|EATS',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|APAC|EATS|channel-overview',
                                'to': '/last-mile/tools/bm-apac/eats/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|apac|eater|country-overview',
                                'to': '/last-mile/tools/bm-apac/eats/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|APAC|EATS|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|EATS|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/eats/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|APAC|EATS|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-apac/eats/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|APAC|EATS|search|sub-channel',
                                        'to': '/last-mile/tools/bm-apac/eats/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|APAC|EATS|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|EATS|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/eats/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|APAC|EATS|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-apac/eats/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|APAC|EATS|display|partner',
                                        'to': '/last-mile/tools/bm-apac/eats/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|APAC|EATS|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|APAC|EATS|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-apac/eats/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|APAC|EATS|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-apac/eats/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|APAC|EATS|social|sub-channel',
                                        'to': '/last-mile/tools/bm-apac/eats/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'icon': 'latam region',
                'label': 'LATAM',
                'id': 'budget-management|latam',
                'content': [
                    {
                        'icon': 'hand-stop-o fa-fw',
                        'label': 'Rider',
                        'id': 'budget-management|LATAM|RIDER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|LATAM|RIDER|channel-overview',
                                'to': '/last-mile/tools/bm-latam/rider/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|latam|rider|country-overview',
                                'to': '/last-mile/tools/bm-latam/rider/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|LATAM|RIDER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|RIDER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/rider/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|RIDER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/rider/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|RIDER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/rider/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|LATAM|RIDER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|RIDER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/rider/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|LATAM|RIDER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-latam/rider/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|LATAM|RIDER|display|partner',
                                        'to': '/last-mile/tools/bm-latam/rider/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|LATAM|RIDER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|RIDER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/rider/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|RIDER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/rider/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|RIDER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/rider/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'car fa-fw',
                        'label': 'Driver',
                        'id': 'budget-management|LATAM|DRIVER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|LATAM|DRIVER|channel-overview',
                                'to': '/last-mile/tools/bm-latam/driver/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|latam|driver|country-overview',
                                'to': '/last-mile/tools/bm-latam/driver/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|LATAM|DRIVER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|DRIVER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/driver/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|DRIVER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/driver/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|DRIVER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/driver/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|LATAM|DRIVER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|DRIVER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/driver/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|LATAM|DRIVER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-latam/driver/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|LATAM|DRIVER|display|partner',
                                        'to': '/last-mile/tools/bm-latam/driver/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|LATAM|DRIVER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|DRIVER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/driver/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|DRIVER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/driver/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|DRIVER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/driver/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'cutlery fa-fw',
                        'label': 'Eater',
                        'id': 'budget-management|LATAM|EATS',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|LATAM|EATS|channel-overview',
                                'to': '/last-mile/tools/bm-latam/eats/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|latam|eater|country-overview',
                                'to': '/last-mile/tools/bm-latam/eats/country-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|LATAM|EATS|campaign-type-overview',
                                'to': '/last-mile/tools/bm-latam/eats/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|LATAM|EATS|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|EATS|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/eats/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|EATS|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/eats/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|EATS|search|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/eats/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|LATAM|EATS|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|EATS|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/eats/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|LATAM|EATS|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-latam/eats/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|LATAM|EATS|display|partner',
                                        'to': '/last-mile/tools/bm-latam/eats/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|LATAM|EATS|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|EATS|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/eats/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|EATS|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/eats/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|EATS|social|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/eats/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'truck fa-fw',
                        'label': 'Courier',
                        'id': 'budget-management|LATAM|COURIER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|LATAM|COURIER|channel-overview',
                                'to': '/last-mile/tools/bm-latam/courier/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|latam|courier|country-overview',
                                'to': '/last-mile/tools/bm-latam/courier/country-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|LATAM|COURIER|campaign-type-overview',
                                'to': '/last-mile/tools/bm-latam/courier/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|LATAM|COURIER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|COURIER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/courier/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|COURIER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/courier/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|COURIER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/courier/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|LATAM|COURIER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|COURIER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/courier/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|LATAM|COURIER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-latam/courier/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|LATAM|COURIER|display|partner',
                                        'to': '/last-mile/tools/bm-latam/courier/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|LATAM|COURIER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|LATAM|COURIER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-latam/courier/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|LATAM|COURIER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-latam/courier/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|LATAM|COURIER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-latam/courier/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'icon': 'uscan region',
                'label': 'USCAN',
                'id': 'budget-management|uscan',
                'content': [
                    {
                        'icon': 'hand-stop-o fa-fw',
                        'label': 'Rider',
                        'id': 'budget-management|USCAN|RIDER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|USCAN|RIDER|channel-overview',
                                'to': '/last-mile/tools/bm-uscan/rider/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|uscan|rider|country-overview',
                                'to': '/last-mile/tools/bm-uscan/rider/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|USCAN|RIDER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|RIDER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/rider/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|RIDER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/rider/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|RIDER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/rider/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|USCAN|RIDER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|RIDER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/rider/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|USCAN|RIDER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-uscan/rider/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|USCAN|RIDER|display|partner',
                                        'to': '/last-mile/tools/bm-uscan/rider/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|USCAN|RIDER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|RIDER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/rider/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|RIDER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/rider/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|RIDER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/rider/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'car fa-fw',
                        'label': 'Driver',
                        'id': 'budget-management|USCAN|DRIVER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|USCAN|DRIVER|channel-overview',
                                'to': '/last-mile/tools/bm-uscan/driver/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|uscan|driver|country-overview',
                                'to': '/last-mile/tools/bm-uscan/driver/country-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|USCAN|DRIVER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|DRIVER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/driver/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|DRIVER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/driver/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|DRIVER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/driver/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|USCAN|DRIVER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|DRIVER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/driver/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|USCAN|DRIVER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-uscan/driver/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|USCAN|DRIVER|display|partner',
                                        'to': '/last-mile/tools/bm-uscan/driver/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|USCAN|DRIVER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|DRIVER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/driver/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|DRIVER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/driver/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|DRIVER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/driver/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'cutlery fa-fw',
                        'label': 'Eater',
                        'id': 'budget-management|USCAN|EATS',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|USCAN|EATS|channel-overview',
                                'to': '/last-mile/tools/bm-uscan/eats/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|uscan|eater|country-overview',
                                'to': '/last-mile/tools/bm-uscan/eats/country-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|USCAN|EATS|campaign-type-overview',
                                'to': '/last-mile/tools/bm-uscan/eats/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|USCAN|EATS|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|EATS|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/eats/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|EATS|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/eats/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|EATS|search|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/eats/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|USCAN|EATS|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|EATS|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/eats/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|USCAN|EATS|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-uscan/eats/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|USCAN|EATS|display|partner',
                                        'to': '/last-mile/tools/bm-uscan/eats/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|USCAN|EATS|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|EATS|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/eats/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|EATS|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/eats/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|EATS|social|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/eats/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'truck fa-fw',
                        'label': 'Courier',
                        'id': 'budget-management|USCAN|COURIER',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|USCAN|COURIER|channel-overview',
                                'to': '/last-mile/tools/bm-uscan/courier/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|uscan|courier|country-overview',
                                'to': '/last-mile/tools/bm-uscan/courier/country-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|USCAN|COURIER|campaign-type-overview',
                                'to': '/last-mile/tools/bm-uscan/courier/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|USCAN|COURIER|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|COURIER|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/courier/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|COURIER|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/courier/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|COURIER|search|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/courier/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|USCAN|COURIER|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|COURIER|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/courier/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|USCAN|COURIER|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-uscan/courier/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|USCAN|COURIER|display|partner',
                                        'to': '/last-mile/tools/bm-uscan/courier/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|USCAN|COURIER|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|COURIER|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/courier/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|COURIER|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/courier/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|COURIER|social|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/courier/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'icon': 'building fa-fw',
                        'label': 'U4B',
                        'id': 'budget-management|USCAN|U4B',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|USCAN|U4B|channel-overview',
                                'to': '/last-mile/tools/bm-uscan/u4b/channel-overview'
                            },
                            {
                                'label': 'Country Overview',
                                'id': 'budget-management|${REGIONS.USCAN}|${TOOLS.U4B}|country-overview',
                                'to': '/last-mile/tools/bm-uscan/u4b/country-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|USCAN|U4B|campaign-type-overview',
                                'to': '/last-mile/tools/bm-uscan/u4b/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|USCAN|U4B|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|U4B|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/u4b/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|U4B|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/u4b/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|U4B|search|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/u4b/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|USCAN|U4B|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|U4B|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/u4b/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|USCAN|U4B|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-uscan/u4b/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|USCAN|U4B|display|partner',
                                        'to': '/last-mile/tools/bm-uscan/u4b/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|USCAN|U4B|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|USCAN|U4B|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-uscan/u4b/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|USCAN|U4B|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-uscan/u4b/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|USCAN|U4B|social|sub-channel',
                                        'to': '/last-mile/tools/bm-uscan/u4b/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                'icon': 'india region',
                'label': 'INDIA',
                'id': 'budget-management|india',
                'content': [
                    {
                        'icon': 'cutlery fa-fw',
                        'label': 'Eater',
                        'id': 'budget-management|INDIA|EATS',
                        'content': [
                            {
                                'label': 'Channel Overview',
                                'id': 'budget-management|INDIA|EATS|channel-overview',
                                'to': '/last-mile/tools/bm-india/eats/channel-overview'
                            },
                            {
                                'label': 'Campaign Type Overview',
                                'id': 'budget-management|INDIA|EATS|campaign-type-overview',
                                'to': '/last-mile/tools/bm-india/eats/campaign-type-overview'
                            },
                            {
                                'icon': 'search fa-fw',
                                'label': 'Search',
                                'id': 'budget-management|INDIA|EATS|search',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|INDIA|EATS|search|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-india/eats/search/overview'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|INDIA|EATS|search|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-india/eats/search/sub-channel-pivot'
                                    },
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|INDIA|EATS|search|sub-channel',
                                        'to': '/last-mile/tools/bm-india/eats/search/sub-channel'
                                    }
                                ]
                            },
                            {
                                'icon': 'line-chart fa-fw',
                                'label': 'Display',
                                'id': 'budget-management|INDIA|EATS|display',
                                'content': [
                                    {
                                        'icon': '',
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|INDIA|EATS|display|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-india/eats/display/overview'
                                    },
                                    {
                                        'label': 'Partner Pivot',
                                        'id': 'budget-management|INDIA|EATS|display|partner-pivot',
                                        'to': '/last-mile/tools/bm-india/eats/display/partner-pivot'
                                    },
                                    {
                                        'label': 'Partner',
                                        'id': 'budget-management|INDIA|EATS|display|partner',
                                        'to': '/last-mile/tools/bm-india/eats/display/partner'
                                    }
                                ]
                            },
                            {
                                'icon': 'facebook-square fa-fw',
                                'label': 'Social',
                                'id': 'budget-management|INDIA|EATS|social',
                                'content': [
                                    {
                                        'label': 'Sub-Channel Overview',
                                        'id': 'budget-management|INDIA|EATS|social|sub-channel-overview',
                                        'to': '/last-mile/tools/bm-india/eats/social/overview'
                                    },
                                    {
                                        'label': 'Sub-Channel Pivot',
                                        'id': 'budget-management|INDIA|EATS|social|sub-channel-pivot',
                                        'to': '/last-mile/tools/bm-india/eats/social/sub-channel-pivot'
                                    },
                                    {
                                        'label': 'Sub-Channel',
                                        'id': 'budget-management|INDIA|EATS|social|sub-channel',
                                        'to': '/last-mile/tools/bm-india/eats/social/sub-channel'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        'icon': 'hourglass-half fa-fw',
        'label': 'BETA',
        'id': 'beta',
        'content': [
            {
                'icon': 'tag fa-fw',
                'label': 'Campaign Naming',
                'id': 'campaign-naming-beta',
                'to': '/campaign-naming-beta'
            },
            {
                'icon': 'sliders fa-fw',
                'label': 'Campaign Management (NEW)',
                'id': 'campaign-management-tool',
                'to': '/campaign-management-tool'
            }
        ]
    }
];

const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 260 : 64)}px;
`;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'flex' : 'none')};
    white-space: nowrap;
    background: #FFFFFF;
    color: #fff;
    align-items: center;

    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    line-height: 44px;
    padding: 10px 0;
    color: #09091A;
    font-size: 16px;
    height: 50px;
    display: flex;
    align-items: center;
`;

export default class extends PureComponent {
    state = {
        selected: 'home',
        expanded: false
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    pageTitle = {
        'home': 'Home',
        'devices': ['Devices'],
        'reports': ['Reports'],
        'settings/policies': ['Settings', 'Policies'],
        'settings/network': ['Settings', 'Network']
    };

    renderBreadcrumbs() {
        const { selected } = this.state;
        const list = ensureArray(this.pageTitle[selected]);

        return (
            <Breadcrumbs>
                {list.map((item, index) => (
                    <Breadcrumbs.Item
                        active={index === list.length - 1}
                        key={`${selected}_${index}`}
                    >
                        {item}
                    </Breadcrumbs.Item>
                ))}
            </Breadcrumbs>
        );
    }

    navigate = (pathname) => () => {
        this.setState({ selected: pathname });
    };

    render() {
        const { expanded, selected } = this.state;

        return (
            <div>
                <SideNav
                    onSelect={this.onSelect}
                    onToggle={this.onToggle}
                    expanded={this.state.expanded}
                >
                    <SideNav.Toggle />
                    <NavHeader style={{ height: '50px' }} expanded={expanded}>
                        <NavTitle>Side Navigation</NavTitle>
                    </NavHeader>
                    <SideNav.Nav selected={selected}>
                        {contentGenerator(generateContent, { expanded, onToggle: this.onToggle })}
                    </SideNav.Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
        );
    }
}
