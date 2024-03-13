import express from "express";
import accountController from '../controller/account.controller'
import { checkJWTbyCookie, checkUserPermission } from '../middleware/JWTMethod'

const router = express.Router();



const initAccountRoute = (app) => {

    router.post("/account/login", accountController.handleLogin)
    router.post("/account/logout", accountController.handleLogout)

    router.post('/account/fetch-user-data', checkJWTbyCookie, checkUserPermission, accountController.getOneUserData)
    router.get('/account/fetch-user-account', checkJWTbyCookie, checkUserPermission, accountController.getOneUserAccount)
    router.put('/account/update-user-data', checkJWTbyCookie, checkUserPermission, accountController.updateUserData)
    router.put('/account/account-update-password', checkJWTbyCookie, checkUserPermission, accountController.changePassword)
    router.get('/account/fetch-all-accounts', checkJWTbyCookie, checkUserPermission, accountController.fetchAllUser)
    router.post('/account/fetch-one-account', checkJWTbyCookie, checkUserPermission, accountController.fetchOneUser)
    router.post('/account/get-account-by-type', checkJWTbyCookie, checkUserPermission, accountController.fetchAccountByType)



    return app.use("/api/", router);

}

export default initAccountRoute;