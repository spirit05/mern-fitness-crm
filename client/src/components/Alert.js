import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
    Alert, 
    IconButton, 
    Collapse
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';
import { keyframes } from "@mui/styled-engine";

import { removeAlert, selectAlerts, selectIsOpen } from '../store/alert';

const animateAlert = keyframes`
    from {
        opacity: 0;
        transform: translateX(100vw);
    }

    to {
        opacity: 1;
        transform: translateX(10vh);
    }
`;

const CustomizedCollapse = styled(Collapse)`
  position: fixed;
  top: 10vh;
  animation: ${ animateAlert } 3s ease-out;
`;
let i = 0;
const CustomAlert = () => {
  const selectedAlerts = useSelector(selectAlerts);
  const isOpen = useSelector(selectIsOpen);
  const [ alerts, setAlerts ] = useState([]);
  const dispatch = useDispatch();
  console.log(++i);

  useEffect(() => {
    setAlerts(selectedAlerts);
    if (alerts.length) {
      setTimeout(function request() {
        dispatch(removeAlert());
      }, 4000);
    }
  },[dispatch, alerts.length, selectedAlerts])

  return (
    <CustomizedCollapse 
        in={ isOpen } 
    >
        {
          alerts.map((alert, idx) => {
            return (
              <Alert
                key={ idx }
                severity={ alert.type }
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={ () => { dispatch(removeAlert()) } }
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                { alert.text }
              </Alert>
            )
          })
        }
    </CustomizedCollapse>
  );
}

export default CustomAlert;