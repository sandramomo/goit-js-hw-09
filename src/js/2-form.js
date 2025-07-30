const form = document.querySelector('.feedback-form');
let formData = {
  message: '',
  email: '',
};
handleDOMLoad();
form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

function handleFormInput(e) {
  formData.email = e.currentTarget.elements.email.value;
  formData.message = e.currentTarget.elements.message.value;
  saveToLS('feedback-form-state', formData);
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill all fields please');
    return;
  } else {
    const saveUserData = { ...formData };
    localStorage.removeItem('feedback-form-state');
    form.reset();
    formData = {
      message: '',
      email: '',
    };
    console.log(saveUserData);
  }
}
function handleDOMLoad() {
  try {
    const lsData = getFromLS('feedback-form-state');
    form.elements.email.value = lsData.email || '';
    form.elements.message.value = lsData.message || '';
    formData =
      lsData && typeof lsData === 'object'
        ? lsData
        : { email: '', message: '' };
  } catch {}
}
function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}
function getFromLS(key) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {}
}
