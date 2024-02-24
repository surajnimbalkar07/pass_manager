function showThankYouMessage(event) {
    event.preventDefault(); // Prevent form submission for this example
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('thank-you-msg').style.display = 'block';
}