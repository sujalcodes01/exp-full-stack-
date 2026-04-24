import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Study', 'Work', 'Personal', 'Other'];
const priorities = ['All', 'High', 'Medium', 'Low'];

const SearchFilter = ({ search, setSearch, categoryFilter, setCategoryFilter, priorityFilter, setPriorityFilter }) => {
  return (
    <div className="search-filter-section">
      <div className="search-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="filter-chips">
        <SlidersHorizontal size={16} style={{ color: 'var(--text-secondary)', alignSelf: 'center' }} />
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="filter-chips">
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', alignSelf: 'center' }}>Priority:</span>
        {priorities.map((p) => (
          <button
            key={p}
            className={`filter-chip ${priorityFilter === p ? 'active' : ''}`}
            onClick={() => setPriorityFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
