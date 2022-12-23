const userService = require('../service/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res, next) {
    try {
      res.json('server works');
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
  async logout(req, res, next) {
    try {
      res.json('server works');
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Logout error" });
    }
  }
  async activate(req, res, next) {
    try {
      res.json('server works');
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Activation error" });
    }
  }
  async refresh(req, res, next) {
    try {
      res.json('server works');
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Refresh error" });
    }
  }
  async getUsers(req, res, next) {
    try {
      res.json([123, '456']);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Get users error" });
    }
  }
  // async registration(req, res, next){
  //   try {
  //     res.json('server works');
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ message: "Registration error" });
  //   }
  // }
}

module.exports = new UserController();