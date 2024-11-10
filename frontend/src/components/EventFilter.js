import React, { useState } from 'react';
import './EventFilter.css';

const EventFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="event-filter-container">
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={filterType} onChange={handleFilterChange}>
        <option value="all">All Types</option>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
    </div>
  );
};

export default EventFilter;
