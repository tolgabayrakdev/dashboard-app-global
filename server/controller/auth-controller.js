class AuthController {

    async Login(req, res) {
       console.log("Controller login function");
       res.send("Deneme")
    }

    async Register(req, res) {
        console.log("Controller register function");
    }
}


export default AuthController