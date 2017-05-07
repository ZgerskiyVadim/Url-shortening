'use strict';
var express = require('express');
var router = express.Router();
var NoteCtrl = require('../controllers/note');

router.get('/notes', NoteCtrl.getAllNotes);

router.post('/notes', NoteCtrl.createNewNote);

router.get('/notes/:id', NoteCtrl.getNoteById);

router.get('/notes/byUser/:id', NoteCtrl.getNoteByUserId);

router.put('/notes/:id', NoteCtrl.updateNoteById);

router.delete('/notes/:id', NoteCtrl.deleteNoteById);

module.exports = router;