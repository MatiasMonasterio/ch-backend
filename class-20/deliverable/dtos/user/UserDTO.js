class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.password = user.password;
  }
}

module.exports = UserDTO;
