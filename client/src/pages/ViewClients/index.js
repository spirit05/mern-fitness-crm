import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { columnsClients } from '../../store/columns';
import { addClientAsync, deleteClientAsync, getClientAsync, getClientsAsync, selectClient, selectLoading, setClientAsync } from '../../store/client';

import Table from '../../components/Table';
import ModalForm from '../../components/ModalForm';
import { getCoachesAsync, selectCoaches } from '../../store/coach';
import { defaultValue } from '../../service/utils';

const defaultForm = defaultValue(columnsClients);

const ViewClients = () => {
  const clientRedux = useSelector(selectClient);
  const coachRedux = useSelector(selectCoaches);
  const isLoading = useSelector(selectLoading);
  const [ clients, setClients ] = useState([]);
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
    dispatch(getClientsAsync());
  }, [dispatch]);

  useEffect(() => {
    setCoaches(coachRedux);

    const temp = clientRedux.map(client=> {
      if (client.coach && client.coach !== '-' && !!coaches.length) {
        const tempCoach = coaches.find(coach => coach._id === client.coach);
        return ({...client, coach: tempCoach.fio});
      }
      
      return client;
    });
    
    setClients(temp);
  }, [clientRedux, coachRedux, coaches]);


  const clearForm = useCallback(
    () => {
      setClients(clientRedux);
      setOpen(false);
      setForm(defaultForm);
    }, [clientRedux]
  );

  const deleteClient = useCallback(
    (id) => async () => {
      console.log('uc del');
      await dispatch(deleteClientAsync(id));
      clearForm();
    },
    [dispatch, clearForm],
  );

  const addClient = async form => {
      await dispatch(addClientAsync(form));
      clearForm();
  }
  
  const editClient = async form => {
    await dispatch(setClientAsync(form));
    clearForm();
  };

  const editClientHadler = useCallback(
    (id) => async () => {
      const params = await dispatch(getClientAsync(id));
      setForm(params);
      setOpen(true)
    }, [dispatch]
  );

  const ViewClients = useCallback(
    (id) => () => {
      navigate(id);
    },
    [navigate],
  );

  const openAddClient = () => {
    setForm(defaultForm);
    setId(null);
    setOpen(true);
  };

  const columns = useMemo(
    () => [
      ...columnsClients.map(column => (column.field === 'coach') 
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
            onClick={ ViewClients(params.id) }
          />,
          <GridActionsCellItem
            icon={<EditIcon color='success' />}
            label="Редактировать"
            name='Изменение'
            onClick={ editClientHadler(params.id) }
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label="Удалить"
            onClick={ deleteClient(params.id) }
          />,
        ],
      },
    ],
    [ ViewClients, deleteClient, editClientHadler, coaches ],
  );

  return (
    <div style={{ margin: '1em', height: '80vh'}} >
        <Table col={ columns } row={ clients } isLoading={ isLoading } />
        <Button 
          sx={{
            margin: 3
          }}
          name='Добавление'
          variant='contained' 
          onClick={ openAddClient }  
        >
            Добавить клиента
        </Button>
        <ModalForm
          isOpen={ {open, setOpen} } 
          id={ id }
          fields={ columns }
          form={ [form, setForm] }
          handleForm={ [addClient, editClient] }
        />
    </div>
  )
};

export default ViewClients;