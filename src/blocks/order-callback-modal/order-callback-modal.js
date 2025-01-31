export default function orderCallBackModal() {

  const dialog = document.getElementById('callbackDialog');

  if (!dialog) return;

  const buttonBurger = document.querySelector('.button-burger');
  const body = document.querySelector('.page-body')
  const openBtns = document.querySelectorAll('.callback-btn');
  const url = 'http://localhost:4000/usersCalback';
  const closeBtn = document.querySelector('.close-btn');
  const form = document.getElementById('callbackForm');
  const responseMessage = document.querySelector('.responseMessage');
  const submitBtn = form.querySelector('[type="submit"]');
  const preloader = document.getElementById('preloader');
  const fixBlocks = document.querySelectorAll('.fix-block');

  preloader.style.display = 'none';

  if (openBtns) {
    openBtns.forEach((openBtn) => {
      openBtn.addEventListener('click', () => openModal());
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal());
  }

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();

      if (!name || !phone) {
        alert('Please fill in all fields.');
        return;
      }

      toggleSubmitState(false);

      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData.entries());
      jsonData.timestamp = new Date().toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ

      await sendFormCallback(jsonData);

      toggleSubmitState(true);
    });
  }

  function openModal() {
    const scrollbarWidth = getScrollbarWidth();
    fixBlocks.forEach(block => {
      block.style.paddingRight = `${scrollbarWidth}px`;
    })
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    if (!buttonBurger.classList.contains('button-burger_active')) {
      document.body.style.overflow = 'hidden';
    }
    dialog.showModal();
  }

  function closeModal() {
    dialog.close();
    fixBlocks.forEach(block => {
      block.style.paddingRight = `0px`;
    })
    document.body.style.paddingRight = `0px`;

    if (!buttonBurger.classList.contains('button-burger_active')) {

      document.body.style.overflow = 'auto';
    }
    form.classList.remove('hide');
    responseMessage.classList.add('hide');
    responseMessage.textContent = '';
    form.reset();
  }

  //  state of the button
  function toggleSubmitState(enabled) {
    submitBtn.disabled = !enabled;
    submitBtn.textContent = enabled ? 'Send' : 'Sending...';
  }

  //  sent data
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

  function getScrollbarWidth() {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.overflow = 'scroll';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
  }

}

