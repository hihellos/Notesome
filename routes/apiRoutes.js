const express = require("express");
const path = require("path");
const fs = require("fs");
let noteData = require("../db/db.json")

module.exports = function(app) {

    // Read db.json using fs.readFileSync and JSON.parse()
    let dataStr = fs.readFileSync("./db/db.json", "utf8");
    // let noteArray = JSON.parse(dataStr);

    app.get("/api/notes", function(req, res){
        // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
        console.log("getting note");
        res.json(noteData);
    });

    app.post("/api/notes", function(req, res){
        // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
        let newNote = req.body;
        newNote.id = Math.floor(Math.random() * 10000);

        noteData.push(newNote);
        res.json(noteData);

        fs.writeFile("./db/db.json", JSON.stringify(noteData), function (err) {
            if (err) throw err;
            res.end(noteData);
            console.log("sucessful write");
        });    

        console.log("saving note");
    });

    app.delete("/api/notes/:id", function(req, res){
        // DELETE /api/notes/:id - Should receive a query parameter containing the id of a  note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

        // read file
        const notes = JSON.parse(fs.readFileSync("./db/db.json"));
        let id = req.params.id;

        // filter through array and rewrite without the note matching selected id
        let deleteNote = notes.filter(notes => notes.id != id);

        fs.writeFile("./db/db.json", JSON.stringify(deleteNote), function (err) {
            if (err) throw err;
            console.log("sucessful write new");
        });    
        
        noteData = deleteNote;
        res.json(deleteNote);
        console.log("deleting note");
    });
}