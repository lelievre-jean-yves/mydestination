import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import Box from '@mui/material/Box';
import ModalDialog from '@mui/joy/ModalDialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFormReservation,
  setReservationDate,
} from '../../reducers/hotelDetail';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '.3rem',
  p: 4,
};

export default function CardHotelReserved(props) {
  const [openModalEdit, setOpenModalEdit] = React.useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  const handleCloseModalEdit = () => setOpenModalEdit(false);

  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  const dispatch = useDispatch();
  const arrivalDate = useSelector((state) => state.hotelDetail.arrival);
  const departureDate = useSelector((state) => state.hotelDetail.departure);

  const onChange = (dates) => {
    const [start, end] = dates;
    dispatch(setReservationDate(start, end));
  };
  const arrival = new Date(props.arrivalDate).toLocaleDateString();
  const departure = new Date(props.departureDate).toLocaleDateString();

  let date1 = new Date(props.arrivalDate);
  let date2 = new Date(props.departureDate);

  let time_diff = date2.getTime() - date1.getTime();
  let days_Diff = time_diff / (1000 * 3600 * 24);

  

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image={props.picture}
        />
        <CardContent>
          <Typography variant="h6" component="div" sx={{mb:.6 }}>
            {props.hotelName}
          </Typography>
          <Typography
          variant="h7"
          component="div"
          sx={{ fontSize: '.9rem', fontStyle: 'italic', mb: 2 }}
        >
          {props.adresse}
        </Typography>
          <Typography variant="h7" component="div" sx={{ mb: 0.5 }}>
            {props.roomType}
          </Typography>

          <span className="date">Arivée : {arrival}</span>
          <span className="date">Départ : {departure}</span>

          <Typography
            variant="h7"
            component="div"
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}
          >
            Montant total <span>{props.priceByNight * days_Diff} €</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleOpenModalEdit();
            }}
          >
            {' '}
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleOpenModalDelete}
          >
            Annuler
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={openModalEdit}
        onClose={() => {
          handleCloseModalEdit();
          dispatch(resetFormReservation());
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="reservation-form">
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Modifiez votre date d'arrivée ou départs
          </Typography>
          <DatePicker
            selected={arrivalDate}
            onChange={onChange}
            minDate={new Date()}
            startDate={arrivalDate}
            endDate={departureDate}
            selectsRange
            inline
            // showDisabledMonthNavigation
            isClearable={true}
            locale="fr"
            className="date-picker"
            placeholderText="Arrivée - Départ"
            dateFormat="dd/MM/yyyy"
            // monthsShown={2}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          <Button
            variant="contained"
            size="small"
            color="secondary"
            sx={{ mt: 2 }}
          >
            Modifier
          </Button>
        </Box>
      </Modal>

      <Modal open={openModalDelete} onClose={() => handleCloseModalDelete()}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography id="alert-dialog-modal-description">
            Êtes-vous sûr de vouloir annuler votre réservation
          </Typography>
          <Box
            sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCloseModalDelete()}
            >
              Suprimer
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleCloseModalDelete()}
            >
              Retour en arriere
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
