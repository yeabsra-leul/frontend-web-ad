'use client';

import { Tabs, Tab } from '@nextui-org/react';
import ShopifyTab from './shopify-tab';
import WooCommerceTab from './woocommerce-tab';
import BigCommerceTab from './bigcommerce-tab';

export function EcommerceTabs() {
  return (
    <div className="grid gap-12 p-4 md:p-8">
      <div className="flex justify-center flex-col gap-4">
        <Tabs aria-label="Ecommerce options">
          <Tab key="shopify" title="Shopify">
            <ShopifyTab />
          </Tab>
          <Tab key="woocommerce" title="WooCommerce ">
            <WooCommerceTab />
          </Tab>
          <Tab key="bigcommerce" title="BigCommerce">
            <BigCommerceTab />
          </Tab>
          <Tab key="all" title=" All " className="grid grid-cols-1">
            <p className="text-default-600 font-semibold text-large py-4 underline underline-offset-8">
              Shopify
            </p>
            <ShopifyTab />
            <p className="text-default-600 font-semibold text-large pt-16 pb-8 underline underline-offset-8">
              WooCommerce
            </p>
            <WooCommerceTab />
            <p className="text-default-600 font-semibold text-large pt-16 pb-8 underline underline-offset-8">
              BigCommerce
            </p>
            <BigCommerceTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
