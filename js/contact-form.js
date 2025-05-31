document.querySelector('#contactForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);

  const btnSubmitContainer = form.querySelector('.btn-submit');
  const submitButton = btnSubmitContainer.querySelector('button');

  let feedbackButton = btnSubmitContainer.querySelector('.feedback-button');
  if (!feedbackButton) {
    feedbackButton = document.createElement('div');
    feedbackButton.classList.add('feedback-button');
    feedbackButton.style.display = 'none';
    feedbackButton.style.padding = '12px 24px';
    feedbackButton.style.borderRadius = '4px';
    feedbackButton.style.fontWeight = 'bold';
    feedbackButton.style.textAlign = 'center';
    feedbackButton.style.transition = 'all 0.4s ease';
    feedbackButton.style.margin = '20px 0 0 0'
    btnSubmitContainer.appendChild(feedbackButton);
  }

  submitButton.style.transition = 'opacity 0.4s ease';
  submitButton.style.opacity = '0';

  setTimeout(() => {
    submitButton.style.display = 'none';
    feedbackButton.style.display = 'block';
    feedbackButton.style.opacity = '0';
  }, 400);

  try {
    const response = await fetch('https://lfgex.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formProps),
    });

    if (response.ok) {
      feedbackButton.textContent = 'E-mail enviado com sucesso!';
      feedbackButton.style.backgroundColor = '#28a745';
    } else {
      feedbackButton.textContent = 'Não foi possível enviar o e-mail.';
      feedbackButton.style.backgroundColor = '#dc3545';
    }
  } catch (error) {
    console.error('Erro:', error);
    feedbackButton.textContent = 'Erro ao enviar e-mail.';
    feedbackButton.style.backgroundColor = '#dc3545';
  }

  feedbackButton.style.color = '#fff';
  feedbackButton.style.cursor = 'default';
  feedbackButton.style.opacity = '1';

  if (formProps) form.reset();

  setTimeout(() => {
    feedbackButton.style.opacity = '0';
    setTimeout(() => {
      feedbackButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
      submitButton.style.opacity = '0';
      setTimeout(() => {
        submitButton.style.opacity = '1';
      }, 10);
    }, 400);
  }, 2000);
});
