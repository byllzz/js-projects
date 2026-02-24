const dateInput = document.getElementById('date');
const display = document.getElementById('age-display');

function calcAge(birthDate) {
    const today = new Date();

    if (isNaN(birthDate)) return alert('Please enter a valid date');

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }

    return age < 0 ? "Birth date is in the future!" : `You are ${age} years old.`;
}
dateInput?.addEventListener('input', () => {
    const birthDate = new Date(dateInput.value);
    const result = calcAge(birthDate);

    if (display) {
        display.textContent = result;
    } else {
        console.log(result);
    }
});
