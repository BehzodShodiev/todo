import { AccessAlarm } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import React from 'react';

const EmptyList = ({classes}) => {
    return (
        <Grid className={classes.emptyList} container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <ListAltIcon />
          </Grid>
          <Grid item>
            <Typography variant="h4">Empty list</Typography>
          </Grid>
        </Grid>
      );
};

export default EmptyList;