// src/index.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('guest-form');
  const guestInput = document.getElementById('guest-name');
  const guestList = document.getElementById('guest-list');

  let guests = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = guestInput.value.trim();

    if (!name) return;

    if (guests.length >= 10) {
      alert('Guest list is full. Max 10 guests allowed.');
      return;
    }

    const guest = {
      id: Date.now(),
      name: name,
      attending: true,
      timeAdded: new Date().toLocaleTimeString()
    };

    guests.push(guest);
    addGuestToDOM(guest);
    guestInput.value = '';
  });

  function addGuestToDOM(guest) {
    const li = document.createElement('li');
    li.dataset.id = guest.id;
    li.innerHTML = `
      <span>${guest.name} - <em>${guest.attending ? 'Attending' : 'Not Attending'}</em> @ ${guest.timeAdded}</span>
      <button class="toggle">Toggle RSVP</button>
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    `;
    guestList.appendChild(li);
  }

  guestList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    const id = Number(li.dataset.id);
    const guest = guests.find(g => g.id === id);

    if (e.target.classList.contains('remove')) {
      guests = guests.filter(g => g.id !== id);
      li.remove();
    } else if (e.target.classList.contains('toggle')) {
      guest.attending = !guest.attending;
      li.querySelector('em').textContent = guest.attending ? 'Attending' : 'Not Attending';
    } else if (e.target.classList.contains('edit')) {
      const newName = prompt('Edit guest name:', guest.name);
      if (newName) {
        guest.name = newName.trim();
        li.querySelector('span').childNodes[0].nodeValue = `${guest.name} - `;
      }
    }
  });
});
