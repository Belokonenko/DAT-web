export default function orderCallBackModal() {
  const dialog = document.getElementById('callbackDialog');
  const openBtn = document.querySelectorAll('.callback-btn');
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('callbackForm');
  
  console.log(openBtn[0])
  // Открыть модальное окно
  openBtn.addEventListener('click', () => {
    dialog.showModal(); // Открыть диалог
  });

  // Закрыть модальное окно
  closeBtn.addEventListener('click', () => {
    dialog.close(); // Закрыть диалог
  });

  // Обработка формы
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Останавливаем отправку формы

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (name && phone) {
      alert(`Thank you, ${name}! We will call you back at ${phone}.`);
      dialog.close();
      form.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });
};

