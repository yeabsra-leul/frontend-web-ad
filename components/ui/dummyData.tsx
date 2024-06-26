export const data = [
    {
        date: 'Jan 23',
        Google: 232,
        Sponsored: 0,
        Affiliate: 49,
        filterDate: '23/01/2023'
    },
    {
        date: 'Feb 23',
        Google: 241,
        Sponsored: 0,
        Affiliate: 61,
        filterDate: '23/02/2023'
    },
    {
        date: 'Mar 23',
        Google: 291,
        Sponsored: 0,
        Affiliate: 55,
        filterDate: '23/03/2023'
    },
    {
        date: 'Apr 23',
        Google: 101,
        Sponsored: 0,
        Affiliate: 21,
        filterDate: '23/04/2023'
    },
    {
        date: 'May 23',
        Google: 318,
        Sponsored: 0,
        Affiliate: 66,
        filterDate: '23/05/2023'
    },
    {
        date: 'Jun 23',
        Google: 205,
        Sponsored: 0,
        Affiliate: 69,
        filterDate: '23/06/2023'
    },
    {
        date: 'Jul 23',
        Google: 372,
        Sponsored: 0,
        Affiliate: 55,
        filterDate: '23/07/2023'
    },
    {
        date: 'Aug 23',
        Google: 341,
        Sponsored: 0,
        Affiliate: 74,
        filterDate: '23/08/2023'
    },
    {
        date: 'Sep 23',
        Google: 387,
        Sponsored: 120,
        Affiliate: 190,
        filterDate: '23/09/2023'
    },
    {
        date: 'Oct 23',
        Google: 220,
        Sponsored: 0,
        Affiliate: 89,
        filterDate: '23/10/2023'
    },
    {
        date: 'Nov 23',
        Google: 372,
        Sponsored: 0,
        Affiliate: 144,
        filterDate: '23/11/2023'
    },
    {
        date: 'Dec 23',
        Google: 421,
        Sponsored: 0,
        Affiliate: 93,
        filterDate: '23/12/2023'
    },
];


interface DashboardData {
    filter(arg0: (entry: any) => boolean): unknown;
    impressions: {
        date: Date;
        impressions: number;
    }[];
    clicks: {
        date: Date;
        clicks: number;
    }[];
    amountSpent: {
        date: Date;
        amountSpent: number;
    }[];
    conversions: {
        month: string;
        conversions: number;
    }[];
    topChannels: {
        campaign: string;
        impressions: number;
        clicks: number;
        conversions: number;
    }[];
    topKeywords: {
        category: string;
        items: {
            name: string;
            value: number;
        }[];
    }[];
    topDestinationUrl: {
        url: string;
        clicks: number;
    }[];
    clicksByDate: {
        date: Date;
        clicks: number;
    }[];
}

