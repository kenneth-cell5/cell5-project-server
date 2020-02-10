import { Meteor } from "meteor/meteor";
import FamousPersons from "./lib/collections/FamousPersons.js";

Router.route("/famous_persons", { where: "server" })
  .get(function() {
    var response = FamousPersons.find().fetch();
    this.response.setHeader("Content-Type", "application/json");
    this.response.end(JSON.stringify(response));
  })
  .post(function() {
    var response;
    if (
      this.request.body.name === undefined ||
      this.request.body.name === null ||
      this.request.body.name === ""
    ) {
      response = {
        error: true,
        message: "invalid data"
      };
    } else {
      FamousPersons.insert({
        id: 2,
        name: this.request.body.name
      });
      response = {
        error: false,
        message: "message added."
      };
    }
    this.response.setHeader("Content-Type", "application/json");
    this.response.end(JSON.stringify(response));
  });

Router.route("/famous_persons/:id", { where: "server" })

  // GET /message/:id - returns specific records

  .get(function() {
    var response;
    if (this.params.id !== undefined) {
      var data = FamousPersons.find({ _id: this.params.id }).fetch();
      if (data.length == 0) {
        response = data;
      } else {
        response = {
          error: true,
          message: "Record not found."
        };
      }
    }
    this.response.setHeader("Content-Type", "application/json");
    this.response.end(JSON.stringify(response));
  })

  // PUT /message/:id {message as put data}- update specific records.

  .put(function() {
    var response;
    if (this.params.id !== undefined) {
      var data = FamousPersons.find({ _id: this.params.id }).fetch();
      if (data.length == 0) {
        if (
          FamousPersons.update(
            { _id: data[0]._id },
            { $set: { name: this.request.body.name } }
          ) === 1
        ) {
          response = {
            error: false,
            message: "Message updated."
          };
        } else {
          response = {
            error: true,
            message: "Message not updated."
          };
        }
      } else {
        response = {
          error: true,
          message: "Record not found."
        };
      }
    }
    this.response.setHeader("Content-Type", "application/json");
    this.response.end(JSON.stringify(response));
  })

  // DELETE /message/:id delete specific record.

  .delete(function() {
    var response;
    if (this.params.id !== undefined) {
      var data = FamousPersons.find({ _id: this.params.id }).fetch();
      if (data.length == 0) {
        if (FamousPersons.remove(data[0]._id) === 1) {
          response = {
            error: false,
            message: "Message deleted."
          };
        } else {
          response = {
            error: true,
            message: "Message not deleted."
          };
        }
      } else {
        response = {
          error: true,
          message: "Record not found."
        };
      }
    }
    this.response.setHeader("Content-Type", "application/json");
    this.response.end(JSON.stringify(response));
  });
