import React, { useState, useEffect } from 'react';
import './EventForm.css';

const EventForm = ({ event = {}, selectedDate, onSave }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date?.split('T')[0] || selectedDate?.toISOString().split('T')[0] || '');
  const [description, setDescription] = useState(event?.description || '');
  const [media, setMedia] = useState(event?.media || null);

  useEffect(() => {
    if (event?.id) {
      setTitle(event.title);
      setDate(event.date.split('T')[0]);
      setDescription(event.description || '');
      setMedia(event.media || null);
    } else {
      setDate(selectedDate?.toISOString().split('T')[0] || '');
    }
  }, [event, selectedDate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setMedia(reader.result);  // Store base64 encoded file data
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: event?.id, title, date, description, media });
    setTitle('');
    setDate('');
    setDescription('');
    setMedia(null);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={!!event?.id}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={handleFileChange}
      />
      <button type="submit">Save Event</button>
    </form>
  );
};

export default EventForm;
