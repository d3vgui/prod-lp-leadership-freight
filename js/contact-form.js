document.querySelector('#contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const formProps = Object.fromEntries(formData);

  const message = `Olá! Vim pelo site e gostaria de fazer um orçamento.

Segue abaixo minhas informações:

Nome: ${formProps.name}
E-mail: ${formProps.email}
Celular: ${formProps.phone}
Assunto: ${formProps.subject}

Mensagem:
${formProps.message}`;

  const whatsappURL = `https://api.whatsapp.com/send?phone=5511975721243&text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');
});
