'use client';
import { Card, LineChart } from '@tremor/react';

interface DataPoint {
    date: string;
    name?: string;
    [key: string]: number | string | undefined;
}
interface LineChartsProps {
    title?: string;
    subTitle?: string;
    data: any;
    categories?: string[];
    colors?: string[];
    valueFormatter?: (number: number | bigint) => string;
    showLegend?: boolean;
    showYAxis?: boolean;
    startEndOnly?: boolean;
    cardClassName?: string;
    chartClassName?: string;
    index?: string;
    props?: any
}

const defaultFormatter = (number: number | bigint) =>
    `${Intl.NumberFormat('us').format(number).toString()}`;

const LineCharts: React.FC<LineChartsProps> = ({
    title = '',
    subTitle = "",
    data,
    categories = ['Organic'],
    colors = ['blue'],
    valueFormatter = defaultFormatter,
    showLegend = false,
    showYAxis = true,
    startEndOnly = true,
    cardClassName = 'sm:mx-auto sm:max-w-md text-center',
    chartClassName = 'mt-6 h-32',
    index = "date",
    props
}) => {
    return (
        <Card className={cardClassName}>
            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {title}
            </h3>
            <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {subTitle}
            </h3>
            <LineChart
                {...props}
                data={data}
                index={index}
                categories={categories}
                colors={colors}
                valueFormatter={valueFormatter}
                showLegend={showLegend}
                showYAxis={showYAxis}
                startEndOnly={startEndOnly}
                className={chartClassName}
            />
        </Card>
    );
};

export default LineCharts;
