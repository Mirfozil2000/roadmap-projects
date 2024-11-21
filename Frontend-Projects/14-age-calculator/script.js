const ageInput = datepicker('.age-calculate', { id: 1 });
const button = document.getElementById('calculate-button');
button.addEventListener('click', function (e) {
    e.preventDefault();
    const ageValue = document.querySelector('.age-calculate').value;
    const result = document.getElementById('result');
    if (!ageValue) {
        result.innerText = 'Заполните дату рождения!';
        return;
    }
    const { DateTime } = luxon;
    const birthDate = DateTime.fromISO(ageValue);
    if (!birthDate.isValid) {
        result.innerText = 'Неверный формат даты! Используйте формат YYYY-MM-DD.';
        return;
    }
    const now = DateTime.now();
    if (birthDate > now) {
        result.innerText = 'Дата рождения не может быть больше текущей даты!';
        return;
    }
    const diff = now.diff(birthDate, ['years', 'months']).toObject();
    result.innerText = `Вам ${Math.floor(diff.years)} лет и ${Math.floor(diff.months)} месяцев.`;
});
