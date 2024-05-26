export default function modalLogin() {
    const loginButton = document.querySelector('.modal-login__button');

    loginButton.addEventListener('click', event => {
        event.preventDefault();
        console.log(event.target);
            window.location.href = 'account-page.html';

        // const username = document.querySelector('username').value;
        // const password = document.querySelector('password').value;

        // Simple validation
        // if (username === 'your_username' && password === 'your_password') {
        // if (true) {
        //     window.location.href = 'personal_account.html';
        // } else {
        //     alert('Invalid username or password. Please try again.');
        // }
    });
}
