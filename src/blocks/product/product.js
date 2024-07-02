export const productTab = () => {
	const btnBlock = document.querySelector('.product__tabs-btn-block');

	if (btnBlock) {
		btnBlock.addEventListener('click', (e) => {
			console.log(e.target);

		})

	}
};
