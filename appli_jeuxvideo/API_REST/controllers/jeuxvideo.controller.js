const Jeu = require("../models/jeuxvideo.model.js");

// créer et save un nouveau jeu
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // créer un jeu
    const jeu = new Jeu({
        libelle: req.body.libelle,
        annee: req.body.annee,
        description: req.body.description,
        crossPlateforme: req.body.crossPlateforme,
        genre: req.body.genre,
        plateforme: req.body.plateforme,
        type: req.body.type,
    });

    // Save un jeu dans la bdd
    Jeu.create(jeu, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the jeu."
            });
        else res.send(data);
    });
};


// Retrieve tous les jeux de la bdd (avec condition).
exports.findAll = (req, res) => {
    const libelle = req.query.libelle;
    Jeu.getAll(libelle, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving jeux."
            });
        else res.send(data);
    });
};


// Find un jeu avec son id
exports.findOne = (req, res) => {
    Jeu.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Jeu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Jeu with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


// Update un jeu avec son id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Jeu.updateById(
        req.params.id,
        new Jeu(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Jeu with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Jeu with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete un jeu avec son id
exports.delete = (req, res) => {
    Jeu.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Jeu with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Jeu with id " + req.params.id
                });
            }
        } else res.send({ message: `Jeu was deleted successfully!` });
    });
};


// Delete tous les jeux de la bdd
exports.deleteAll = (req, res) => {
    Jeu.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};