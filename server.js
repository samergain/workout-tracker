const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout-model");
//const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", { useNewUrlParser: true });
mongoose.connect(
    process.env.MONGDB_URI || 'mongodb://localhost/workoutDB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
);
  

//////routes/////////
var path = require("path");
//   GET  /api/workouts
app.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
});
//   POST /api/workouts
app.post("/api/workouts", ({body}, res) => {
        const workout = new Workout(body);
        Workout.create(workout)
          .then(result => {
            res.json(result);
          })
          .catch(err => {
            res.json(err);
          });
});

//   PUT  /api/workouts/:id
app.put("/api/workouts/:id", ({body,params}, res) => {
    Workout.findByIdAndUpdate(params.id,
      {
        $push: {exercises: body}
      },
      {
       new: true,
       runValidators: true
      },
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
//   GET  /api/workouts/range
app.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
});
//   GET  /exercise
app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
})
//   GET  /stats
app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
