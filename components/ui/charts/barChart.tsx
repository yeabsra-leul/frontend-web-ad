import React from 'react';
import { BarChart, Card, Divider } from '@tremor/react';

interface BarChartProps {
    data: { [key: string]: any }[];
    indexKey?: string;
    categoryKeys?: string[];
    colors?: string[];
    valueFormatter?: (number: number) => string;
    yAxisWidth?: number;
    className?: string;
}

const BarChartComponent: React.FC<BarChartProps> = ({
    data,
    indexKey = 'age',
    categoryKeys = ['This Year'],
    colors = ['blue'],
    valueFormatter,
    yAxisWidth = 45,
    className = '',
}) => {
    return (
        <Card className={`sm:mx-auto sm:max-w-2xl ${className}`}>
            <BarChart
                data={data}
                index={indexKey}
                categories={categoryKeys}
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
