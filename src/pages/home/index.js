import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useStyles from "./styles";
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { addTodo, getTodos } from "../../services/todos";
import { useSnackbar } from "notistack";
import TodoItem from "../../components/todoItem";

export default function Home(props) {
  const classes = useStyles(props.theme);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [todos, setTodos] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [count, setCount] = useState(0);

  const add = (e) => {
    e.preventDefault();
    setCount(count + 1);
    // Perform validation
    if (title.trim() === "" || description.trim() === "") return;
    const todo = {
      title: title,
      description: description,
      completed: false,
      createdDate: new Date(),
      priority: priority,
    };
    addTodo(todo);
    messageSuccess("Successfully added!");
    clearInputs();
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setPriority(0);
  };

  const messageSuccess = (msg) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant: "success" });
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.checked ? 1 : 0);
  };

  useEffect(() => {
    console.log("getTodos(): ", getTodos());
    setTodos(getTodos());
  }, [count]);
  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container className={classes.childContainer}>
            <Box
              className={classes.inputBox}
              component="form"
              noValidate
              onSubmit={(e) => add(e)}
            >
              <Grid columns={12} className={classes.inputGrid}>
                <Typography
                  variant="h5"
                  className={classes.title}
                  textAlign="center"
                >
                  Add todo
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  maxRows={10}
                  minRows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                 <FormControlLabel control={<Checkbox checked={priority} onChange={handlePriorityChange} />} label="Has priority" />
              </Grid>
              <Button
                variant="contained"
                type="submit"
                className={classes.submitBtn}
              >
                Submit
              </Button>
            </Box>
            <Box className={classes.listBox}>
              <Grid columns={12} className={classes.listGrid}>
                {todos.map((todo, i) => {
                  return (
                    <TodoItem
                      todo={todo}
                      key={i}
                      loading="lazy"
                      classes={classes}
                      theme={props.theme}
                    />
                  );
                })}
              </Grid>
            </Box>
          </Container>
        </div>
      </main>
    </>
  );
}
