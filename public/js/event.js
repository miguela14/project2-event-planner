const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#event-title').value.trim();
    const description = document.querySelector('#event-description').value.trim();
    const date = document.querySelector('#event-date').value.trim();
    const time = document.querySelector('#event-time').value.trim();
    const duration = document.querySelector('#event-duration').value.trim();
    const location = document.querySelector('#event-location').value.trim();

    if (title && description && date && time && duration && location) {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ title, description, date, time, duration, location }),
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