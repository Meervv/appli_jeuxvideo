module.exports = app => {
    const jeux = require("../controllers/jeuxvideo.controller.js");
    var router = require("express").Router();
    // Create a new jeu
    router.post("/", jeux.create);
    // Retrieve all jeux
    router.get("/", jeux.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", jeux.findOne);
    // Update a Tutorial with id
    router.put("/:id", jeux.update);
    // Delete a Tutorial with id
    router.delete("/:id", jeux.delete);
    // Delete all jeux
    router.delete("/", jeux.deleteAll);
    app.use('/api/jeux', router);
};