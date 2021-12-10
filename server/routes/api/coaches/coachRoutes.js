const express = require("express");
const Coach = require("../../../models/coach")
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const coaches = await Coach.find().select("-__v");
        return res.json(coaches);
    } catch (e) {
        return res.status(500);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const coach = await Coach.findById(id).select("-__v");
        if (!coach) return res.status(404).json(`Coach ${ id } not found!`)
        return res.json(coach);
    } catch (e) {
        return res.status(500);
    }
});

router.post("/", async (req, res) => {
    const {
        fio,
        date,
        status,
        comment
    } = req.body;

    const newCoach = new Coach({
        fio,
        date,
        status,
        comment
    });

    try {
        await newCoach.save();
        return res.json("Coach created");
    } catch (e) {
        return res.status(500);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;

    const {
        fio,
        date,
        status,
        comment
    } = req.body;

    try {
        const coach = Coach.findByIdAndUpdate(id, {
            fio,
            date,
            status,
            comment
        });

        if (!coach) return res.status(404).json(`Coach ${ id } not found!`)

        return res.json("Coach updated")
    } catch (e) {
        return res.status(500);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const coach = await Coach.findByIdAndRemove(id);

        if (!coach) return res.status(404).json(`Coach ${ id } not found!`)

        return res.json("Coach was deleted");
    } catch (e) {
        return res.status(500);
    }
})

module.exports = router;