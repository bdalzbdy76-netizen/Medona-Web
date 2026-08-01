function Modal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="modal__close"
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
