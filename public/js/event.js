const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#event-title').value.trim();
    const description = document.querySelector('#event-description').value.trim();
    const date = document.querySelector('#event-date').value.trim();
    const location = document.querySelector('#event-location').value.trim();
    const time = document.querySelector('#start-time').value.trim();
    const duration = document.querySelector('#end-time').value.trim();

    console.log(title, description, date, location, time, duration);

    if (title && description && date && location && time && duration) {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ 
                title, description, date, location, time, duration, 
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create Event');
            console.log(response);
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
