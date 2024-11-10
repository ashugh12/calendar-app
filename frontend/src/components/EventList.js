import React, { useEffect, useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.date}
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
