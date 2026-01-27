import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onDateSelect, placeholder = 'mm/dd/yyyy', disabledDates = [], minDate = null, maxDate = null, className = '' }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Add empty slots for days of previous month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, currentMonth: false });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDate; i++) {
      const d = new Date(year, month, i);
      days.push({ 
        day: i, 
        date: d,
        currentMonth: true,
        disabled: isDisabled(d)
      });
    }
    
    return days;
  };

  const isDisabled = (date) => {
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (date < min) return true;
    }
    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(23, 59, 59, 999);
      if (date > max) return true;
    }
    return disabledDates.some(d => d.toDateString() === date.toDateString());
  };

  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateClick = (date) => {
    onDateSelect(date);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    onDateSelect(today);
    setCurrentMonth(today);
    setIsOpen(false);
  };

  const handleClear = () => {
    onDateSelect(null);
    setIsOpen(false);
  };

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`datepicker-container ${className}`} ref={containerRef}>

      <div 
        className={`datepicker-input-wrapper ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="datepicker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <div className="datepicker-input">
          {selectedDate ? formatDisplayDate(selectedDate) : <span style={{ color: '#4b5563' }}>{placeholder}</span>}
        </div>
      </div>

      {isOpen && (
        <div className="datepicker-popover">
          <div className="datepicker-header">
            <div className="datepicker-month-year">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div className="datepicker-nav">
              <button className="datepicker-nav-btn" onClick={() => changeMonth(-1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="datepicker-nav-btn" onClick={() => changeMonth(1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <div className="datepicker-weekdays">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="datepicker-weekday">{d}</div>
            ))}
          </div>

          <div className="datepicker-grid">
            {days.map((dayObj, i) => (
              <button
                key={i}
                className={`datepicker-day ${!dayObj.day ? 'empty' : ''} ${isSelected(dayObj.date) ? 'selected' : ''} ${isToday(dayObj.date) ? 'today' : ''} ${dayObj.disabled ? 'disabled' : ''}`}
                onClick={() => dayObj.day && !dayObj.disabled && handleDateClick(dayObj.date)}
                disabled={dayObj.disabled}
              >
                {dayObj.day}
              </button>
            ))}
          </div>

          <div className="datepicker-footer">
            <button className="datepicker-action-btn" onClick={handleClear}>Clear</button>
            <button className="datepicker-action-btn" onClick={handleToday}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
