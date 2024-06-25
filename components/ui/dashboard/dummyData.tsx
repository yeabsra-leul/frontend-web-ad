export const data = [
    {
        date: 'Jan 23',
        Google: 232,
        Sponsored: 0,
        Affiliate: 49,
        filterDate:'23/01/2023'
    },
    {
        date: 'Feb 23',
        Google: 241,
        Sponsored: 0,
        Affiliate: 61,
        filterDate:'23/02/2023'
    },
    {
        date: 'Mar 23',
        Google: 291,
        Sponsored: 0,
        Affiliate: 55,
        filterDate:'23/03/2023'
    },
    {
        date: 'Apr 23',
        Google: 101,
        Sponsored: 0,
        Affiliate: 21,
         filterDate:'23/04/2023'
    },
    {
        date: 'May 23',
        Google: 318,
        Sponsored: 0,
        Affiliate: 66,
         filterDate:'23/05/2023'
    },
    {
        date: 'Jun 23',
        Google: 205,
        Sponsored: 0,
        Affiliate: 69,
         filterDate:'23/06/2023'
    },
    {
        date: 'Jul 23',
        Google: 372,
        Sponsored: 0,
        Affiliate: 55,
        filterDate:'23/07/2023'
    },
    {
        date: 'Aug 23',
        Google: 341,
        Sponsored: 0,
        Affiliate: 74,
        filterDate:'23/08/2023'
    },
    {
        date: 'Sep 23',
        Google: 387,
        Sponsored: 120,
        Affiliate: 190,
          filterDate:'23/09/2023'
    },
    {
        date: 'Oct 23',
        Google: 220,
        Sponsored: 0,
        Affiliate: 89,
          filterDate:'23/10/2023'
    },
    {
        date: 'Nov 23',
        Google: 372,
        Sponsored: 0,
        Affiliate: 144,
          filterDate:'23/11/2023'
    },
    {
        date: 'Dec 23',
        Google: 421,
        Sponsored: 0,
        Affiliate: 93,
          filterDate:'23/12/2023'
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