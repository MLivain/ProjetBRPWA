self.addEventListener('push', (e) => {
  if (!self.registration.showNotification) {
    return;
  }
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: './img/icons/favicon-32x32.png',
    actions: data.actions,
  });
});
