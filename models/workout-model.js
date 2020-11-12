const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: 
    [
        {
            type: {
                type: String,
                trim: true,
                required: "Type is Required"
            },
            name: {
                type: String,
                trim: true,
                required: "Name is Required"
            },
            duration: {
                    type: Number,
                    required: "Duration is required, enter amount of minutes."
            },
            weight: {type: Number},
            reps: {type: Number},
            sets: {type: Number},
            distance: {type: Number}
        }
    ]
},{
    toJSON:{
        virtuals:true
    }
}
);
WorkoutSchema.virtual("totalDuration").get(function(){
    return this.exercises.reduce((total,exercise)=>{
        return total + exercise.duration
    },0)
})
const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;

