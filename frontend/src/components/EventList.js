import React, { useEffect, useState } from 'react';
import EventForm from './EventForm';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const saveEvent = (eventData) => {
    const method = editEvent ? 'PUT' : 'POST';
    const url = editEvent ? `/api/events/${editEvent.id}` : '/api/events';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    })
      .then(response => response.json())
      .then(savedEvent => {
        setEvents(events => {
          if (editEvent) {
            return events.map(event => (event.id === savedEvent.id ? savedEvent : event));
          } else {
            return [...events, savedEvent];
          }
        });
        setEditEvent(null);
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

  return (
    <div>
      <h1>Event List</h1>
      <EventForm event={editEvent} onSave={saveEvent} />
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.date}
              <button onClick={() => setEditEvent(event)}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default EventList;
