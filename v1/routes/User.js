const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "public/uploads/user",
    filename: function (req, file, cb) {
        const extension = "".concat(file.originalname).split(".").pop();
        const filename = Date.now().toString(36);
        cb(null, `${filename}.${extension}`);
    },
});
const upload = multer({ storage });

const Auth = require("../../common/authenticate");
const Controller = require("../controllers");

//  ONBOARDING API'S
router.post("/register", Controller.User.register);
router.post("/login", Controller.User.login);
router.post("/socialLogin", Controller.User.socialLogin);
router.post("/logout", Auth.verify("User"), Controller.User.logout);
router.get("/getProfile", Auth.verify("User"), Controller.User.getProfile);
router.put("/updateProfile", Auth.verify("User"), Controller.User.updateProfile);
router.post("/changePassword", Auth.verify("User"), Controller.User.changePassword);
router.post("/uploadFile", upload.single("file"), Controller.User.uploadFile);



//CRUD OF ORDER 

router.post("/createOrder", Auth.verify("User"), Controller.User.createOrder);
router.get("/getOrder", Auth.verify("User"), Controller.User.getOrder);
router.put("/editOrder/:id", Auth.verify("User"), Controller.User.editOrder);

module.exports = router;
