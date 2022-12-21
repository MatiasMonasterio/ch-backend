class AuthorDTO {
  constructor(author) {
    this.id = author.id;
    this.name = author.name;
    this.lastname = author.lastname;
    this.email = author.email;
    this.age = author.age;
    this.alias = author.alias;
    this.avatar = author.avatar;
  }
}

module.exports = AuthorDTO;
