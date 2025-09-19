import React, { useState } from 'react';

export default function PocketNotesApp() {
  const [groups, setGroups] = useState([
    { name: 'My Notes', color: 'blue', notes: [] },
    { name: 'My personal grp', color: 'violet', notes: [] },
    { name: 'Javascript grp', color: 'pink', notes: [] },
    { name: 'HTML grp', color: 'cyan', notes: [] },
    { name: 'CSS Notes', color: 'orange', notes: [] },
    { name: 'SQL Notes', color: 'sky', notes: [] },
    { name: 'Python Notes', color: 'purple', notes: [] },
  ]);
  const [selected, setSelected] = useState(0);
  const [newNote, setNewNote] = useState('');

  // Group create handling
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('purple');

  function handleCreateGroup() {
    if (newGroupName.trim() === '') return alert('Group name cannot be empty');
    setGroups([
      ...groups,
      { name: newGroupName.trim(), color: newGroupColor, notes: [] },
    ]);
    setNewGroupName('');
    setShowCreateGroup(false);
    setSelected(groups.length); // Auto-select new group
  }

  function handleNoteSubmit(e) {
    e.preventDefault();
    if (newNote.trim() === '') return;
    const now = new Date();
    const noteObj = {
      text: newNote.trim(),
      time: now.toLocaleString(),
    };
    setGroups(groups =>
      groups.map((grp, i) =>
        i === selected
          ? { ...grp, notes: [...grp.notes, noteObj] }
          : grp
      )
    );
    setNewNote('');
  }

  return (
    <>
      <div className="main-container">
        <div className="sidebar">
          <h2>Pocket Notes</h2>
          <div className="group-list">
            {groups.map((grp, idx) => (
              <div
                key={idx}
                className={`group-item${selected === idx ? ' selected' : ''}`}
                onClick={() => setSelected(idx)}
              >
                <span className={`group-icon ${grp.color}`}>
                  {grp.name.slice(0, 2).toUpperCase()}
                </span>
                {grp.name}
              </div>
            ))}
          </div>
          <button className="add-group-btn" onClick={() => setShowCreateGroup(true)}>
            +
          </button>
        </div>
        <div className="main-content">
          <div className="notes-section">
            <div className="notes-list">
              {groups[selected].notes.length === 0 ? (
                <div style={{ color: "#999", textAlign: "center", margin: "30px" }}>
                  No notes yet.
                </div>
              ) : (
                groups[selected].notes.map((note, idx) => (
                  <div key={idx} className="note-card">
                    {note.text}
                    <div className="note-meta">{note.time}</div>
                  </div>
                ))
              )}
            </div>
            <form className="note-input-row" onSubmit={handleNoteSubmit}>
              <input
                className="note-input"
                type="text"
                placeholder="Enter your text here..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
              />
              <button type="submit" className="send-btn">&#8594;</button>
            </form>
          </div>
        </div>
      </div>
      {showCreateGroup && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Create New group</h3>
            <label>
              Group Name
              <input
                type="text"
                placeholder="Enter group name"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                style={{
                  border: '1.5px solid #3f71f8',
                  borderRadius: '6px',
                  padding: '10px 8px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </label>
            <div className="color-row">
              {['purple', 'violet', 'cyan', 'pink', 'orange', 'blue'].map(clr => (
                <span
                  key={clr}
                  className={`color-dot ${clr}`}
                  style={{
                    border: newGroupColor === clr ? '2px solid #444' : 'none',
                  }}
                  onClick={() => setNewGroupColor(clr)}
                ></span>
              ))}
            </div>
            <button className="create-btn" onClick={handleCreateGroup}>
              Create
            </button>
          </div>
        </div>
      )}
      <style>{`
        .main-container { display: flex; height: 100vh; font-family: Arial, sans-serif; }
        .sidebar { width: 250px; background: #F7F8FA; padding: 20px; position: relative; overflow-y: auto;}
        .group-list { margin-top: 20px; }
        .group-item { display: flex; align-items: center; margin-bottom: 12px; cursor: pointer; padding: 5px; border-radius: 8px;}
        .group-item.selected { background: #DCF6FE; }
        .group-icon { display: inline-block; width: 32px; height: 32px; border-radius: 50%; text-align: center; line-height: 32px; margin-right: 8px; color: #fff; font-weight: bold; font-size: 14px; }
        .group-icon.blue { background: #2F72FA; }
        .group-icon.violet { background: #7265E3; }
        .group-icon.pink { background: #DF5DE4; }
        .group-icon.cyan { background: #4FD8EE; }
        .group-icon.orange { background: #FC724D; }
        .group-icon.sky { background: #56B2D6; }
        .group-icon.purple { background: #CB52B0; }
        .add-group-btn { background: #7265E3; color: #fff; font-size: 26px; border-radius: 50%; width: 40px; height: 40px; border: none; position: absolute; bottom: 30px; left: 20px; cursor: pointer; }
        .main-content { flex: 1; background: #E2EEFC; padding: 40px; position: relative;}
        .notes-section { margin-top: 20px; display: flex; flex-direction: column; height: 100%;}
        .notes-list { flex: 1; overflow-y: auto; }
        .note-card { background: #fff; border-radius: 8px; padding: 18px; margin-bottom: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); font-size: 14px; }
        .note-meta { font-size: 12px; color: #888; margin-top: 10px; }
        .note-input-row { display: flex; align-items: center; background: #fff; border-radius: 10px; border: 3px solid #3f71f8; padding: 8px 12px; margin-top: auto;}
        .note-input { flex: 1; border:none; outline: none; font-size:15px; padding: 8px; }
        .send-btn { background: none; border: none; color: #3f71f8; font-size: 28px; cursor: pointer; margin-left: 8px; transition: transform 0.1s;}
        .send-btn:active { transform: scale(1.2);}
        /* Modal CSS and other color/utility classes from previous code should remain */
        .modal-bg {
          position: fixed;
          top:0; left:0; width:100%; height:100%;
          background: rgba(22, 22, 22, 0.24);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }
        .modal-content { background: #fff; padding: 34px 20px; border-radius: 12px; min-width: 340px; box-shadow: 0 2px 12px rgba(0,0,0,0.12);}
        .color-row { display: flex; gap: 10px; margin-top: 10px; margin-bottom: 18px;}
        .color-dot { width: 26px; height: 26px; border-radius: 50%; display: inline-block; cursor: pointer;}
        .color-dot.purple { background: #A084E8; }
        .color-dot.violet { background: #7265E3; }
        .color-dot.cyan { background: #4FD8EE; }
        .color-dot.pink { background: #DF5DE4; }
        .color-dot.orange { background: #FC724D; }
        .color-dot.blue { background: #2F72FA; }
        .create-btn {
          background: #7265E3;
          color: #fff;
          font-weight: 600;
          padding: 8px 28px;
          border-radius: 6px;
          border: none;
          font-size: 18px;
          cursor: pointer;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
}
