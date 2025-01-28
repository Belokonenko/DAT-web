export default function orderCallBackModal() {
  const url = 'http://localhost:4000/usersCalback';
  const dialog = document.getElementById('callbackDialog');
  const openBtns = document.querySelectorAll('.callback-btn');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('callbackForm');
  const responseMessage = document.querySelector('.responseMessage');
  const submitBtn = form.querySelector('[type="submit"]');
  const preloader = document.getElementById('preloader');

  preloader.style.display = 'none';
  
  openBtns.forEach((openBtn) => {
    openBtn.addEventListener('click', () => dialog.showModal());
  });

  // Закрыть модальное окно
  closeBtn.addEventListener('click', () => closeModal());

  // Обработка отправки формы
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    // Деактивируем кнопку отправки
    toggleSubmitState(false);

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    jsonData.timestamp = new Date().toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ

    await sendFormCallback(jsonData);

    // Активируем кнопку отправки
    toggleSubmitState(true);
  });

  // Закрыть диалог и очистить состояние
  function closeModal() {
    dialog.close();
    form.classList.remove('hide');
    responseMessage.classList.add('hide');
    responseMessage.textContent = '';
    form.reset();
  }

  // Управление состоянием кнопки отправки
  function toggleSubmitState(enabled) {
    submitBtn.disabled = !enabled;
    submitBtn.textContent = enabled ? 'Send' : 'Sending...';
  }

  // Отправить данные формы
  async function sendFormCallback(jsonData) {
    try {

      preloader.style.display = 'flex';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const result = await response.json();

      responseMessage.textContent = 'Our operator will call you within 15 minutes. Thank you!';
      responseMessage.style.color = 'green';
      responseMessage.classList.remove('hide');


      form.classList.add('hide');

    } catch (error) {
      form.classList.add('hide');
      responseMessage.textContent = 'Submission failed. Please try again or call us.';
      responseMessage.style.color = 'red';
      responseMessage.classList.remove('hide');
    }

      preloader.style.display = 'none';
  }
}

