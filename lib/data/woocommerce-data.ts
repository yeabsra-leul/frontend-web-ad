export const wooCommerceTotalSalesChartData = [
  {
    date: 'Jan 22',
    Sales: 2890
  },
  {
    date: 'Feb 22',
    Sales: 2756
  },
  {
    date: 'Mar 22',
    Sales: 3322
  },
  {
    date: 'Apr 22',
    Sales: 3470
  },
  {
    date: 'May 22',
    Sales: 3475
  },
  {
    date: 'Jun 22',
    Sales: 3129
  },
  {
    date: 'Jul 22',
    Sales: 3490
  },
  {
    date: 'Aug 22',
    Sales: 2903
  },
  {
    date: 'Sep 22',
    Sales: 2643
  },
  {
    date: 'Oct 22',
    Sales: 2837
  },
  {
    date: 'Nov 22',
    Sales: 2954
  },
  {
    date: 'Dec 22',
    Sales: 3239
  }
];
export const wooCommerceTotalSales = wooCommerceTotalSalesChartData.reduce(
  (acc, item) => acc + item.Sales,
  0
);

export const wooCommerceTopProductsData = [
  {
    name: 'Mercedes-Benz GL 63 AMG',
    value: 79
  },
  {
    name: 'Hyundai Genesis',
    value: 56
  },
  {
    name: 'McLaren P1',
    value: 55
  },
  {
    name: 'Sidetracker 418',
    value: 54
  }
];

export interface WooCommerceSalesCardItem {
  cardTitle: string;
  value: string;
}

export const wooCommerceSalesCardsList: WooCommerceSalesCardItem[] = [
  {
    cardTitle: 'Total Sales',
    value: '$235.42K'
  },
  {
    cardTitle: 'Customers',
    value: '1090'
  },
  {
    cardTitle: 'Average Sales',
    value: '$77.75'
  }
];
