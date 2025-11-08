// Зберігаємо стан форми у localStorage під ключем "feedback-form-state"

const STORAGE_KEY = 'feedback-form-state';

// Об'єкт поза будь-якими функціями
let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');

// ---- відновлення стану при завантаженні
restoreForm();

function restoreForm() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw) ?? {};
    // Без undefined у полях
    form.elements.email.value = (saved.email ?? '').toString();
    form.elements.message.value = (saved.message ?? '').toString();

    // Синхронізуємо formData
    formData.email = form.elements.email.value;
    formData.message = form.elements.message.value;
  } catch {
    // у разі пошкоджених даних просто ігноруємо
  }
}

// ---- делегування input: зберігаємо лише актуальне поле, тримаємо інше
form.addEventListener('input', (e) => {
  const { name, value } = e.target;
  if (name !== 'email' && name !== 'message') return;

  // збережені дані не містять пробіли по краях
  formData[name] = value.trim();

  // не перетираємо інші поля
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// ---- сабміт із перевіркою
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  // оновлюємо formData, щоб у консолі були актуальні значення
  formData.email = email;
  formData.message = message;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData); // { email, message }

  // очищення сховища, об'єкта та полів
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
