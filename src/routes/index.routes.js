module.exports = (app) => {
  app.use("/api/user", require("./user.routes"));
  app.use("/api/task", require("./tasks.routes"));
  app.use("/api/post", require("./post.routes"));
  app.use("/api/profile", require("./profile.routes"));
  app.use("/api/repository", require("./repository.routes"));
  app.use("/api/issues", require("./issues.routes"));
};