export const demoData: DashboardData = {
    impressions: [
        {
            date: new Date("2023-01-01"),
            impressions: 100000,
        },
        {
            date: new Date("2023-02-07"),
            impressions: 200000,
        },
        {
            date: new Date("2023-02-14"),
            impressions: 150000,
        },
        {
            date: new Date("2023-02-21"),
            impressions: 180000,
        },
        {
            date: new Date("2023-02-28"),
            impressions: 220000,
        },
    ],
    clicks: [
        {
            date: new Date("2023-01-01"),
            clicks: 1000,
        },
        {
            date: new Date("2023-02-07"),
            clicks: 2000,
        },
        {
            date: new Date("2023-02-14"),
            clicks: 1500,
        },
        {
            date: new Date("2023-02-21"),
            clicks: 1800,
        },
        {
            date: new Date("2023-02-28"),
            clicks: 2200,
        },
    ],
    amountSpent: [
        {
            date: new Date("2023-01-01"),
            amountSpent: 100,
        },
        {
            date: new Date("2023-02-07"),
            amountSpent: 200,
        },
        {
            date: new Date("2023-02-14"),
            amountSpent: 150,
        },
        {
            date: new Date("2023-02-21"),
            amountSpent: 180,
        },
        {
            date: new Date("2023-02-28"),
            amountSpent: 220,
        },
    ],
    conversions: [
        {
            month: "January",
            conversions: 50,
        },
        {
            month: "February",
            conversions: 50,
        },
    ],
    topChannels: [
        {
            campaign: "Campaign 1",
            impressions: 1000,
            clicks: 1000,
            conversions: 100,
        },
        {
            campaign: "Campaign 2",
            impressions: 800,
            clicks: 800,
            conversions: 800,
        },
        {
            campaign: "Campaign 3",
            impressions: 600,
            clicks: 600,
            conversions: 600,
        },
    ],
    topKeywords: [
        {
            category: "Category 1",
            items: [
                {
                    name: "Keyword 1",
                    value: 1000,
                },
                {
                    name: "Keyword 2",
                    value: 800,
                },
                {
                    name: "Keyword 3",
                    value: 600,
                },
            ],
        },
        {
            category: "Category 2",
            items: [
                {
                    name: "Keyword 4",
                    value: 500,
                },
                {
                    name: "Keyword 5",
                    value: 400,
                },
                {
                    name: "Keyword 6",
                    value: 300,
                },
            ],
        },
    ],
    topDestinationUrl: [
        {
            url: "/packaging-machines/",
            clicks: 300,
        },
        {
            url: "/packaging-machines/amax-series-traysealers/",
            clicks: 200,
        },
        {
            url: "/distributors/",
            clicks: 100,
        },
    ],
    clicksByDate: [
        {
            date: new Date("2023-01-11"),
            clicks: 250,
        },
        {
            date: new Date("2023-01-12"),
            clicks: 230,
        },
        {
            date: new Date("2023-01-13"),
            clicks: 210,
        },
        {
            date: new Date("2023-01-14"),
            clicks: 200,
        },
        {
            date: new Date("2023-01-15"),
            clicks: 220,
        },
    ],
    filter: function (arg0: (entry: any) => boolean): unknown {
        throw new Error("Function not implemented.");
    }
};

export const pages = [
    {
        name: 'https://www.tesla.com',
        value: 2019,
    },
    {
        name: 'https://mi-tech.ca',
        value: 1053,
    },
    {
        name: 'https://abhaitech.com',
        value: 997,
    }
];


export const keyWords = [
    {
        name: 'Open AI',
        value: 2019,
    },
    {
        name: 'Live Bots',
        value: 1053,
    },
    {
        name: 'web3',
        value: 997,
    }
];

export const campaignsData = [
    {
        id: 1,
        name: "Google Shopping",
        impressions: 12345,
        clicks: 1234,
        connections: 123,
    },
    {
        id: 2,
        name: "Google Ads",
        impressions: 23456,
        clicks: 2345,
        connections: 234,
    },
    {
        id: 3,
        name: "Holiday Promo",
        impressions: 34567,
        clicks: 3456,
        connections: 345,
    }
];
export const BarData = [
    {
        age: '22-24',
        'This Year': 68560,
    },
    {
        age: '24-25',
        'This Year': 80233,
    },
    {
        age: '25-26',
        'This Year': 55123,
    },
    {
        age: '26-27',
        'This Year': 56000,
    }
];

export const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
    { key: "lion", label: "Lion" },
    { key: "tiger", label: "Tiger" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" }
];

export const Reports = [
    { key: "view_through_rates", label: "View Through Rates" },
    { key: "avg_cpc", label: "Avg CPC" },
    { key: "clicks", label: "Clicks" },
    { key: "conversion_rate", label: "Conversion Rate" },
    { key: "connection", label: "Connection" },
    { key: "cost", label: "Cost" },
    { key: "cost_conversion", label: "Cost/Conversion" },
    { key: "impression", label: "Impression" }
];

