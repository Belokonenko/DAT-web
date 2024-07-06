export const makeAnOrder = () => {

	// back to history for breadcrumbs
	const btnBackHistory = document.querySelector('.make-an-order__back-history-btn');

	if (btnBackHistory) {

		btnBackHistory.addEventListener('click', () => {
			window.history.back();
		})
	}
	// ---


}

