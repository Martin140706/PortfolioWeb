// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// EmailJS
emailjs.init('bfRBquHRcUQIMGpTO');

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = this.querySelector('.btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  const templateParams = {
    from_name:  document.getElementById('nombre').value,
    from_email: document.getElementById('email').value,
    message:    document.getElementById('mensaje').value,
  };

  emailjs.send('service_qiq0vnb', 'template_gdge8xb', templateParams)
    .then(() => {
      document.getElementById('form-success').style.display = 'block';
      this.reset();
      btn.textContent = 'Enviar mensaje →';
      btn.disabled = false;
      setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
      }, 4000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      btn.textContent = 'Enviar mensaje →';
      btn.disabled = false;
      alert('Hubo un error al enviar el mensaje. Intentá de nuevo.');
    });
});