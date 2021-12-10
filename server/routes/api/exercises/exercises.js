const express = require("express");
const Exercise = require("../../../models/exercise");
const router = express.Router();

router.get("/:type", async (req, res) => {
    const { type } = req.params;
    let exercise;

    try {
            if (type !== 'group' && type !== 'personal') {
                exercise = await Exercise.findById(type).select("-__v")
            } else {
                exercise = await Exercise.find({ type }).select("-__v");
            }
        return exercise ? res.json(exercise) : res.status(404).json('Занятие не найдено');
    } catch (e) {
        return res.status(500);
    }
});
 
router.post("/", async (req, res) => {
    const {
        client,
        coach,
        name,
        date,
        type,
        comment
    } = req.body;

    const newExercise = new Exercise({
        client,
        coach,
        name,
        date,
        type,
        comment
    });

    try {
        await newExercise.save();
        return res.json("Exercise was created");
    } catch (e) {
        return res.status(500);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    
    const {
        client,
        coach,
        name,
        date,
        type,
        comment
    } = req.body;

    try {
        const exercise = await Exercise.findByIdAndUpdate(id, {
            client,
            coach,
            name,
            date,
            type,
            comment
        });
        if (!exercise) return res.status(404).json(`Exercise ${ id } not found!`);
        return res.json("Exercise was updated!");
    } catch (e) {
        return res.status(500);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const exercise = await Exercise.findByIdAndDelete(id);
        if (!exercise) return res.status(404).json(`Exercise ${ id } not found!`);
    } catch (e) {
        return res.status(500);
    }
});

module.exports = router;