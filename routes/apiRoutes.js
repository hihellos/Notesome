const express = require("express");
const path = require("path");
const fs = require("fs");
let noteData = require("../db/db.json")

module.exports = function(app) {

    // Read db.json using fs.readFileSync and JSON.parse()
    let dataStr = fs.readFileSync("./db/db.json", "utf8");
    console.log("dataStr", dataStr);

    let noteArray = JSON.parse(dataStr);
    console.log("noteArray", noteArray);

app.get("/api/notes", function(req, res){
    // GET /api/notes - Should read the db.json file and return all saved notes as JSON.
    console.log("getting note");
    res.json(noteArray);

});

app.post("/api/notes", function(req, res){
    // POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
    let newNote = req.body;
    noteArray.push(newNote);
    res.json(noteArray);
    console.log("saving note");

    fs.writeFile("./db/db.json", JSON.stringify(noteArray), function (err) {
        if (err) throw err;
        res.end(noteArray);
        console.log("sucessful write");
    });    

});

app.delete("/api/notes/:id", function(req, res){
    // DELETE /api/notes/:id - Should receive a query parameter containing the id of a  note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    const { id } = req.
    console.log("delete post");
});


}