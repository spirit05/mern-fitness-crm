import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { columnsCoach } from '../../store/columns';
import { selectCoaches, selectLoading, getCoachesAsync, getCoachAsync, addCoachAsync, setCoachAsync, deleteCoachAsync} from '../../store/coach';

import Table from '../../components/Table';
import ModalForm from '../../components/ModalForm';
import { defaultValue } from '../../service/utils';

const defaultForm = defaultValue(columnsCoach);

const ViewCoaches = () => {
    const coachRedux = useSelector(selectCoaches);
    const isLoading = useSelector(selectLoading);
    const [ coaches, setCoaches ] = useState([]);
    const [ form, setForm ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ id, setId ] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    setForm(defaultForm);
  }, [])

  useEffect(() => {
    dispatch(getCoachesAsync());
  }, [dispatch]);

  useEffect(() => {
    setCoaches(coachRedux);
  }, [coachRedux]);

  const clearForm = useCallback(
    () => {
        setCoaches(coachRedux);
        setOpen(false);
        setForm(defaultForm);
    }, [coachRedux]
  );

  const deleteCoach = useCallback(
    (id) => async () => {
      await dispatch(deleteCoachAsync(id));
      clearForm();
    },
    [dispatch, clearForm],
  );

  const addCoach = async form => {
      await dispatch(addCoachAsync(form));
      clearForm();
  }
  
  const editCoach = async form => {
    await dispatch(setCoachAsync(form));
    clearForm();
  };

  const editCoachHadler = useCallback(
    (id) => async () => {
      const params = await dispatch(getCoachAsync(id));
      setForm(params);
      setOpen(true)
    }, [dispatch]
  );

  const ViewCoach = useCallback(
    (id) => () => {
      navigate(id);
    },
    [navigate],
  );

  const openAddCoach = () => {
    setForm(defaultForm);
    setId(null);
    setOpen(true);
  };

  const columns = useMemo(
    () => [
      ...columnsCoach.map(column => (column.field === 'coach') 
                                      ? ({...column, list: ['-', ...coaches]}) 
                                      : column),
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Действия',
        width: 100,
        getActions: (params) => [          
          <GridActionsCellItem
            icon={<VisibilityIcon color='primary' />}
            label="Просмотр"
            onClick={ ViewCoach(params.id) }
          />,
          <GridActionsCellItem
            icon={<EditIcon color='success' />}
            label="Редактировать"
            name='Изменение'
            onClick={ editCoachHadler(params.id) }
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label="Удалить"
            onClick={ deleteCoach(params.id) }
          />,
        ],
      },
    ],
    [ ViewCoach, deleteCoach, editCoachHadler, coaches ],
  );

  return (
    <div style={{ margin: '1em', height: '80vh'}} >
        <Table col={ columns } row={ coaches } isLoading={ isLoading } />
        <Button 
          sx={{
            margin: 3
          }}
          name='Добавление'
          variant='contained' 
          onClick={ openAddCoach }  
        >
            Добавить тренера
        </Button>
        <ModalForm
          isOpen={ {open, setOpen} } 
          id={ id }
          fields={ columns }
          form={ [form, setForm] }
          handleForm={ [addCoach, editCoach] }
        />
    </div>
  )
};

export default ViewCoaches;