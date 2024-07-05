import { Card } from '@nextui-org/card';

export const AdBreakdownCard = ({
  cardTitle,
  value
}: {
  cardTitle: string;
  value: string;
}) => (
  <Card className="rounded-small shadow-none text-medium font-semibold px-2 py-3 border-1.5 border-default-300">
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-2xl font-bold text-default-500">{value}</div>
      <div className="text-muted-foreground font-normal text-default-500 text-center">
        {cardTitle}
      </div>
    </div>
  </Card>
);
