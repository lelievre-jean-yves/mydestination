import React from 'react';
import Typography from '@mui/material/Typography';
import './style.scss';

export function Error() {
  return (
    <div className="error">
      <Typography component="h1" variant="h4" color="secondary">
        Erreur
      </Typography>
      <Typography component="div" variant="h7">
        Nous sommes désolé, une erreur s'est produite
      </Typography>
    </div>
  );
}
