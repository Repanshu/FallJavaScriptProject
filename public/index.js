const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    const name = form.elements['name'].value;
    const price = form.elements['price'].value;
    if (!name || price <= 0) {
        event.preventDefault();
        alert('Please fill all fields correctly!');
    }
});
