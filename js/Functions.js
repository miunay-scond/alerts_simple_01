let fieldData = {};

window.addEventListener('onWidgetLoad', function (obj) {
  fieldData = obj.detail.fieldData;
});

window.addEventListener('onEventReceived', function (obj) {
  const event = obj.detail.event;
  const listener = obj.detail.listener;

  // Plantilla configurada en Fields
  let template = fieldData.msgAlertTemplate || '{name}';

  // Reemplazamos los tokens por los valores reales del evento
  const replacements = {
    '{name}':    event.name        || '',
    '{amount}':  event.amount      || '',
    '{months}':  event.amount      || '', // en resubs, "amount" = meses
    '{tier}':    event.tier        || '',
    '{message}': event.message     || '',
    '{count}':   event.count       || '',  // raids
    '{gifted}':  event.sender      || ''   // gift sub
  };

  for (const token in replacements) {
    template = template.replaceAll(token, replacements[token]);
  }

  const usernameEl = document.querySelector('.username');
  if (usernameEl) usernameEl.textContent = template;
});