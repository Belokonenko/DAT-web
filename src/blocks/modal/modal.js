export default function modal(nameModal, classBtnOpen, btnClose) {
    const modal = document.querySelector(nameModal);
    const btnOpenModal = document.querySelector(classBtnOpen);
    const closeModalButton = document.querySelector(btnClose);

    if (btnOpenModal) {
        btnOpenModal.addEventListener('click', event => {
            const btnDate = event.target.getAttribute('data-info');
            modal.showModal();
        });

        closeModalButton.addEventListener('click', () => {
            modal.close();
        });
    }


}
