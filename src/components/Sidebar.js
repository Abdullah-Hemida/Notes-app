import React from "react";
import { AiFillDelete } from "react-icons/ai";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({
  Notes,
  createNewNote,
  CurrentNote,
  setCurrentNoteId,
  showDeleteModal,
  IsAlertVisible,
  noteMessage
}) => {
  const elements = (
    <div className="notes">
      {
        IsAlertVisible &&
       (
        <Alert className="deleted-alert"  variant="success">
          {noteMessage}
        </Alert>
      )}
      {Notes.map((Note) => {
        return (
          <div
            className={`note ${
              Note.id === CurrentNote.id ? "selected-note" : ""
            }`}
            key={Note.id}
          >
            <div
              className="note-element"
              onClick={() => setCurrentNoteId(Note.id)}
            >
              {" "}
              {Note.body.split("\n")[0].slice(2)}
            </div>
            <div
              className="delete-btn text-danger cursor"
              onClick={() => showDeleteModal(Note.id)}
            >
              <AiFillDelete className="delete-icon" />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="Sidebar">
      <div className="header">
        <h2>Notes</h2>
        <button onClick={createNewNote} className="addNote-btn">+</button>
      </div>
      {elements}
    </div>
  );
};

export default Sidebar;
