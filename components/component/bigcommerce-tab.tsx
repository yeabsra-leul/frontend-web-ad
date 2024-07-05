import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { LineChart } from '@tremor/react';
import { DonutChart, Legend } from '@tremor/react';
import {
  BigCommerceSalesCardItem,
  bigCommerceOrderCountChartData,
  bigCommerceSalesCardsList,
  bigCommerceTotalSalesChartData
} from '@/lib/data/bigcommerce-data';
import { numberDigitFormatter } from '@/lib/utils';

const BigCommerceTab = () => {

  return (
    <div className="grid gap-6 grid-cols-12">
      <Card className="rounded-small shadow-none border-1.5 border-default-300 px-4 col-span-12 lg:col-span-6">
        <CardHeader>
          <p className="font-bold text-medium text-default-500 flex justify-between w-full">
            <span>Total Sales</span>
            <span>$290.84K</span>
          </p>
        </CardHeader>
        <div>
          <LineChart
            className="aspect-auto h-52"
            data={bigCommerceTotalSalesChartData}
            index="date"
            categories={['Sales']}
            colors={['indigo', 'rose']}
            valueFormatter={numberDigitFormatter}
            yAxisWidth={60}
          />
        </div>
      </Card>
      <Card className="rounded-small shadow-none border-1.5 border-default-300 px-4 col-span-12 lg:col-span-6">
        <CardHeader>
          <p className="font-bold text-medium text-default-500">Order Count </p>
        </CardHeader>
        <div className="flex items-center justify-center w-full gap-8">
          <DonutChart
            data={bigCommerceOrderCountChartData}
            category="sales"
            index="name"
            colors={['blue-400', 'cyan-400', 'green-400', 'orange-400']}
            className="w-56 h-64 font-bold text-3xl text-default-500"
          />
          <Legend
            categories={['Processing', 'Pending', 'Completed', 'Cancelled']}
            colors={['blue-400', 'cyan-400', 'green-400', 'orange-400']}
            className="h-32 w-36"
          />
        </div>
      </Card>
      <div className="col-span-12 md:col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {bigCommerceSalesCardsList.map((data: BigCommerceSalesCardItem) => (
          <Card
            key={data.title}
            className="rounded-small shadow-none text-medium font-semibold border-1.5 border-default-300 w-36"
          >
            <CardHeader>
              <p className="text-muted-foreground font-bold text-default-500 text-xs text-nowrap text-ellipsis whitespace-nowrap">
                {data.title}
              </p>
            </CardHeader>
            <CardBody>
              <p className="text-xl font-bold text-default- text-center">
                {data.value}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BigCommerceTab;
