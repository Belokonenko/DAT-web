export default await function orderCallBackModal() {
  const url = 'http://localhost:4000/usersCalback1';
  const dialog = document.getElementById('callbackDialog');
  const openBtns = document.querySelectorAll('.callback-btn');

  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('callbackForm');
  const responseMessage = document.querySelector('.responseMessage');

  // open dialog window
  openBtns.forEach(openBtn => {
    openBtn.addEventListener('click', () => {
      dialog.showModal(); // Открыть диалог
    });
  })

  // close dialog window
  closeBtn.addEventListener('click', () => {
    dialog.close(); // Закрыть диалог
    form.classList.remove('hide')
  });

  // sent form

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('submit')

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (name && phone) {

      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());
      jsonData.timestamp = new Date().toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ
      sendFormCallback(jsonData);

      //form.classList.add('hide')
      //alert(`Thank you, ${name}! We will call you back at ${phone}.`);
      //dialog.close();
      //form.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });


  async function sendFormCallback(jsonData) {
    try {
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }else {

      const result = await response.json();
      
      form.reset();
      form.classList.add('hide');
      responseMessage.classList.remove('hide');
      responseMessage.textContent = `Our operator will call you within 15 minutes. Thank you` ;
      responseMessage.style.color = 'green';
      
      
      }


    } catch (error) {
      responseMessage.textContent = `Submission failed. Please try again or call us.`;
      responseMessage.style.color = 'red';
    }
  }
};

