import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay,
  isSameMonth
} from 'date-fns';
import EventModal from './EventModal';
import './Calendar.css';

function Calendar() {
  // --- STATE ---
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // --- CALENDAR LOGIC ---
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // --- HANDLERS ---
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const saveEvent = (eventData) => {
    const newEvent = { 
      ...eventData, 
      id: Date.now() // Unique ID for React keys
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="calendar-container">
      {/* 1. Header with Controls */}
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      {/* 2. The Grid */}
      <div className="calendar-grid">
        {weekdays.map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div 
            key={index} 
            className={`day-cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <span className="day-number">{format(day, 'd')}</span>
            
            {/* 3. Event Rendering */}
            <div className="day-events">
              {events
                .filter((event) => isSameDay(new Date(event.date), day))
                .map((event) => (
                  <div key={event.id} className={`event-tag ${event.category.toLowerCase()}`}>
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. The Pop-up Form */}
      {selectedDate && (
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

export default Calendar;