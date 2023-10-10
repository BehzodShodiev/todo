import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "../pages/home/styles";

const TodoItem = ({ todo }) => {
  const { title, description, theme } = todo;
  const classes = useStyles(theme);
  return (
    <>
      <Grid item className={classes.listItem}>
        <Card>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="p" >{description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TodoItem;
