import React from 'react'
import MDEditor from '@uiw/react-md-editor';

const Editor = ({ currentNote, updateNote }) => {
 
  return (
    <section className="pane editor">
        <MDEditor
            value={currentNote.body}
            onChange={updateNote}

        />
        <MDEditor.Markdown source={currentNote.body} 
        style={{ whiteSpace: 'pre-wrap' }} 
        />
    </section>
)
}

export default Editor