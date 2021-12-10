import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { columnsExercise } from '../../store/columns';
import { selectExercises, selectLoading, getExercisesAsync, getExerciseAsync, addExerciseAsync, setExerciseAsync, deleteExerciseAsync} from '../../store/exercise';
import { getCoachesAsync, selectCoaches } from '../../store/coach';

import Table from '../../components/Table';
import ModalForm from '../../components/ModalForm';
import { defaultValue } from '../../service/utils';

const defaultForm = defaultValue(columnsExercise);

const ViewGroups = () => {
    const exerciseRedux = useSelector(selectExercises);
    const coachRedux = useSelector(selectCoaches);
    const isLoading = useSelector(selectLoading);
    const [ exercises, setExercises ] = useState([]);
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
    dispatch(getExercisesAsync('group'));
    dispatch(getCoachesAsync());
  }, [dispatch]);

  useEffect(() => {
    setCoaches(coachRedux);

    const temp = exerciseRedux.map(exercise=> {
      if (exercise.coach && (exercise.coach !== '-') && !!coaches.length) {
        const tempCoach = coaches.find(coach => coach._id === exercise.coach);
        return ({...exercise, coach: tempCoach.fio});
      }
      
      return exercise;
    });
    setExercises(temp);
  }, [exerciseRedux, coachRedux, coaches]);

  const clearForm = useCallback(
    () => {
        setExercises(exerciseRedux);
        setOpen(false);
        setForm(defaultForm);
    }, [exerciseRedux]
  );

  const deleteExercise = useCallback(
    (id) => async () => {
      await dispatch(deleteExerciseAsync(id));
      clearForm();
    },
    [dispatch, clearForm],
  );

  const addExercise = async form => {
      await dispatch(addExerciseAsync({type: 'group', ...form}));
      clearForm();
  }
  
  const editExercise = async form => {
    await dispatch(setExerciseAsync(form));
    clearForm();
  };

  const editExerciseHadler = useCallback(
    (id) => async () => {
      const params = await dispatch(getExerciseAsync(id));
      setForm(params);
      setOpen(true)
    }, [dispatch]
  );

  const ViewExercise = useCallback(
    (id) => () => {
      navigate(id);
    },
    [navigate],
  );

  const openAddExercise = () => {
    setForm(defaultForm);
    setId(null);
    setOpen(true);
  };

  const columns = useMemo(
    () => [
      ...columnsExercise.map(column => (column.field === 'coach') 
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
            onClick={ ViewExercise(params.id) }
          />,
          <GridActionsCellItem
            icon={<EditIcon color='success' />}
            label="Редактировать"
            name='Изменение'
            onClick={ editExerciseHadler(params.id) }
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label="Удалить"
            onClick={ deleteExercise(params.id) }
          />,
        ],
      },
    ],
    [ ViewExercise, deleteExercise, editExerciseHadler, coaches ],
  );

  return (
    <div style={{ margin: '1em', height: '80vh'}} >
        <Table col={ columns } row={ exercises } isLoading={ isLoading } />
        <Button 
          sx={{
            margin: 3
          }}
          name='Добавление'
          variant='contained' 
          onClick={ openAddExercise }  
        >
            Добавить занятие
        </Button>
        <ModalForm
          isOpen={ {open, setOpen} } 
          id={ id }
          fields={ columns }
          form={ [form, setForm] }
          handleForm={ [addExercise, editExercise] }
        />
    </div>
  )
};

export default ViewGroups;