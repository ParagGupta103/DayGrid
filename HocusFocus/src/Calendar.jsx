import { 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    eachDayOfInterval, 
    format 
  } from 'date-fns';
  import './Calendar.css'; // We will create this next
  
  function Calendar() {
    // 1. Setup the date context
    const today = new Date();
    
    // 2. Logic to get the grid of days
    const startOfSelectedMonth = startOfMonth(today);
    const endOfSelectedMonth = endOfMonth(today);
    
    // This ensures the grid starts on Sunday and ends on Saturday
    const startDate = startOfWeek(startOfSelectedMonth);
    const endDate = endOfWeek(endOfSelectedMonth);
  
    const days = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    return (
      <div className="calendar-main">
        <header className="calendar-header">
          <h2>{format(today, 'MMMM yyyy')}</h2>
        </header>
  
        <div className="calendar-grid">
          {/* Render the Weekday names at the top */}
          {weekdays.map((day) => (
            <div key={day} className="weekday-name">
              {day}
            </div>
          ))}
  
          {/* Render every day in our grid */}
          {days.map((day, index) => (
            <div key={index} className="day-cell">
              <span className="day-number">{format(day, 'd')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Calendar;