export const Channels = [
    { key: "google_ads", label: "Google Ads" },
    { key: "facebook", label: "Facebook" },
    { key: "instagram", label: "Instgram" },
    { key: "linkedin", label: "Linkedin" }
];
export const Campaigns = [{ key: "summer_sale", label: "Summer Sale" },
{ key: "holiday_sale", label: "Holiday Sale" },
{ key: "instagram_sale", label: "Instgram Sale" },
{ key: "linkedin_sale", label: "Linkedin Sale" }]

export const ChartData = [
    {
        channel: "linkedin",
        campaign: "instagram_sale",
        filterDate: "14/08/2023",
        date: "Aug 14",
        view_through_rates: 0.82,
        avg_cpc: 8.44,
        clicks: 618,
        conversion_rate: 36.84,
        connection: 321,
        cost: 534.25,
        cost_conversion: 45.77,
        impression: 7495
    },
    {
        channel: "google_ads",
        campaign: "summer_sale",
        filterDate: "23/03/2023",
        date: "Mar 23",
        view_through_rates: 0.37,
        avg_cpc: 5.81,
        clicks: 276,
        conversion_rate: 53.18,
        connection: 888,
        cost: 896.43,
        cost_conversion: 35.97,
        impression: 5917
    },
    {
        channel: "facebook",
        campaign: "holiday_sale",
        filterDate: "05/11/2023",
        date: "Nov 5",
        view_through_rates: 0.91,
        avg_cpc: 2.75,
        clicks: 124,
        conversion_rate: 73.85,
        connection: 997,
        cost: 683.67,
        cost_conversion: 11.24,
        impression: 3095
    },
    {
        channel: "instagram",
        campaign: "linkedin_sale",
        filterDate: "30/06/2023",
        date: "Jun 30",
        view_through_rates: 0.34,
        avg_cpc: 9.12,
        clicks: 946,
        conversion_rate: 26.57,
        connection: 361,
        cost: 429.55,
        cost_conversion: 52.73,
        impression: 8645
    },
    {
        channel: "linkedin",
        campaign: "holiday_sale",
        filterDate: "12/12/2023",
        date: "Dec 12",
        view_through_rates: 0.78,
        avg_cpc: 7.63,
        clicks: 471,
        conversion_rate: 15.82,
        connection: 648,
        cost: 354.62,
        cost_conversion: 76.82,
        impression: 2690
    },
    {
        channel: "google_ads",
        campaign: "instagram_sale",
        filterDate: "19/09/2023",
        date: "Sep 19",
        view_through_rates: 0.29,
        avg_cpc: 1.44,
        clicks: 513,
        conversion_rate: 66.19,
        connection: 267,
        cost: 943.12,
        cost_conversion: 14.75,
        impression: 3991
    },
    {
        channel: "facebook",
        campaign: "linkedin_sale",
        filterDate: "08/04/2023",
        date: "Apr 8",
        view_through_rates: 0.67,
        avg_cpc: 4.26,
        clicks: 705,
        conversion_rate: 21.54,
        connection: 146,
        cost: 532.88,
        cost_conversion: 68.77,
        impression: 1653
    },
    {
        channel: "instagram",
        campaign: "summer_sale",
        filterDate: "15/07/2023",
        date: "Jul 15",
        view_through_rates: 0.56,
        avg_cpc: 6.75,
        clicks: 487,
        conversion_rate: 10.93,
        connection: 523,
        cost: 629.47,
        cost_conversion: 37.92,
        impression: 7325
    },
    {
        channel: "linkedin",
        campaign: "holiday_sale",
        filterDate: "27/10/2023",
        date: "Oct 27",
        view_through_rates: 0.23,
        avg_cpc: 8.11,
        clicks: 352,
        conversion_rate: 94.73,
        connection: 819,
        cost: 913.82,
        cost_conversion: 88.24,
        impression: 5861
    },
    {
        channel: "google_ads",
        campaign: "summer_sale",
        filterDate: "22/02/2023",
        date: "Feb 22",
        view_through_rates: 0.85,
        avg_cpc: 3.17,
        clicks: 283,
        conversion_rate: 50.82,
        connection: 964,
        cost: 876.26,
        cost_conversion: 43.57,
        impression: 7952
    },
    {
        channel: "facebook",
        campaign: "holiday_sale",
        filterDate: "03/10/2023",
        date: "Oct 3",
        view_through_rates: 0.42,
        avg_cpc: 1.68,
        clicks: 235,
        conversion_rate: 35.19,
        connection: 372,
        cost: 142.85,
        cost_conversion: 92.51,
        impression: 3612
    },
    {
        channel: "instagram",
        campaign: "linkedin_sale",
        filterDate: "28/11/2023",
        date: "Nov 28",
        view_through_rates: 0.51,
        avg_cpc: 2.74,
        clicks: 592,
        conversion_rate: 48.17,
        connection: 516,
        cost: 982.35,
        cost_conversion: 36.89,
        impression: 6801
    },
    {
        channel: "linkedin",
        campaign: "summer_sale",
        filterDate: "07/06/2023",
        date: "Jun 7",
        view_through_rates: 0.38,
        avg_cpc: 5.13,
        clicks: 158,
        conversion_rate: 12.85,
        connection: 407,
        cost: 645.25,
        cost_conversion: 23.87,
        impression: 5127
    },
    {
        channel: "google_ads",
        campaign: "instagram_sale",
        filterDate: "18/01/2023",
        date: "Jan 18",
        view_through_rates: 0.16,
        avg_cpc: 7.94,
        clicks: 634,
        conversion_rate: 82.49,
        connection: 701,
        cost: 364.25,
        cost_conversion: 87.12,
        impression: 9192
    },
    {
        channel: "facebook",
        campaign: "linkedin_sale",
        filterDate: "25/05/2023",
        date: "May 25",
        view_through_rates: 0.62,
        avg_cpc: 9.51,
        clicks: 512,
        conversion_rate: 29.58,
        connection: 169,
        cost: 278.36,
        cost_conversion: 32.45,
        impression: 7410
    },
    {
        channel: "instagram",
        campaign: "holiday_sale",
        filterDate: "13/09/2023",
        date: "Sep 13",
        view_through_rates: 0.58,
        avg_cpc: 1.95,
        clicks: 475,
        conversion_rate: 93.12,
        connection: 549,
        cost: 782.14,
        cost_conversion: 94.52,
        impression: 8365
    },
    {
        channel: "linkedin",
        campaign: "summer_sale",
        filterDate: "21/03/2023",
        date: "Mar 21",
        view_through_rates: 0.77,
        avg_cpc: 6.28,
        clicks: 591,
        conversion_rate: 79.13,
        connection: 333,
        cost: 217.48,
        cost_conversion: 63.98,
        impression: 4731
    },
    {
        channel: "google_ads",
        campaign: "holiday_sale",
        filterDate: "04/08/2023",
        date: "Aug 4",
        view_through_rates: 0.59,
        avg_cpc: 4.19,
        clicks: 683,
        conversion_rate: 42.51,
        connection: 938,
        cost: 157.93,
        cost_conversion: 79.45,
        impression: 2895
    },
    {
        channel: "facebook",
        campaign: "instagram_sale",
        filterDate: "29/07/2023",
        date: "Jul 29",
        view_through_rates: 0.43,
        avg_cpc: 3.11,
        clicks: 256,
        conversion_rate: 54.32,
        connection: 788,
        cost: 973.61,
        cost_conversion: 22.91,
        impression: 6571
    },
    {
        channel: "linkedin",
        campaign: "instagram_sale",
        filterDate: "09/12/2023",
        date: "Dec 9",
        view_through_rates: 0.71,
        avg_cpc: 3.88,
        clicks: 412,
        conversion_rate: 62.19,
        connection: 692,
        cost: 428.15,
        cost_conversion: 18.34,
        impression: 4378
    },
    {
        channel: "google_ads",
        campaign: "holiday_sale",
        filterDate: "16/05/2023",
        date: "May 16",
        view_through_rates: 0.63,
        avg_cpc: 2.93,
        clicks: 319,
        conversion_rate: 18.45,
        connection: 569,
        cost: 548.77,
        cost_conversion: 25.61,
        impression: 6093
    },
    {
        channel: "facebook",
        campaign: "summer_sale",
        filterDate: "10/11/2023",
        date: "Nov 10",
        view_through_rates: 0.39,
        avg_cpc: 6.82,
        clicks: 548,
        conversion_rate: 27.91,
        connection: 388,
        cost: 374.56,
        cost_conversion: 47.89,
        impression: 5176
    },
    {
        channel: "instagram",
        campaign: "holiday_sale",
        filterDate: "20/01/2023",
        date: "Jan 20",
        view_through_rates: 0.45,
        avg_cpc: 5.64,
        clicks: 129,
        conversion_rate: 39.27,
        connection: 236,
        cost: 742.89,
        cost_conversion: 53.48,
        impression: 4243
    },
    {
        channel: "linkedin",
        campaign: "linkedin_sale",
        filterDate: "17/09/2023",
        date: "Sep 17",
        view_through_rates: 0.81,
        avg_cpc: 4.72,
        clicks: 256,
        conversion_rate: 16.82,
        connection: 419,
        cost: 271.58,
        cost_conversion: 62.45,
        impression: 1965
    },
    {
        channel: "google_ads",
        campaign: "instagram_sale",
        filterDate: "08/02/2023",
        date: "Feb 8",
        view_through_rates: 0.48,
        avg_cpc: 3.27,
        clicks: 752,
        conversion_rate: 45.29,
        connection: 524,
        cost: 681.34,
        cost_conversion: 38.65,
        impression: 3981
    },
    {
        channel: "facebook",
        campaign: "summer_sale",
        filterDate: "14/06/2023",
        date: "Jun 14",
        view_through_rates: 0.74,
        avg_cpc: 9.24,
        clicks: 415,
        conversion_rate: 60.88,
        connection: 791,
        cost: 932.47,
        cost_conversion: 86.21,
        impression: 7695
    },
    {
        channel: "instagram",
        campaign: "linkedin_sale",
        filterDate: "12/04/2023",
        date: "Apr 12",
        view_through_rates: 0.54,
        avg_cpc: 7.19,
        clicks: 618,
        conversion_rate: 81.35,
        connection: 398,
        cost: 523.55,
        cost_conversion: 47.83,
        impression: 5982
    }
];




