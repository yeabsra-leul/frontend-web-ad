import { shopifySalesChartItem } from "@/lib/data/shopify-data";
import { LineChart } from '@tremor/react';
import { Card, CardHeader } from '@nextui-org/card';
import { numberDigitFormatter } from "@/lib/utils";


export const ShopifySalesLineChart = ({
    total,
    items,
    cardTitle,
    chartTitle
  }: shopifySalesChartItem) => (
    <div className="grid gap-4">
      <Card className="rounded-small shadow-none border-1.5 border-default-300 py-4 bg-gradient-to-r from-orange-400 to-orange-500">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-2xl font-bold text-white">{total}</div>
          <div className="text-muted-foreground text-white font-normal text-large">
            {cardTitle}
          </div>
        </div>
      </Card>
      <Card className="rounded-small shadow-none border-1.5 border-default-300 aspect-[6/5] object-contain">
        <CardHeader>
          <p className="font-bold text-medium text-default-500">{chartTitle} </p>
        </CardHeader>
        <div>
          <LineChart
            className="aspect-auto h-52"
            data={items}
            index="date"
            categories={['Sales']}
            colors={['indigo', 'rose']}
            valueFormatter={numberDigitFormatter}
            yAxisWidth={60}
          />
        </div>
      </Card>
    </div>
  );