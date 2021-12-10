const express = require("express");
const router = express.Router();
const Client = require("../../../models/clients");

const expiredHandler = (expired, date) => {
    const expDate = c => {
        let month = date.getMonth() + c + 1;
        const year = month > 12 ? date.getFullYear() + 1 : date.getFullYear();
        const day = date.getDate();
        month = month > 12 ? month - 12 : month;
        
        return `${year}-${month}-${day}`;
    };

    switch (expired) {
        case 'год':
            expired = `${date.getFullYear() + 1}-${date.getMonth()}-${date.getDate()}`;
            break;
        case 'месяц': 
            expired = expDate(1);
            break;
        case '3 месяца': 
            expired = expDate(3);
            break;
        case '6 месяцев':
            expired = expDate(6);
            break;
        default:
            expired = date;
    }

    return expired;
}

router.get('/', async (req, res) => {
    const clients = await Client.find().select("-__v");
    res.json(clients)
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findById(id).select("-__v");
        res.json(client);
    } catch (e) {
        res.statusCode(404).json(`Запрашиваемого клиента нет в базе`);
    }
});

router.post('/', async (req, res) => {
    const {
        fio,
        dataBuy,
        firstCame,
        lastCame,
        phone,
        expired,
        status,
        coach
    } = req.body;

    const newClient = new Client({
        fio,
        dataBuy,
        firstCame,
        lastCame,
        expired,
        phone,
        status,
        coach
    });

    try {
        await newClient.save();
        res.json("Клиент добавлен");
    } catch (e) {
        console.error(e);
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    
    const {
        fio,
        dataBuy,
        firstCame,
        lastCame,
        expired,
        phone,
        status,
        coach
    } = req.body;

    try {
        await Client.findByIdAndUpdate(id, {
            fio,
            dataBuy,
            firstCame,
            lastCame,
            expired,
            phone,
            status,
            coach
        });
        res.json("Данные обновлены")
    } catch (e) {
        res.statusCode(404).json(`Запрошенный клиент не найден`);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Client.findByIdAndDelete(id);
        res.json("Клиент удален")
    } catch (e) {
        res.statusCode(404).json(`Выбранный клиент не найден`);
    }
})

module.exports = router;