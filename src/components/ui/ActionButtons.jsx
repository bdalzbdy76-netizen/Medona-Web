import { Pencil, Trash2 } from "lucide-react";

function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="action-buttons">
      <button
        onClick={onEdit}
        className="action-buttons__btn action-buttons__btn--edit"
        aria-label="تعديل"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="action-buttons__btn action-buttons__btn--delete"
        aria-label="حذف"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default ActionButtons;
