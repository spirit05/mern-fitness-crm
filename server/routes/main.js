const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello St");
})

module.exports = router;

//https://otus.ru/redirect/?to=https%3A%2F%2Ft.me%2Fbondarevms