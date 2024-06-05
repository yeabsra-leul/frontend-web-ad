import React, { FC, ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
}

const Grid: FC<GridProps> = ({ children }) => {
  return (
    <div id="gantt-grid-container" className='grid grid-cols-[150px_1fr] shadow-[3px_3px_3px_rgba(0,0,0,0.05)] rounded-[5px]'>
      {children}
      <style jsx>{`
        #gantt-grid-container {
          display: grid;
          grid-template-columns: 150px 1fr;
          outline: 2px solid var(--color-outline);
          border-radius: 5px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
}

export default Grid;