const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

const checkAuth = require("../helpers/auth").checkAuth;

router.get("/", ToughtController.showToughts);
router.get("/edit/:id", checkAuth, ToughtController.updateTought);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post('/edit', checkAuth, ToughtController.updateToughtSave)
router.post("/remove", checkAuth, ToughtController.removeTought);
router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);

module.exports = router;
