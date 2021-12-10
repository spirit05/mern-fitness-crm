export const columnsClients = [
        { field: 'fio', headerName: 'ФИО', width: 250  },
        { field: 'status', headerName: 'Статус', width: 100, list: ['-', 'Активный', 'Заморожен', 'Не проплачен'] },
        { field: 'expired', headerName: 'Абонемент', width: 110, list: ['-', 'год', 'месяц', '3 месяца', '6 месяцев'] },
        { field: 'dataBuy', headerName: 'Дата покупки', type: 'date', width: 130 },
        { field: 'firstCame', headerName: 'Первый визит', type: 'date', width: 130 },
        { field: 'lastCame', headerName: 'Последний визит', type: 'date', width: 160 },
        { field: 'phone', headerName: 'Телефон', type: 'tel', width: 120 },
        { field: 'coach', headerName: 'Тренер', width: 250, list: ['-'] }
];

export const columnsCoach = [
    { field: 'fio', headerName: 'ФИО', width: 250  },
    { field: 'date', headerName: 'Дата найма', type: 'date', width: 130 },
    { field: 'status', headerName: 'Статус', width: 120, list: ['-', 'Работает', 'Не работает']},
    { field: 'comment', headerName: 'Комментарий', width: 400 }
];

export const columnsExercise = [
    { field: 'name', headerName: 'Название занятия', width: 350  },
    { field: 'date', headerName: 'Дата проведения', type: 'date', width: 150 },
    { field: 'coach', headerName: 'Тренер', width: 250 },
    { field: 'comment', headerName: 'Комментарий', width: 350 }
];

