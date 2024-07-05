'use client';

import React from 'react';
import { Card, CardHeader } from '@nextui-org/card';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue
} from '@nextui-org/react';
import {
  ShopifyOrderBreakDownItem,
  shopifyAdBreakdownItem,
  shopifyAdBreakdownList,
  shopifyOrderBreakdownTableColumns,
  shopifyOrderBreakdownTableList,
  shopifySalesChartData,
  shopifySalesChartItem
} from '@/lib/data/shopify-data';
import { Tooltip } from '@nextui-org/react';
import { AdBreakdownCard } from './ad-breakdown-chart';
import { ShopifySalesLineChart } from './shopify-sales-line-chart';


const ShopifyTab = () => {
  return (
    <div className="grid gap-8">
      <Card className="rounded-small shadow-none text-medium font-semibold py-2 px-4 border-2 border-default-300">
        <CardHeader>
          <p>Shopify Sales Breakdown</p>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {shopifySalesChartData.map((data: shopifySalesChartItem) => (
          <ShopifySalesLineChart
            key={data.cardTitle}
            total={data.total}
            items={data.items}
            cardTitle={data.cardTitle}
            chartTitle={data.chartTitle}
          />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col gap-8 col-span-12 md:col-span-7">
          <Card className="rounded-small shadow-none text-medium font-semibold py-2 px-4 border-2 border-default-300">
            <CardHeader>
              <p>Shopify Order Breakdown</p>
            </CardHeader>
          </Card>
          <Table
            color="primary"
            selectionMode="single"
            defaultSelectedKeys={['2']}
            aria-label="Shopify order breakdown table"
            classNames={{
              table: 'min-h-[200px]',
              wrapper:
                'rounded-small shadow-none border-1.5 border-default-300 overflow-x-hidden'
            }}
          >
            <TableHeader columns={shopifyOrderBreakdownTableColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={shopifyOrderBreakdownTableList}
              emptyContent={'No breakdowns to display.'}
            >
              {(item: ShopifyOrderBreakDownItem) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-24">
                      <Tooltip
                        content={
                          <div className="px-1 rounded-small">
                            <div className="text-small">
                              {getKeyValue(item, columnKey)}
                            </div>
                          </div>
                        }
                      >
                        <span className="max-w-24">
                          {getKeyValue(item, columnKey)}
                        </span>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="gap-8 col-span-12 md:col-span-5 flex flex-col">
          <Card className="rounded-small shadow-none text-medium font-semibold py-2 px-4 border-2 border-default-300">
            <CardHeader>
              <p>E-commerce advertising breakdown</p>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-3 gap-4">
            {shopifyAdBreakdownList.map((item: shopifyAdBreakdownItem) => (
              <AdBreakdownCard
                key={item.title}
                cardTitle={item.title}
                value={item.value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopifyTab;

