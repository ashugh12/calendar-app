import React, { useState } from 'react';
import './EventList.css';
import MediaModal from './MediaModal';

const EventList = ({ events, onEdit, onDelete }) => {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setShowMediaModal(true);
  };

  return (
    <div className="event-list-container">
      <h1>Event List</h1>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <div className="event-details">
                <strong>{event.title}</strong>
                <span>{event.date}</span>
                {event.description && <p>{event.description}</p>}
                {event.media && (
                  <span onClick={() => handleMediaClick(event.media)} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#007BFF' }}>
                    View Media
                  </span>
                )}
              </div>
              <div className="event-buttons">
                <button className="edit-button" onClick={() => onEdit(event)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(event.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
      <MediaModal show={showMediaModal} onClose={() => setShowMediaModal(false)} media={selectedMedia} />
    </div>
  );
};

export default EventList;
