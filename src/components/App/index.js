// == Import : npm
import React from 'react';
import * as geolib from 'geolib';

// == Import : local
import './app.scss';
import './reset.css';
import { users, usersInNeed } from 'src/data/users';

const currentUser = users[2];

const orderedUsers = geolib.orderByDistance(currentUser, [
  ...usersInNeed,
]);

const calculateDistance = (from, to) => {
  const distance = geolib.getDistance(
    { latitude: from.latitude, longitude: from.longitude },
    { latitude: to.latitude, longitude: to.longitude },
  );
  return (
    Number((distance / 1000).toFixed(1))
  );
};

// == Composant

const App = () => (
  <div id="app">
    <header>
      <span className="sitename">Aide ton prochain</span>
    </header>
    <div className="welcomeMessage text-muted">
      {`Bienvenue ${currentUser.name}`}
    </div>
    <ul>
      {orderedUsers.map((userInNeed) => {
        return (
          <li key={userInNeed.name} className="users-list-item">
            <div className="avatar">
              <img src={userInNeed.avatar_url} alt={`avatar ${userInNeed.name}`} />
            </div>
            <div className="infos">
              <p className="name">{userInNeed.name}</p>
              <p className="distance text-muted text-small">
                {calculateDistance(currentUser, userInNeed)}km
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

// == Export
export default App;
