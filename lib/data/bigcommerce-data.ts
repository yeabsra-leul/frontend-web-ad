export const bigCommerceTotalSalesChartData = [
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

export const bigCommerceOrderCountChartData = [
  {
    name: 'Processing',
    sales: 38
  },
  {
    name: 'Pending',
    sales: 82
  },
  {
    name: 'Completed',
    sales: 59
  },
  {
    name: 'Cancelled',
    sales: 38
  }
];

export interface BigCommerceSalesCardItem {
  title: string;
  value: string;
}

export const bigCommerceSalesCardsList: BigCommerceSalesCardItem[] = [
  { title: 'Customer Count', value: '1,553' },
  { title: 'Total Sales', value: '$290.84K' },
  { title: 'Total Sales (exclu...)', value: '$103.84K' },
  { title: 'Subtotal Sales', value: '1,553' },
  { title: 'Shipping Charges', value: '1,553' },
  { title: 'Handling Charges', value: '1,553' },
  { title: 'Wrapping Charges', value: '1,553' },
  { title: 'Total Average', value: '$103.84K' },
  { title: 'Subtotal Average', value: '$103.84K' },
  { title: 'Discounts', value: '$290.84K' },
  { title: 'Coupons', value: '$290.84K' },
  { title: 'Refunds', value: '$290.84K' }
];
