const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const ticketForm = document.querySelector('#ticket-form');
const ticketName = document.querySelector('#ticket-name');
const ticketDescription = document.querySelector('#ticket-description');
const modalCancel = document.querySelector('#modal-cancel');

const confirmModal = document.querySelector('#confirm-modal');
const confirmCancel = document.querySelector('#confirm-cancel');
const confirmDelete = document.querySelector('#confirm-delete');

let formError = null;

function createFormError() {
  formError = document.createElement('div');
  formError.className = 'form-error hidden';
  ticketForm.insertBefore(formError, ticketForm.firstChild);
}

function showFormError(message) {
  if (!formError) {
    createFormError();
  }

  formError.textContent = message;
  formError.classList.remove('hidden');
}

function hideFormError() {
  if (!formError) {
    return;
  }

  formError.textContent = '';
  formError.classList.add('hidden');
}

function getTicketData(defaultStatus) {
  const name = ticketName.value.trim();
  const description = ticketDescription.value.trim();

  if (!name) {
    showFormError('Введите краткое описание тикета');
    ticketName.focus();
    return null;
  }

  hideFormError();

  return {
    name,
    description,
    status: defaultStatus,
  };
}

ticketName.addEventListener('input', hideFormError);
ticketDescription.addEventListener('input', hideFormError);

export function openCreateModal(onSubmit) {
  hideFormError();

  modalTitle.textContent = 'Добавить тикет';
  ticketName.value = '';
  ticketDescription.value = '';

  ticketForm.onsubmit = (event) => {
    event.preventDefault();

    const data = getTicketData(false);

    if (data) {
      onSubmit(data);
    }
  };

  modal.classList.remove('hidden');
  ticketName.focus();
}

export function openEditModal(ticket, onSubmit) {
  hideFormError();

  modalTitle.textContent = 'Редактировать тикет';
  ticketName.value = ticket.name;
  ticketDescription.value = ticket.description;

  ticketForm.onsubmit = (event) => {
    event.preventDefault();

    const data = getTicketData(ticket.status);

    if (data) {
      onSubmit(data);
    }
  };

  modal.classList.remove('hidden');
  ticketName.focus();
}

export function openDeleteModal(onConfirm) {
  confirmDelete.onclick = () => {
    onConfirm();
  };

  confirmModal.classList.remove('hidden');
}

export function closeModals() {
  hideFormError();

  confirmDelete.onclick = null;
  modal.classList.add('hidden');
  confirmModal.classList.add('hidden');
}

modalCancel.addEventListener('click', closeModals);
confirmCancel.addEventListener('click', closeModals);

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModals();
  }
});

confirmModal.addEventListener('click', (event) => {
  if (event.target === confirmModal) {
    closeModals();
  }
});