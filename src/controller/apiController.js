
import loginService from '../service/loginService'

const handleLogin = async(req,res) => {
    try {
         let data = await loginService.userLogin(req.body)
        // console.log(req.body);

        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:data.DT
        })
    } catch (e) {
        return res.status(500).json({
            EM: "An error has occured",
            EC: '-1',
            DT: ''
        })
    }
}

module.exports = {
    handleLogin
}