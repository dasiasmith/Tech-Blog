const loginHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-input-login');
  const passwordEl = document.querySelector('#password-input-login');

  const res = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (res.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login. Please check your credentials.');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler);