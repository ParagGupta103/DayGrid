import { useState } from 'react';

function EventModal({ isOpen, onClose, onSave, selectedDate }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');

  if (!isOpen) return null; // If not open, render nothing

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    onSave({ title, category, date: selectedDate });
    setTitle(''); // Clear the input
    onClose();    // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Event for {selectedDate.toDateString()}</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Event Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Urgent">Urgent</option>
          </select>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;