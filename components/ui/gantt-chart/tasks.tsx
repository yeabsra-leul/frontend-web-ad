import React, { FC, useEffect, useRef } from 'react';

interface Task {
  id: string;
  name: string;
}

interface TasksProps {
    tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setTaskDurations: (durations: number[]) => void;
}

const Tasks: FC<TasksProps> = ({ tasks, setTasks, setTaskDurations }) => {
  const inputRef = useRef<HTMLInputElement[]>([]);
  const indexRef = useRef<number | null>(null);

  useEffect(() => {
    if (inputRef.current.length && indexRef.current !== null) {
      inputRef.current[indexRef.current]?.focus();
    }
  });

  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row">
            <input
              data-task-id={tsk?.id}
              value={tsk?.name}            
            />
          </div>
        ))}
      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          height: var(--cell-height);
          border: none;
        }

        input {
          width: 127px;
          border: none;
          outline: none;
          background: none;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
};

export default Tasks;