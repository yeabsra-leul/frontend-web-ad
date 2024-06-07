'use client';
import React, { FC, useState, useEffect } from 'react';
import Grid from '@/components/ui/gantt-chart/grid';
import Tasks from '@/components/ui/gantt-chart/tasks';
import TimeTable from '@/components/ui/gantt-chart/time-table';
import { GetAllTaskDurations, GetAllTasks } from '@/lib/data';
import { Advertisement } from '@/lib/definitions';

interface TimeTableProps {

    timeRange: {
      fromSelectYear: string;
      fromSelectMonth: number;
      toSelectYear: string;
      toSelectMonth: number;
    };
    tasks: {
      id: string;
      name: string;
    }[];
    taskDurations: {
      task: string;
      start: string;
      end: string;
      id: string;
      headline: string;
      channel: string;
      url: string;
      budget: number;
    }[];

  setTaskDurations: (taskDurations: {
    task: string;
    start: string;
    end: string;
    id: string;
    headline: string;
    channel: string;
    url: string;
    budget: number;
  }[]) => void;
}

const GanttChart: FC<{adsAll:Advertisement[]}> = (adsAll) => {
  const [tasks, setTasks] = useState<null | any>(null);
  const [taskDurations, setTaskDurations] = useState<null | any>(null);
  const [timeRange, setTimeRange] = useState<TimeTableProps["timeRange"]>({
    fromSelectMonth: 0,
    fromSelectYear: '2024',
    toSelectMonth: 5,
    toSelectYear: '2024',
  });

  useEffect(() => {
    const tasktemp = GetAllTasks(adsAll.adsAll);
    setTasks(tasktemp);
    const taskDurationtemp = GetAllTaskDurations(adsAll.adsAll);
    setTaskDurations(taskDurationtemp);
  }, [adsAll.adsAll]);

  return (
    <div id="gantt-container">
      <Grid>
        <Tasks
          tasks={tasks}       
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}  
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          taskDurations={taskDurations}    
          setTaskDurations={setTaskDurations}    
        />
      </Grid>
      <style jsx>{`
        #gantt-container {
          --color-text: #272a2e;
          --color-primary-dark: #0195e4;
          --color-primary-light: #9ddcff;
          --color-secondary: #4be35a;
          --color-tertiary: #f7f7f7;
          --color-orange: #ef5350;
          --color-outline: #e9eaeb;
          --border-radius: 5px;
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}

export default GanttChart;