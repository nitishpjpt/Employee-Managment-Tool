import React, { useState, useEffect } from "react";
import EmpDashboard from "../pages/EmpDashboard";

const EmpNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("employeeNotes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage when they are updated
  useEffect(() => {
    localStorage.setItem("employeeNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim() === "") return;
    setNotes([
      ...notes,
      { text: newNote, timestamp: new Date().toLocaleString() },
    ]);
    setNewNote("");
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <>
      <EmpDashboard />
      <div className=" p-6 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Employee Notes</h2>
          </div>
          <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 text-center">
                <p className="text-gray-600 text-sm sm:text-base">
                  Keep track of your important thoughts and tasks.
                </p>
              </div>

              {/* Input Section */}
              <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Add a New Note
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Write something..."
                    className="flex-1 px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button
                    className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={handleAddNote}
                  >
                    Add Note
                  </button>
                </div>
              </div>

              {/* Notes Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.length > 0 ? (
                  notes.map((note, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-lg p-5 transition hover:shadow-lg"
                    >
                      <p className="text-gray-800 font-medium mb-2">
                        {note.text}
                      </p>
                      <p className="text-sm text-gray-500">{note.timestamp}</p>
                      <button
                        className="mt-3 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleDeleteNote(index)}
                      >
                        Delete Note
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center">
                    <p className="text-gray-600 text-lg">
                      You don't have any notes yet. Start by adding one!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpNotes;
