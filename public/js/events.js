$(document).ready(function () {
    // Email validation regular expression
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

    // Function to check if a string is a valid email
    function isValidEmail(email) {
        return emailRegex.test(email);
    }

    // Function to handle the click event of the "Send Email" button
    function sendEmail(eventId) {
        const emailAddresses = [];
        const emailAddress = $('#emailInput').val();

        // Split email addresses by comma and trim
        const addresses = emailAddress.split(',').map(address => address.trim());

        emailAddresses.push(...addresses.filter(address => address !== '' && isValidEmail(address)));
        
        $.ajax({
            method: 'POST',
            url: '/api/nodemailer/send-email',
            data: JSON.stringify({ eventId, emailAddresses }),
            contentType: 'application/json',
            success: function (response) {
                console.log(response.message);
            },
            error: function (xhr, status, error) {
                console.log('Error occurred:', error);
            },
        });
    }

    // Event listener for the "Send Email" button
    $('#sendEmailButton').click(function () {
        const eventId = $(this).data('event-id');
        sendEmail(eventId);
    });
});
