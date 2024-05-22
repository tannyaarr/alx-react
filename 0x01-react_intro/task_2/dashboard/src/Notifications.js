import React from 'react';
import './Notifications.css';
import closeIcon from './close-icon.png';
import { getLatestNotification } from './utils';

function Notifications() {
  return (
    <div className="Notifications">
      <p>Here is the list of notifications</p>
    </div>
  );
}

const Notifications = () => {
    const handleButtonClick = () => {
      console.log('Close button has been clicked');
    };
  
    return (
      <div className="Notifications">
        {/* Button element with inline styling */}
        <button
          style={{ float: 'right' }}
          aria-label="Close"
          onClick={handleButtonClick}
        >
          {/* Children img element */}
          <img src={closeIcon} alt="Close icon" />
        </button>
        <p>Here is the list of notifications</p>
        {/* Unordered list */}
        <ul>
          <li data-priority="default">New course available</li>
          <li data-priority="urgent">New resume available</li>
          {/* Last item displaying the content of getLatestNotification */}
          <li
            dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
          ></li>
        </ul>
      </div>
    );
  };

export default Notifications;