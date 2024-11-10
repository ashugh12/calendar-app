import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.css';
import Modal from './Modal';
import EventForm from './EventForm';
import EventList from './EventList';

const CalendarUI = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched events:", data);  // Debug log
        setEvents(data.map(event => ({
          ...event,
          date: event.date.split('T')[0]  // Ensure date is in YYYY-MM-DD format
        })));
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const onDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    setEditEvent(null); // Reset the edit state
  };

  const saveEvent = (eventData) => {
    const formattedDate = eventData.date || (selectedDate ? selectedDate.toISOString().split('T')[0] : '');
    const method = eventData.id ? 'PUT' : 'POST';
    const url = eventData.id ? `/api/events/${eventData.id}` : '/api/events';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...eventData, date: formattedDate })
    })
      .then(response => response.json())
      .then(savedEvent => {
        console.log("Saved event:", savedEvent);  // Debug log
        setEvents(events => {
          if (eventData.id) {
            return events.map(event => (event.id === savedEvent.id ? savedEvent : event));
          } else {
            return [...events, savedEvent];
          }
        });
        setShowForm(false);
        setEditEvent(null);
        setSelectedDate(null); // Reset selected date
      })
      .catch(error => console.error('Error saving event:', error));
  };

  const deleteEvent = (id) => {
    fetch(`/api/events/${id}`, { method: 'DELETE' })
      .then(() => {
        setEvents(events => events.filter(event => event.id !== id));
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const editEventHandler = (event) => {
    setSelectedDate(new Date(event.date));
    setEditEvent(event);
    setShowForm(true);
  };

  return (
    <div className="calendar-container">
      <Calendar onClickDay={onDateClick} value={date} />
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <EventForm event={editEvent} selectedDate={selectedDate} onSave={saveEvent} />
      </Modal>
      <EventList events={events} onEdit={editEventHandler} onDelete={deleteEvent} />
    </div>
  );
};

export default CalendarUI;
