const form = document.querySelector('.feedback-form');
let formData = {
  message: '',
  email: '',
};
form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);
handleDOMLoad();

function handleFormInput(e) {
  formData.email = e.currentTarget.elements.email.value;
  formData.message = e.currentTarget.elements.message.value;
  saveToLS('feedback-form-state', formData);
}
function handleFormSubmit(e) {
  e.preventDefault();
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill all fields please');
  } else {
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
}
function handleDOMLoad() {
  const lsData = getFromLS('feedback-form-state');
  try {
    form.elements.email.value = lsData.email;
    form.elements.message.value = lsData.message;
    formData = lsData;
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
