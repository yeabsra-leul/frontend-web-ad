import { numberDigitFormatter } from "../utils";

const shopifyTotalSalesList = [
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

const shopifyTotalRefundsList = [
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

const shopifyNetSalesList = [
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

export const shopifyTotalSalesData = {
  items: shopifyTotalSalesList,
  total: numberDigitFormatter(2835.97)
};

export const shopifyTotalRefundsData = {
  items: shopifyTotalRefundsList,
  total: numberDigitFormatter(104.85)
};

export const shopifyNetSalesData = {
  items: shopifyNetSalesList,
  total: numberDigitFormatter(7877.25)
};

export interface ShopifyOrderBreakDownItem {
  id: number;
  product: string;
  variant: string;
  vendor: string;
  type: string;
  netQuantity: string;
  totalSales: string;
}

export const shopifyOrderBreakdownTableList: ShopifyOrderBreakDownItem[] = [
  {
    id: 1,
    product: 'Bertone freeclimber',
    variant: 'YunBa',
    vendor: 'Pinzgauer',
    type: 'Wheels',
    netQuantity: '23',
    totalSales: '$14,842.02'
  },
  {
    id: 2,
    product: 'FAW 6371',
    variant: 'Aliante',
    vendor: 'Altamarea',
    type: 'Mirror',
    netQuantity: '21',
    totalSales: '$13,987.04'
  },
  {
    id: 3,
    product: 'Aro 104',
    variant: 'GTR',
    vendor: 'Lamborghini',
    type: 'Wheels',
    netQuantity: '14',
    totalSales: '$12,302'
  },
  {
    id: 4,
    product: 'Dr. Motor DR5',
    variant: 'Elba',
    vendor: 'Citreon',
    type: 'Wheels',
    netQuantity: '12',
    totalSales: '$13,351'
  }
];

export interface shopifyAdBreakdownItem {
  title: string;
  value: string;
}

export const shopifyAdBreakdownList: shopifyAdBreakdownItem[] = [
  { title: 'Google Shopping Cost', value: '$254.00' },
  { title: 'FB Ads Cost Per Purchase', value: '$53.00' },
  { title: 'Snapchat Ads Purchase', value: '$40.99' },
  { title: 'Google Shopping Cost', value: '12' },
  { title: 'FB Ads Cost Per Purchase', value: '15' },
  { title: 'Snapchat Ads Purchase', value: '12' }
];

export interface shopifySalesChartItem {
  total: string;
  items: any[];
  cardTitle: string;
  chartTitle: string;
}

export const shopifySalesChartData: shopifySalesChartItem[] = [
  {
    total: shopifyTotalSalesData.total,
    items: shopifyTotalSalesData.items,
    cardTitle: 'Total Sales',
    chartTitle: 'Shopify Total Sales'
  },
  {
    total: shopifyTotalRefundsData.total,
    items: shopifyTotalRefundsData.items,
    cardTitle: 'Total Refunds',
    chartTitle: 'Shopify Total Refunds'
  },
  {
    total: shopifyNetSalesData.total,
    items: shopifyNetSalesData.items,
    cardTitle: 'Net Sales',
    chartTitle: 'Shopify Net Sales'
  }
];

export const shopifyOrderBreakdownTableColumns = [
  {
    key: 'product',
    label: 'PRODUCT'
  },
  {
    key: 'variant',
    label: 'VARIANT'
  },
  {
    key: 'vendor',
    label: 'VENDOR'
  },
  {
    key: 'type',
    label: 'TYPE'
  },
  {
    key: 'netQuantity',
    label: 'NET QUANTITY'
  },
  {
    key: 'totalSales',
    label: 'TOTAL SALES'
  }
];
