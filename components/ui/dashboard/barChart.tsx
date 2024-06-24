
import { BarChart, Card, Divider} from '@tremor/react';

const data = [
    {
        age: '22-24',
        'This Year': 68560,
    },

    {
        age: '24-25',
        'This Year': 80233,

    },
    {
        age: '25-26',
        'This Year': 55123,

    },
    {
        age: '26-27',
        'This Year': 56000,

    }
];

function valueFormatter(number: any) {
    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short',
        style: 'currency',
        currency: 'USD',
    });

    return  number;
}

export default function BarCharts() {
    return (
        <>
            <Card className="sm:mx-auto sm:max-w-2xl">
                <h3 className="ml-1 mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Clicks
                </h3>

                <BarChart
                    data={data}
                    index="age"
                    categories={
                        ['This Year']
                    }
                    colors={['blue']}
                    valueFormatter={valueFormatter}
                    yAxisWidth={45}
                    className="mt-6 hidden h-60 sm:block"
                />
                <Divider />
            </Card>
        </>
    );
}
