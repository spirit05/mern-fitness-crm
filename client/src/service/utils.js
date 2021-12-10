const getNow = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    day = (day < 10) ? '0' + day : day;
    month = (month < 10) ? '0' + month : month;

    return year + '-' + month + '-' + day;
}

export const defaultValue = arr => {
    return arr.reduce((acc, field) => 
                !!field.list ? ({...acc, [field.field]: field.list[0]}) :
                (field.type === 'date') ? ({...acc, [field.field]: getNow()})
                : ({...acc, [field.field]: ''}),{})
}