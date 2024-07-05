import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { LineChart } from '@tremor/react';
import { BarList } from '@tremor/react';
import {
  WooCommerceSalesCardItem,
  wooCommerceSalesCardsList,
  wooCommerceTopProductsData,
  wooCommerceTotalSalesChartData
} from '@/lib/data/woocommerce-data';
import { numberDigitFormatter } from '@/lib/utils';

const WooCommerceTab = () => {

  return (
    <div className="grid gap-6">
      <div className="flex gap-4 flex-wrap">
        {wooCommerceSalesCardsList.map((data: WooCommerceSalesCardItem) => (
          <Card
            key={data.cardTitle}
            className="rounded-small shadow-none text-medium font-semibold border-1.5 border-default-300 h-fit pl-1 pr-3 pb-6 min-w-44"
          >
            <CardHeader>
              <p className="text-muted-foreground font-bold text-default-500 text-small">
                {data.cardTitle}
              </p>
            </CardHeader>
            <CardBody>
              <p className="text-3xl font-bold text-default- text-center">
                {data.value}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
      <Card className="rounded-small shadow-none border-1.5 border-default-300 px-4">
        <CardHeader>
          <p className="font-bold text-medium text-default-500 flex justify-between w-full">
            <span>Total Sales</span>
            <span>$235.42K</span>
          </p>
        </CardHeader>
        <div>
          <LineChart
            className="aspect-auto h-52"
            data={wooCommerceTotalSalesChartData}
            index="date"
            categories={['Sales']}
            colors={['indigo', 'rose']}
            valueFormatter={numberDigitFormatter}
            yAxisWidth={60}
          />
        </div>
      </Card>
      <Card className="rounded-small shadow-none border-1.5 border-default-300 px-6 py-4 flex flex-col gap-6">
        <p className="font-bold text-medium text-default-500">
          Top Products Sold
        </p>
        <BarList
          data={wooCommerceTopProductsData}
          className="mt-2 font-semibold"
        />
      </Card>
    </div>
  );
};

export default WooCommerceTab;
