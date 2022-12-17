class AppError {
  constructor(state, description, details) {
    this.state = state;
    this.description = description;
    this.details = details;
  }
}

module.exports = AppError;
