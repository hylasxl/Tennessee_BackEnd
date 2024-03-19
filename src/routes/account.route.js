import express from "express";
import accountController from '../controller/account.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' })





const initAccountRoute = (app) => {
    

    router.put('/env/update',accountController.setENV)
    
    router.post("/account/login", accountController.handleLogin)
    router.post("/account/logout", accountController.handleLogout)
    router.post('/account/check-exist-email-and-phone',accountController.checkExistMailandPhone)
    router.post('/otp/send-new-otp',accountController.sendNewOtp)
    router.post('/otp/check-otp',accountController.checkOtp)
    router.put('/account/change-password',accountController.accountChangePassword)

    router.post('/account/fetch-user-data', checkJWTbyCookie, checkUserPermission, accountController.getOneUserData)
    router.get('/account/fetch-user-account', checkJWTbyCookie, checkUserPermission, accountController.getOneUserAccount)
    router.put('/account/update-user-data', checkJWTbyCookie, checkUserPermission, accountController.updateUserData)
    router.put('/account/account-update-password', checkJWTbyCookie, checkUserPermission, accountController.changePassword)
    router.get('/account/fetch-all-accounts', checkJWTbyCookie, checkUserPermission, accountController.fetchAllUser)
    router.post('/account/fetch-one-account', checkJWTbyCookie, checkUserPermission, accountController.fetchOneUser)
    router.post('/account/get-account-by-type', checkJWTbyCookie, checkUserPermission, accountController.fetchAccountByType)
    router.post('/account/add-new-high-level-account', checkJWTbyCookie, checkUserPermission, accountController.addNewHighAccount)
    router.post('/account/fetch-avatar', checkJWTbyCookie, checkUserPermission, accountController.fetchAvatar)
    router.post('/account/change-avatar', checkJWTbyCookie, checkUserPermission, upload.single('image'), accountController.changeAvatar)



    return app.use("/api/", router);

}

export default initAccountRoute;