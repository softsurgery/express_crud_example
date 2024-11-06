const Note = require('../models/note.model');

const createNote = async (req, res) => {
  try {
    const userId = req.query.user_id; // Get the user_id from the route parameters

    if (!userId) {
      return res.status(400).send({ error: 'User ID is required to create a note' });
    }

    const note = new Note({
      content: req.body.content,
      user: userId // Set the user field to the passed user ID
    });

    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send({
      error: 'Unable to create note',
      details: error
    });
  }
};

// Get all notes for a specific user
const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.query.user_id });
    if (notes.length === 0) {
      return res.status(404).send({ message: 'No notes found for this user' });
    }
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send({ error: 'Unable to retrieve notes', details: error });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['content', 'archived'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.query.user_id });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }

    updates.forEach((update) => (note[update] = req.body[update]));
    await note.save();
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send({ error: 'Unable to update note', details: error });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.query.user_id });
    if (!note) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send({ message: 'Note deleted successfully', note });
  } catch (error) {
    res.status(500).send({ error: 'Unable to delete note', details: error });
  }
};

module.exports = {
  createNote,
  getUserNotes,
  updateNote,
  deleteNote
};
