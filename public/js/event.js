const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#event-title').value.trim();
    const description = document.querySelector('#event-description').value.trim();
    const date = document.querySelector('#event-date').value.trim();
    const location = document.querySelector('#event-location').value.trim();
    const startTime = document.querySelector('#start-time').value.trim();
    const endTime = document.querySelector('#end-time').value.trim();

    if (title && description && date && location && startTime && endTime) {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ title, description, date, location, startTime, endTime }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create Event');
        }
    }
};

const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('event-id')) {
        const id = event.target.getAttribute('event-id');

        const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete Event');
        }
    }
};

document.querySelector('#event-submit').addEventListener('click', newFormHandler);

document.querySelector('.event-list').addEventListener('click', deleteButtonHandler);
