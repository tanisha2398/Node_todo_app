const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");
const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { User } = require("./../models/user");
const { todos, populateTodos, users, populateUsers } = require("./seed/seed");
beforeEach(populateUsers);
beforeEach(populateTodos);

// const todos = [
//   {
//     _id: new ObjectID(),
//     text: "First test todo"
//   },
//   {
//     _id: new ObjectID(),
//     text: "Second test todo",
//     completed: true,
//     completedAt: 333
//   }
// ];

// beforeEach(function(done) {
//   this.timeout(5000);
//   Todo.deleteMany({})
//     .then(() => {
//       return Todo.insertMany(todos);
//     })
//     .then(() => done());
// });

describe("POST /todos", () => {
  it("should create new todo", done => {
    var text = "Test todo text";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });
  it("should not create todo with invalid body data ", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET/todos/:id", () => {
  it("should retorn todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404 if todo not found", done => {
    var id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .send({ id })
      .expect(404)
      .end(done);
  });
  it("should return 404 for non-object id", done => {
    request(app)
      .get("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("DELETE/TODOS/:ID", () => {
  it("should remove a todo", done => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should return 404 if todo not found", done => {
    var id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if Object id is not valid", done => {
    request(app)
      .delete("/todos/123")
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should update todo", done => {
    var hexId = todos[0]._id.toHexString();
    var text = "this should be new text";
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe("number");
      })
      .end(done);
  });
  it("should clear completedAt when todo is not completed", done => {
    var hexId = todos[1]._id.toHexString();
    var text = "This is for second test";
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: false
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});

describe("GET /users/me", () => {
  it("should return user if authenticated", done => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it("should return 401 if not authenticated", done => {
    request(app)
      .get("/users/me")
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe("POST /users", () => {
  it("should create a user", done => {
    var email = "tanbi@gmail.com";
    var password = "abc123";
    request(app)
      .post("/users")
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.header["x-auth"]).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({ email }).then(user => {
          expect(user).toBeTruthy();
          // expect("user.password").toBeFalsy(password);
          done();
        });
      });
  });
  it("should return validation error if request is invalid", done => {
    request(app)
      .post("/users")
      .send({
        email: "123",
        password: "acc"
      })
      .expect(400)
      .end(done);
  });
  it("should not create user if email in use", done => {
    request(app)
      .post("/users")
      .send({
        email: users[0].email,
        password: "Password123!"
      })
      .expect(400)
      .end(done);
  });
});