export const chartsMetaData = [
    {
        title: "View Through Rates",
        subTitle: "$231",
        categories: ["view_through_rates"],
        colors: ["blue"],
    },
    {
        title: "Avg CPC",
        subTitle: "$231",
        categories: ["avg_cpc"],
        colors: ["blue"],
    },
    {
        title: "Clicks",
        subTitle: "231",
        categories: ["clicks"],
        colors: ["blue"],
    },
    {
        title: "Conversion Rate",
        subTitle: "99%",
        categories: ["conversion_rate"],
        colors: ["blue"],
    },
    {
        title: "Connection",
        subTitle: "1,231",
        categories: ["connection"],
        colors: ["blue"],
    },
    {
        title: "Cost",
        subTitle: "$300.15",
        categories: ["cost"],
        colors: ["blue"],
    },
    {
        title: "Cost/Conversion",
        subTitle: "$231",
        categories: ["cost_conversion"],
        colors: ["blue"],
    },
    {
        title: "Impression",
        subTitle: "923",
        categories: ["impression"],
        colors: ["blue"],
    },
];

export const chartsSet1 = [
    {
        title: "Connection",
        subTitle: "1,231",
        categories: ["connection"],
        colors: ["blue"],
    },
    {
        title: "Cost",
        subTitle: "$300.15",
        categories: ["cost"],
        colors: ["blue"],
    },
    {
        title: "Cost/Conversion",
        subTitle: "$231",
        categories: ["cost_conversion"],
        colors: ["blue"],
    },
    {
        title: "Impression",
        subTitle: "923",
        categories: ["impression"],
        colors: ["blue"],
    },
];