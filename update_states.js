const fs = require('fs');
const file = 'src/lib/db/states.json';
const states = JSON.parse(fs.readFileSync(file));
const map = {
  'AZ': 'camp-scottsdale-az.jpg',
  'TX': 'camp-austin-tx.jpg',
  'FL': 'camp-naples-fl.jpg',
  'CA': 'camp-san-diego-ca.jpg',
  'UT': 'camp-st-george-ut.jpg'
};
states.forEach(s => {
  const img = map[s.code] ? `https://obsessedpickleballerscamps.com/wp-content/uploads/2023/11/${map[s.code]}` : 'https://obsessedpickleballerscamps.com/wp-content/uploads/2023/10/hero-bg.jpg';
  s.image = img;
});
fs.writeFileSync(file, JSON.stringify(states, null, 2));
