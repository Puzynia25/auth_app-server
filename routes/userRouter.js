const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/check", userController.check);
router.post("/find-user", userController.isFindUser);
router.get("/table", userController.getAll);
router.delete("/delete", userController.deleteUser);
router.patch("/status", userController.updateUsersStatus);

module.exports = router;
