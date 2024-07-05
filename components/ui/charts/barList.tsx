import { BarList, Card } from '@tremor/react';
import { useState } from 'react';

interface PageData {
    name: string;
    value: number;
}

interface BarListChartProps {
    title?: string;
    data: PageData[];
    initialExtended?: boolean;
    valueFormatter?: (number: number | bigint) => string;
    maxCollapsedHeight?: string;
    cardClassName?: string;
    contentClassName?: string;
    buttonClassName?: string;
}

const defaultFormatter = (number: number | bigint) => { return number };

const BarListChart: React.FC<BarListChartProps> = ({
    title = 'Top Destination Url',
    data,
    initialExtended = false,
    valueFormatter = defaultFormatter,
    maxCollapsedHeight = 'max-h-[260px]',
    cardClassName = 'p-0 sm:mx-auto sm:max-w-lg',
    contentClassName = 'overflow-hidden p-6'
}) => {
    const [extended, setExtended] = useState(initialExtended);
    return (
        <Card className={cardClassName}>
            <div className="flex items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {title}
                </p>
            </div>
            <div className={`${contentClassName} ${extended ? '' : maxCollapsedHeight}`}>
                <BarList data={data} valueFormatter={valueFormatter} />
            </div>
        </Card>
    );
};

export default BarListChart;
