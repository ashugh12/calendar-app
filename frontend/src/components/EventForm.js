import React, { useState, useEffect } from 'react';

const EventForm = ({ event = {}, onSave }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? event.date : '');

  useEffect(() => {
    setTitle(event ? event.title : '');
    setDate(event ? event.date : '');
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, date });
    setTitle('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Save Event</button>
    </form>
  );
};

export default EventForm;
