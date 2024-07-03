
import { Card, DonutChart, List, ListItem } from '@tremor/react';

const currencyFormatter = (number: any) => {
    return number
};
function classNames(...classes: any) { return classes.filter(Boolean).join(' '); }

export default function Example(props: any) {
    return (
        <>
            <Card className="sm:mx-auto sm:max-w-lg">
                <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {props.title}
                </h3>
                <DonutChart
                    className="mt-8"
                    data={props?.data}
                    category="total"
                    index="name"
                    variant="pie"
                    valueFormatter={currencyFormatter}
                    showTooltip={true}
                    showLabel={true}
                />
                <p className="mt-8 flex items-center justify-between text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                    <span>Category</span>
                    <span>Total/Share</span>
                </p>
                <List className="mt-2">
                    {props.data.map((item: any) => (
                        <ListItem key={item.name} className="space-x-6">
                            <div className="flex items-center space-x-2.5 truncate">
                                <span
                                    className={classNames(item.color, 'h-2.5 w-2.5 shrink-0 rounded-sm',)}
                                    aria-hidden={true}
                                />
                                <span className="truncate dark:text-dark-tremor-content-emphasis">
                                    {item.name}
                                    {(item?.amount)?.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium tabular-nums text-tremor-content-emphasis dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-emphasis">
                                    {(item?.total)?.toFixed(2)}/{item.share}
                                </span>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Card>
        </>
    );
}

