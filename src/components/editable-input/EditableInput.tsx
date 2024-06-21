import { ChangeEvent, useState } from "react";

type Props = {
  item: { id: number; text: string };
  handleDelete: (id: number) => () => void;
  handleEdit: (id: number, text: string) => void;
};

export function EditableInput({
  item,
  handleDelete,
  handleEdit,
}: Readonly<Props>) {
  const [onEdit, setOnEdit] = useState(false);
  const handleSetEdit = () => setOnEdit((state) => !state);
  const handleCancelEdit = () => setOnEdit(false);
  const [inputValue, setInputValue] = useState(item.text);

  const handleType = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleApplyEdit = () => {
    setOnEdit(false);
    handleEdit(item.id, inputValue);
  };

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: "1",
  };
  const buttons = { display: "flex", gap: "10px" };

  return (
    <>
      {onEdit ? (
        <div style={style}>
          <input
            onChange={handleType}
            value={inputValue}
            className="editable-input"
          />
          <div style={buttons}>
            <button onClick={handleApplyEdit}>Apply</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={style}>
          <p>{inputValue}</p>
          <div style={buttons}>
            <button onClick={handleDelete(item.id)}>Delete</button>
            <button onClick={handleSetEdit}>Edit</button>
          </div>
        </div>
      )}
    </>
  );
}
