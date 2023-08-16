import { React, useState, useEffect } from "react";
import "./App.css";
import Split from "react-split";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { nanoid } from "nanoid";
import DeleteConfirmation from "./components/DeleteConfirmation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [Notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("storedNotes")) || [];
  });

  const [CurrentNoteId, setCurrentNoteId] = useState(
    (Notes[0] && Notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("storedNotes", JSON.stringify(Notes));
  }, [Notes]);

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [noteMessage, setnoteMessage] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "## Note Title \n\n Write your notes here"
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function findCurrentNote() {
    return Notes.find((note) => {
      return note.id === CurrentNoteId || note[0];
    });
  }

  function updateNote(text) {
    // update text of note
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === CurrentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );

    // order the notes according to updating state
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        oldNote.id === CurrentNoteId
          ? newArray.unshift(oldNote)
          : newArray.push(oldNote);
      }
      return newArray;
    });
  }

  // Handle the displaying of the modal based on id
  const showDeleteModal = (id) => {
    setId(id);
    setnoteMessage(null);
    setDeleteMessage(
      `Are you sure you want to delete the '${Notes.find(
        (x) => x.id === id
      )
        .body.split("\n")[0]
        .slice(2)} note'?`
    );
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    setnoteMessage(
      `The'${Notes.find((x) => x.id === id)
        .body.split("\n")[0]
        .slice(2)}' note was deleted successfully.`
    );
    setNotes((Notes) => Notes.filter((oldNote) => oldNote.id !== id));
    const residualNote = Notes.filter((note) => note.id !== id);
    setCurrentNoteId(() => (Notes.length > 1 ? residualNote[0].id : ""));
    setDisplayConfirmationModal(false);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
  };
  return (
    <main>
      {Notes.length > 0 ? (
        <Split className="wrap" sizes={[25, 75]} direction="horizontal">
          <Sidebar
            Notes={Notes}
            createNewNote={createNewNote}
            CurrentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            showDeleteModal={showDeleteModal}
            noteMessage={noteMessage}
            IsAlertVisible={isAlertVisible}
          />
          <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          <DeleteConfirmation
            showModal={displayConfirmationModal}
            confirmModal={submitDelete}
            hideModal={hideConfirmationModal}
            id={id}
            message={deleteMessage}
          />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button onClick={createNewNote}>Creat one now</button>
        </div>
      )}
    </main>
  );
}

export default App;
