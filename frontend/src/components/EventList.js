import React, { useState } from 'react';
import EventFilter from './EventFilter';
import MediaModal from './MediaModal';
import './EventList.css';

const EventList = ({ events, onEdit, onDelete }) => {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setShowMediaModal(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                          (filterType === 'text' && !event.media) || 
                          (filterType === 'image' && event.media && event.media.startsWith('data:image')) || 
                          (filterType === 'video' && event.media && event.media.startsWith('data:video'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="event-list-container">
      <EventFilter onSearch={handleSearch} onFilter={handleFilter} />
      <h1>Event List</h1>
      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map(event => (
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
