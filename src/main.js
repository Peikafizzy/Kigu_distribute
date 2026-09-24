import './style.css';

import { createMap } from './map/map.js';
import { addMalaysiaLayer } from './map/malaysia.js';
import { addPeopleMarkers } from './map/markers.js';

import { people } from './data/people.js';

const map = createMap();

addMalaysiaLayer(map);
addPeopleMarkers(map, people);