const sql = require("./db.js");
// constructor
const Jeu = function(jeu) {
    this.libelle = jeu.libelle;
    this.annee = jeu.annee;
    this.description = jeu.description;
    this.crossPlateforme = jeu.crossPlateforme;
    this.genre = jeu.genre;
    this.plateforme = jeu.plateforme;
    this.type = jeu.type;
};

Jeu.create = (newJeux, result) => {
    sql.query("INSERT INTO jeux SET ?", newJeux, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created jeu: ", { id: res.insertId, ...newJeux });
        result(null, { id: res.insertId, ...newJeux });
    });
};

Jeu.findById = (id, result) => {
    sql.query(`SELECT * FROM jeux WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found jeu: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Jeu.getAll = (jeu, result) => {
    let query = "SELECT * FROM jeux";
    if (jeu) {
        query += ` WHERE title LIKE '%${jeu}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("jeux: ", res);
        result(null, res);
    });
};

Jeu.updateById = (id, jeu, result) => {
    sql.query(
        "UPDATE jeux SET libelle=?, annee=?, description=?, crossPlateforme=?, genre=?, plateforme=?, type=? WHERE id = ?", [jeu.libelle, jeu.annee, jeu.description, jeu.crossPlateforme, jeu.genre, jeu.plateforme, jeu.type, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found jeu with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated jeu: ", {
                id: id,
                libelle: jeu.libelle,
                annee: jeu.annee,
                description: jeu.description,
                crossPlateforme: jeu.crossPlateforme,
                genre: jeu.genre,
                plateforme: jeu.plateforme,
                type: jeu.type,
            });
            result(null, {
                id: id,
                libelle: jeu.libelle,
                annee: jeu.annee,
                description: jeu.description,
                crossPlateforme: jeu.crossPlateforme,
                genre: jeu.genre,
                plateforme: jeu.plateforme,
                type: jeu.type
            });
        }
    );
};

Jeu.remove = (id, result) => {
    sql.query("DELETE FROM jeux WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found jeu with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted jeu with id: ", id);
        result(null, res);
    });
};

Jeu.removeAll = result => {
    sql.query("DELETE FROM jeux", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} jeux`);
        result(null, res);
    });
};

module.exports = Jeu;