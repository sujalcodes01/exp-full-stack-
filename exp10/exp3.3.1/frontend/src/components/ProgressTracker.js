import React from 'react';
import { CheckCircle2, Circle, AlertCircle, CalendarCheck } from 'lucide-react';

const ProgressTracker = ({ stats }) => {
  const { completed, pending, todayCompleted, highPriority, overdue, completionRate } = stats;

  return (
    <div>
      {todayCompleted > 0 && (
        <div className="celebration-msg">
          🎉 You completed {todayCompleted} task{todayCompleted > 1 ? 's' : ''} today! Keep it up!
        </div>
      )}
      <div className="progress-section">
        <div className="progress-card">
          <div className="progress-value">{completionRate}%</div>
          <div className="progress-label">Completion</div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
        <div className="progress-card">
          <div className="progress-value" style={{ color: '#10b981' }}>
            <CheckCircle2 size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {completed}
          </div>
          <div className="progress-label">Done</div>
        </div>
        <div className="progress-card">
          <div className="progress-value" style={{ color: '#f59e0b' }}>
            <Circle size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {pending}
          </div>
          <div className="progress-label">Pending</div>
        </div>
        <div className="progress-card">
          <div className="progress-value" style={{ color: '#ef4444' }}>
            <AlertCircle size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {highPriority}
          </div>
          <div className="progress-label">High Priority</div>
        </div>
        <div className="progress-card">
          <div className="progress-value" style={{ color: '#8b5cf6' }}>
            <CalendarCheck size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {todayCompleted}
          </div>
          <div className="progress-label">Today</div>
        </div>
        {overdue > 0 && (
          <div className="progress-card">
            <div className="progress-value" style={{ color: '#ef4444' }}>
              {overdue}
            </div>
            <div className="progress-label">Overdue</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;

