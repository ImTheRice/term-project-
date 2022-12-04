let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database[req.session.passport.user].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.passport.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[req.session.passport.user].reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database[req.session.passport.user].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[req.session.passport.user].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.passport.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.passport.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title
    searchResult.description = req.body.description
    searchResult.completed = req.body.completed
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    // Implement this code
    let reminderToFind = req.params.id;
    let searchResult = database[req.session.passport.user].reminders.find(function (reminder) {
      return reminder.id == reminderToFind
    })
    database[req.session.passport.user].reminders.splice((searchResult.id - 1), 1)
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
