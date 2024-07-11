// Timer to remove message (in seconds)
const timer = 15;

const sCharBR = '%0A';
const apiToken = '5807116207:AAHAUD7P10-InYaWn_X4O3-Pdo6MsY5crq4';
const chatId = '@BitAkashicoContact';

const _form = $("#contact-form");

function onFormSubmit() {
  const nickname = document.getElementById("nickname");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const phone = document.getElementById("phone");

  if (!validateFields([nickname, email, message, phone])) {
    _form.submit();
  } else {
    sendTelegram($(nickname).val(), $(email).val(), $(message).val(), $(phone).val());
    clearForm();
    showMessage('success');
  }
  return false;
}

function validateFields(fields) {
  let result = true;
  for (const field of fields) {
    if (field) {
      hideMessage($(field).prop('id'));
      if (!validate(field)) { result = false; }
    }
  }
  return result;
}

function validate(field) {
  if (field && !field.checkValidity()) {
    const inputId = $(field).prop('id');
    showMessage(inputId);
    return false;
  }
  return true;
}

function clearMessage(inputMessage) {
  setTimeout(() => {
    inputMessage.innerHTML = '';
  }, timer * 1000);
}

function clearForm() {
  $(nickname).val('');
  $(email).val('');
  $(message).val('');
  $(phone).val('');
}

function sendTelegram(nickname, email, message, phone) {
  // Prepare params
  message = message.replace(/<[^>]*>/g, '').replace(/(\\r\\n)|([\r\n])/gmi, sCharBR);
  const text = `¡NUEVO MENSAJE desde CryptoShalix Portfolio! ${sCharBR}${sCharBR}
    - Nickname: ${nickname} ${sCharBR}
    - Email: ${email} ${sCharBR}
    - Phone: ${phone} ${sCharBR}
    - Message:${sCharBR} ${message} ${sCharBR}`;

  return doCall(text);
}

function doCall(text) {
  const path = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;

  return fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      showMessage('error');
      throw error;
    });
}

function showMessage(type) {
  let inputMessage = document.getElementById("msg_" + type);
  if (inputMessage) {
    $(inputMessage).removeClass('hidden');
    setTimeout(() => {
      $(inputMessage).addClass('hidden');
    }, timer * 1000);
  }
}

function hideMessage(type) {
  let inputMessage = document.getElementById("msg_" + type);
  if (inputMessage) {
    $(inputMessage).addClass('hidden');
  }
}