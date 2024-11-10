import React, { useState, useEffect } from 'react';
import './EventForm.css';

const EventForm = ({ event = {}, selectedDate, onSave }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date?.split('T')[0] || selectedDate?.toISOString().split('T')[0] || '');
  const [description, setDescription] = useState(event?.description || '');
  const [media, setMedia] = useState(event?.media || null);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Event title is required';
    if (!date) newErrors.date = 'Event date is required';
    if (!media) newErrors.media = 'Event media is required';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ id: event?.id, title, date, description, media });
      setTitle('');
      setDate('');
      setDescription('');
      setMedia(null);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!!event?.id}
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="error">{errors.date}</p>}
      </div>
      <div>
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
        />
        {errors.media && <p className="error">{errors.media}</p>}
      </div>
      <button type="submit">Save Event</button>
    </form>
  );
};

export default EventForm;
