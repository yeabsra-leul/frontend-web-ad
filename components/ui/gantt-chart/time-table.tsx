import React, { FC } from 'react';
import { Tooltip } from "@nextui-org/react";

interface TimeTableProps {

    timeRange: {
      fromSelectYear: string;
      fromSelectMonth: number;
      toSelectYear: string;
      toSelectMonth: number;
    };
    tasks: {
      id: string;
    }[];
    taskDurations: {
      task: string;
      start: string;
      end: string;
      id: string;
      name: string;
      channel: string;
      url: string;
      budget: number;
    }[];

  setTaskDurations: (taskDurations: {
    task: string;
    start: string;
    end: string;
    id: string;
    name: string;
    channel: string;
    url: string;
    budget: number;
  }[]) => void;
}

const TimeTable: FC<TimeTableProps> = ({
  timeRange,
  tasks,
  taskDurations,
  setTaskDurations
}) => {
  const ganttTimePeriod: React.CSSProperties = {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'minmax(30px, 1fr)',
    outline: '0.5px solid var(--color-outline)',
    textAlign: 'center',
    height: 'var(--cell-height)',
  };

  const months: string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const ganttTimePeriodSpan: React.CSSProperties = {
    margin: 'auto',
  };

  const ganttTimePeriodCell: React.CSSProperties = {
    position: 'relative',
    outline: '0.5px solid var(--color-outline)',
    marginTop: '0.5px',
  };

  const taskDuration: React.CSSProperties = {
    position: 'absolute',
    height: 'calc(var(--cell-height) - 1px)',
    zIndex: '1',
    background:
      'linear-gradient(90deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%)',
    borderRadius: 'var(--border-radius)',
    boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.05)',
  };

  const startMonth = new Date(
    parseInt(timeRange.fromSelectYear),
    timeRange.fromSelectMonth
  );
  const endMonth = new Date(
    parseInt(timeRange.toSelectYear),
    timeRange.toSelectMonth
  );

  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  let monthRows: JSX.Element[] = [];
  let dayRows: JSX.Element[] = [];
  let dayRow: JSX.Element[] = [];
  let weekRows: JSX.Element[] = [];
  let weekRow: JSX.Element[] = [];
  let taskRows: JSX.Element[] = [];
  let taskRow: JSX.Element[] = [];

  for (let i = 0; i < numMonths; i++) {
    monthRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        <span style={ganttTimePeriodSpan}>
          {months[month.getMonth()] + ' ' + month.getFullYear()}
        </span>
      </div>
    );

    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);
    const currYear = month.getFullYear();
    const currMonth = month.getMonth() + 1;

    for (let j = 1; j <= numDays; j++) {
      dayRow.push(
        <div key={j} style={{ ...ganttTimePeriod, outline: 'none' }}>
          <span style={ganttTimePeriodSpan}>{j}</span>
        </div>
      );

      weekRow.push(
        <div key={j} style={{ ...ganttTimePeriod, outline: 'none' }}>
          <span style={{ ...ganttTimePeriodSpan, color: '#3E455B' }}>
            {getDayOfWeek(currYear, currMonth - 1, j - 1)}
          </span>
        </div>
      );
    }

    dayRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        {dayRow}
      </div>
    );

    weekRows.push(
      <div key={i} style={{ ...ganttTimePeriod, outline: 'none' }}>
        {weekRow}
      </div>
    );

    dayRow = [];
    weekRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  if (tasks) {
    tasks.forEach((task) => {
      let mnth = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = mnth.getFullYear();
        const curMonth = mnth.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {
          const dayOfTheWeek = getDayOfWeek(curYear, curMonth - 1, j - 1);
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j
          );

          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              style={{
                ...ganttTimePeriodCell,
                backgroundColor:
                  dayOfTheWeek === 'S' ? 'var(--color-tertiary)' : '#fff',
              }}
              data-task={task?.id}
              data-date={formattedDate}
            >
              {taskDurations.map((el, i) => {
                if (el?.task === task?.id && el?.start === formattedDate) {
                  return (
                    <div key={`${i}-${el?.id}`}>
                      <Tooltip content={
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">{el?.name}</div>
                          <div className="text-tiny">Channel: {el?.channel}</div>
                          <div className="text-tiny">Url: {el?.url}</div>
                          <div className="text-tiny">Budget: ${el?.budget}</div>
                          <div className="text-tiny">Start Date: {el?.start}</div>
                          <div className="text-tiny">End Date: {el?.end}</div>                     
                        </div>
                      } placement='top-end'>
                        <div
                          key={`${i}-${el?.id}`}
                          tabIndex={0}
                          style={{
                            ...taskDuration,
                            width: `calc(${dayDiff(
                              el?.start,
                              el?.end
                            )} * 100% - 1px)`,
                          }}
                        ></div>
                      </Tooltip>
                    </div>
                  );
                }
              })}
            </div>
          );
        }

        taskRows.push(
          <div key={`${i}-${task?.id}`} style={ganttTimePeriod}>
            {taskRow}
          </div>
        );

        taskRow = [];
        mnth.setMonth(mnth.getMonth() + 1);
      }
    });
  }

  return (
    <div
      id="gantt-grid-container__time"
      style={{ gridTemplateColumns: `repeat(${numMonths}, 1fr)` }}
    >
      {monthRows}
      {dayRows}
      {weekRows}
      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: '1/-1',
          display: 'grid',
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          paddingLeft: '0.5px',
        }}
      >
        {taskRows}
      </div>
      <style jsx>{`
        #gantt-grid-container__time {
          display: grid;
          overflow-x: auto;
          outline: 0.5px solid var(--color-outline);
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}

function monthDiff(firstMonth: Date, lastMonth: Date): number {
  let months: number;
  months = (lastMonth.getFullYear() - firstMonth.getFullYear()) * 12;
  months -= firstMonth.getMonth();
  months += lastMonth.getMonth();
  return months <= 0 ? 0 : months;
}

function dayDiff(startDate: string, endDate: string): number {
  const difference =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  return days;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getDayOfWeek(year: number, month: number, day: number): string {
  const daysOfTheWeekArr: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayOfTheWeekIndex = new Date(year, month, day).getDay();
  return daysOfTheWeekArr[dayOfTheWeekIndex];
}

function createFormattedDateFromStr(year: number, month: number, day: number): string {
  let monthStr = month.toString();
  let dayStr = day.toString();

  if (monthStr.length === 1) {
    monthStr = `0${monthStr}`;
  }
  if (dayStr.length === 1) {
    dayStr = `0${dayStr}`;
  }
  return `${year}-${monthStr}-${dayStr}`;
}

function createFormattedDateFromDate(date: Date): string {
  let monthStr = (date.getMonth() + 1).toString();
  let dayStr = date.getDate().toString();

  if (monthStr.length === 1) {
    monthStr = `0${monthStr}`;
  }
  if (dayStr.length === 1) {
    dayStr = `0${dayStr}`;
  }
  return `${date.getFullYear()}-${monthStr}-${dayStr}`;
}

export default TimeTable;