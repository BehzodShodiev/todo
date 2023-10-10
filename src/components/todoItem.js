import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "../pages/home/styles";
import { Checkbox, IconButton, Box } from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
const TodoItem = ({
  todo,
  onToggleComplete,
  onDelete,
  updateTodoHome,
  index,
}) => {
  const { title: tTitle, description: tDescription, theme } = todo;
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(tTitle);
  const [description, setDescription] = useState(tDescription);
  const classes = useStyles(theme);

  // Function to handle the checkbox click and toggle the completion status of the todo
  const handleCheck = () => {
    onToggleComplete(todo.id);
  };

  // Function to handle the delete button click and delete the todo
  const handleDelete = () => {
    onDelete(todo.id);
  };

  // Function to handle the title click and enable editing mode for the title
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  // Function to handle the description click and enable editing mode for the description
  const handleDescriptionClick = () => {
    setIsEditingDescription(true);
  };

  // Function to handle the blur event (when the input field loses focus)
  const handleBlur = () => {
    // Creates an updated todo object with the modified title and description
    const updatedTodo = {
      ...todo,
      title: title,
      description: description,
    };
    // Calls the updateTodoHome function to update the todo in the parent component
    updateTodoHome(updatedTodo);
    // Resets the editing flags to disable editing mode for both title and description
    setIsEditingTitle(false);
    setIsEditingDescription(false);
  };

  // Function to handle the title change event and update the title state
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle the description change event and update the description state
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className={classes.listItem}
        sx={{ marginTop: index == 0 ? "0 !important" : null }}
      >
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center">
              {/* Checkbox to mark the todo as complete */}
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={handleCheck}
                color="primary"
              />
              {/* Editable title field */}
              {isEditingTitle ? (
                <TextField
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  autoFocus
                  sx={{ width: "100%" }}
                />
              ) : (
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1, cursor: "text" }}
                  className={todo.completed ? classes.lineThrough : ""}
                  onClick={handleTitleClick}
                >
                  {todo.title}
                </Typography>
              )}
              {/* Delete button */}
              <IconButton aria-label="delete" onClick={handleDelete}>
                <Delete color="error" />
              </IconButton>
            </Box>
            {/* Editable description field */}
            {isEditingDescription ? (
              <TextField
                sx={{ width: "100%" }}
                value={description}
                onChange={handleDescriptionChange}
                onBlur={handleBlur}
                autoFocus
                multiline
                maxRows={10}
                minRows={6}
              />
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  marginTop: isEditingTitle ? "16px" : "",
                  cursor: "text",
                }}
                onClick={handleDescriptionClick}
              >
                {todo.description}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default TodoItem;
