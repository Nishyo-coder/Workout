// The user should be able to:
// * Add exercises to the most recent workout plan.
// * Add new exercises to a new workout plan.
// * View the combined weight of multiple exercises from the past seven workouts on the `stats` page.
// * View the total duration of each workout from the past seven workouts on the `stats` page.

const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workout")

// db.scores.aggregate( [
//   {
//     $addFields: {
//       totalHomework: { $sum: "$homework" } ,
//       totalQuiz: { $sum: "$quiz" }
//     }
//   },
//   {
//     $addFields: { totalScore:
//       { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
//   }
// ] )

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      },
    },
  ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

// router.get("/api/workouts", (req, res) => {
//   Workout.find({})
//     .sort({ date: -1 })
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// GET http://localhost:3000/api/workouts/range 404 (Not Found)
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalWeight: { $sum: "$exercises.weight" },
        totalDuration: { $sum: "$exercises.duration" }
      },
    },
  ])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});


router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create({body})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log({body})
  Workout.findByIdAndUpdate(params.id,
    { $set: { exercises:body } },
    { new: true })
    .then(dbWorkout => {
      console.log({ dbWorkout})
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/", (req, res) => {
//   Transaction.find({})
//     .sort({ date: -1 })
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });


router.delete("/api/workouts", (req, res) => {
  res.end('Deleting workouts:' + req.params.id)

});

module.exports = router;
