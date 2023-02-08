const Tought = require("../models/Tought");
const User = require("../models/User");

module.exports = class ToughtController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });

    // check if user exists
    if (!user) {
      res.redirect("/login");
    }

    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyToughts = true;

    if (toughts.length > 0) {
      emptyToughts = false;
    }

    console.log(toughts);
    console.log(emptyToughts);

    res.render("toughts/dashboard", { toughts, emptyToughts });
  }

  static createTought(req, res) {
    res.render("toughts/create");
  }

  static async createToughtSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    await Tought.create(tought)
      .then(() => {
        req.flash("message", "Pensamento criado com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log("Aconteceu um erro: " + err));
  }

  static async updateToughtSave(req, res) {
    const id = req.body.id;

    const tought = {
      title: req.body.title,
    };

    await Tought.update(tought, { where: { id: id } })
      .then(() => {
        req.flash("message", "Pensamento editado com sucesso!");
        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log("Aconteceu um erro: " + err));
  }

  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;

    await Tought.destroy({ where: { id: id, UserId: UserId } })
      .then(() => {
        req.flash("message", "Pensamento removido com sucesso!");

        req.session.save(() => {
          res.redirect("/toughts/dashboard");
        });
      })
      .catch((err) => console.log("Aconteceu um erro: " + err));
  }

  static async updateTought(req, res) {
    const id = req.params.id;

    Tought.findOne({ where: { id: id }, raw: true })
      .then((tought) => {
        res.render("toughts/edit", { tought });
      })
      .catch((err) => console.log());
  }
};
