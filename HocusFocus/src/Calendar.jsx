import { useState } from 'react';
import { 
  format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, 
  isSameDay, isSameMonth, startOfDay, endOfDay
} from 'date-fns';
// Make sure you have this component created in a separate file!
import EventModal from './EventModal'; 
import './Calendar.css';

function Calendar() {
  // --- 1. ALL STATE DEFINITIONS ---
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); 
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // --- 2. DYNAMIC RANGE LOGIC ---
  let start, end;
  if (view === 'month') {
    start = startOfWeek(startOfMonth(currentDate));
    end = endOfWeek(endOfMonth(currentDate));
  } else if (view === 'week') {
    start = startOfWeek(currentDate);
    end = endOfWeek(currentDate);
  } else {
    start = startOfDay(currentDate);
    end = endOfDay(currentDate);
  }

  const days = eachDayOfInterval({ start, end });

  // --- 3. ALL FUNCTIONS (HANDLERS) ---
  const handleNext = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    if (view === 'day') setCurrentDate(addDays(currentDate, 1));
  };

  const handlePrev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
    if (view === 'day') setCurrentDate(subDays(currentDate, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const saveEvent = (eventData) => {
    const newEvent = { ...eventData, id: Date.now() };
    setEvents([...events, newEvent]);
  };

  // --- 4. THE UI ---
  return (
    <div className="calendar-container">
      <div className="view-controls">
        <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Month</button>
        <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Week</button>
        <button className={view === 'day' ? 'active' : ''} onClick={() => setView('day')}>Day</button>
      </div>
  
      <div className="calendar-header">
        <button onClick={handlePrev}>&lt;</button>
        <h2>{format(currentDate, view === 'month' ? 'MMMM yyyy' : 'MMM d, yyyy')}</h2>
        <button onClick={handleNext}>&gt;</button>
      </div>
  
      <div className={`calendar-grid ${view}-view`}>
        {weekdays.map((day) => (
          view !== 'day' && <div key={day} className="weekday-header">{day}</div>
        ))}
  
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`day-cell ${!isSameMonth(day, currentDate) && view === 'month' ? 'disabled' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <span className="day-number">{format(day, 'd')}</span>
            <div className="day-events">
              {events
                .filter((event) => isSameDay(new Date(event.date), day))
                .map((event) => (
                  <div key={event.id} className={`event-tag ${event.category?.toLowerCase() || 'work'}`}>
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
  
      {/* Conditional rendering for the Modal */}
      {isModalOpen && (
        <EventModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={saveEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}

// CRITICAL: You must export it!
export default Calendar;