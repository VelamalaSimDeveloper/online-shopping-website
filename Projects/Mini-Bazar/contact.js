document.addEventListener('DOMContentLoaded', () => {
    const queryForm = document.getElementById('queryForm');
    const contactFormDiv = document.getElementById('contactForm');
    const confirmationMessageDiv = document.getElementById('confirmationMessage');

    queryForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the page from refreshing

        // You can collect form data here if needed
        // const name = document.getElementById('name').value;
        // const email = document.getElementById('email').value;
        // const subject = document.getElementById('subject').value;
        // const message = document.getElementById('message').value;

        // Hide the form and show the confirmation message
        contactFormDiv.classList.add('d-none');
        confirmationMessageDiv.classList.remove('d-none');
    });
});