import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const CustomForm = ({ fields = [], form = null, onForm = undefined }) => {
    const changeHandler = e => onForm && onForm({...form, [e.target.name]: e.target.value})

    return (
    <div>
        {
            fields.map(item => {
                if (item.type === 'actions') return '';
                if (!!item.list) {
                    return (
                        <TextField
                            key={item.field}
                            id='outlined-select'
                            select
                            name={ item.field }
                            label={ item.headerName }
                            value={ form[item.field] }
                            onChange={ changeHandler }  
                        >
                            {
                                item.list.map((option) => {
                                    return (
                                        <MenuItem key={option?._id || option} value={option?._id || option}>
                                            {option?.fio || option}
                                        </MenuItem>
                                )})
                            }
                        </TextField>
                    )
                }

                return (
                    <TextField
                        key={ item.field }
                        name={ item.field }
                        label={ item.headerName }
                        type={ item.type }
                        value={ form[item.field]}
                        onChange={ changeHandler }
                    />
                )
            })
        }
    </div>
)};

export default CustomForm;