import React from 'react';
import { BarChart, Card, Divider } from '@tremor/react';

interface BarChartProps {
    data: { [key: string]: any }[];
    index?: string;
    title?: string;
    categories?: string[];
    colors?: string[];
    valueFormatter?: (number: number) => string;
    yAxisWidth?: number;
    className?: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({
    title = "",
    data,
    index = 'age',
    categories = ['This Year'],
    colors = ['blue'],
    valueFormatter,
    yAxisWidth = 45,
    className = '',
}) => {
    return (
        <Card className={`sm:mx-auto sm:max-w-2xl ${className}`}>
            <div className="flex items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {title}
                </p>
            </div>
            <BarChart
                data={data}
                index={index}
                categories={categories}
                colors={colors}
                valueFormatter={valueFormatter}
                yAxisWidth={yAxisWidth}
                className="mt-6 hidden h-60 sm:block"
            />
            <Divider />
        </Card>
    );
};

export default BarChartComponent;
