import React from 'react';
import './EventList.css';  // Import styles here

const MediaModal = ({ show, onClose, media }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        {media.startsWith('data:image') ? (
          <img src={media} alt="Event media" />
        ) : (
          <video controls>
            <source src={media} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default MediaModal;
