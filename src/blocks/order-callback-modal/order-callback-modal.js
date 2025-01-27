export default function orderCallBackModal() {

  const dialog = document.getElementById('callbackDialog');
  const openBtns = document.querySelectorAll('.callback-btn');

  const closeBtn = document.querySelector('.close-btn');
  const form  = document.getElementById('callbackForm');
  console.log(form)

  // Открыть модальное окно
  openBtns.forEach(openBtn => {
    openBtn.addEventListener('click', () => {
      dialog.showModal(); // Открыть диалог
    });
  })

  // Закрыть модальное окно
  closeBtn.addEventListener('click', () => {
    dialog.close(); // Закрыть диалог
  });

  // sent form
  form.addEventListener('submit', (event) => {
    event.preventDefault();  
    console.log('submit')

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

