import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useStyles from "./styles";
import { debounce } from "lodash";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
import {
  addTodo,
  getTodos,
  setTodos as setTodosStorage,
  updateTodo,
  removeTodo,
  filterTodos,
  searchTodo,
} from "../../services/todos";
import { useSnackbar } from "notistack";
import TodoItem from "../../components/todoItem";
import Sort from "../../components/dropdown";
import CloseIcon from "@mui/icons-material/Close";
import SearchField from "../../components/search";
import EmptyList from "../../components/emptyList";

// Create a SearchContext using createContext
export const SearchContext = createContext();
export default function Home(props) {
  const classes = useStyles(props.theme);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [todos, setTodos] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [count, setCount] = useState(0);
  const [fetchToggle, setFetchToggle] = useState(false);
  const [tabsValue, setTabsValue] = useState(0);
  const [allTodos, setAllTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Define the action function for the snackbar
  const action = (key) => (
    <CloseIcon
      style={{ cursor: "pointer" }}
      onClick={() => closeSnackbar(key)}
    />
  );
  // Function to handle adding a new todo
  const add = (e) => {
    e.preventDefault();
    setCount(count + 1);
    // Perform validation
    if (title.trim() === "" || description.trim() === "") return;
    // Create a new todo object
    const todo = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      completed: false,
      createdDate: new Date(),
      priority: priority,
    };
    // Add the todo to the list
    addTodo(todo);
    // Show success message
    messageSuccess("Successfully added!");
    // Clear input fields
    clearInputs();
  };

  // Function to clear input fields
  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setPriority(0);
    setSearchTerm("");
  };

  // Function to display success message
  const messageSuccess = (msg) => {
    enqueueSnackbar(msg, { variant: "success", action, autoHideDuration: 3000 });
  };

  // Function to handle priority checkbox change
  const handlePriorityChange = (event) => {
    setPriority(event.target.checked ? 1 : 0);
  };

  // Function to toggle the completion status of a todo
  const onToggleComplete = (todoId) => {
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id == todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    // Update the todos storage
    setTodosStorage(updatedTodos);
    // Trigger a rerender
    setFetchToggle(!fetchToggle);
  };

  // Function to update a todo
  const updateTodoHome = (updatedTodo) => {
    updateTodo(updatedTodo);
    setFetchToggle(!fetchToggle);
    enqueueSnackbar("Successfully updated", { variant: "success", action, autoHideDuration: 3000 });
  };

  // Function to delete a todo
  const onDelete = (id) => {
    removeTodo(id);
    enqueueSnackbar("Successfully deleted", { variant: "success", action, autoHideDuration: 3000 });
    setFetchToggle(!fetchToggle);
  };

  // Function to handle tab change
  const handleChangeTabs = (_, newValue) => {
    setTabsValue(newValue);
    if (!searchTerm) {
      // If no search term, filter todos based on the tab value
      setTodos(filterTodos(newValue));
      return;
    }
    // If there is a search term, filter todos based on the search term and new tab value
    setTodos([...searchTodo(searchTerm, newValue)]);
  };

  /**
   * Function to handle sorting todos based on type.
   *
   * @param {number} type - The type of sort to apply. 0 for all, 1 for priority, and 2 by date.
   */
  const sortChange = (type) => {
    let sortedTodos = tabsValue == 0 && !searchTerm ? allTodos : todos;
    if (type == 1) {
      sortedTodos = [...todos].sort((a, b) => b.priority - a.priority);
    }
    if (type == 2) {
      sortedTodos = [...todos].sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    }
    setTodos(sortedTodos);
  };

  const handleSearch = debounce((value) => {
    // Perform search operation with the provided value
    setFetchToggle(!fetchToggle);
  }, 300);

  useEffect(() => {
    const todos = getTodos();
    setAllTodos(todos);
    if (searchTerm) {
      setTodos(searchTodo(searchTerm, tabsValue));
      return;
    }
    if (tabsValue != 0) {
      setTodos(filterTodos(tabsValue));
    } else {
      setTodos(todos);
    }
  }, [count, fetchToggle]);

  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.container}>
          <Container className={classes.childContainer}>
            {/* Form to add a new todo */}
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
                {/* Input field for the title */}
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={title}
                  sx={{ background: "#fff", borderRadius: "4px" }}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {/* Input field for the description */}
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  maxRows={10}
                  minRows={6}
                  value={description}
                  sx={{ background: "#fff", borderRadius: "4px" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* Checkbox for priority */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={priority == 0 ? false : true}
                      onChange={handlePriorityChange}
                    />
                  }
                  label="Has priority"
                />
              </Grid>
              {/* Submit button */}
              <Button
                variant="contained"
                type="submit"
                className={classes.submitBtn}
              >
                Submit
              </Button>
            </Box>
            {/* List of todos */}
            <Box className={classes.listBox}>
              {allTodos.length ? (
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  className={classes.listGrid}
                >
                  <Grid item xs={8}>
                    {/* Tabs to filter todos */}
                    <Tabs
                      value={tabsValue}
                      onChange={handleChangeTabs}
                      aria-label="disabled tabs example"
                    >
                      <Tab label="All" value={0} />
                      <Tab label="To do" value={1} />
                      <Tab label="Completed" value={2} />
                    </Tabs>
                  </Grid>
                  <Grid item xs={4} container justifyContent="flex-end">
                    {/* Component for sorting */}
                    <Sort sortChange={sortChange} />
                  </Grid>
                  <Grid item columns={12} xs={12} sx={{ marginTop: 2 }}>
                    {/* Provider for search functionality */}
                    <SearchContext.Provider
                      value={{ searchTerm, setSearchTerm, handleSearch }}
                    >
                      {/* Search field component */}
                      <SearchField classes={classes} />
                    </SearchContext.Provider>
                  </Grid>
                </Grid>
              ) : <EmptyList classes={classes}/>}

              {/* Grid for displaying todo items */}
              <Grid columns={12} className={classes.listGrid}>
                {todos.map((todo, i) => {
                  return (
                    <TodoItem
                      todo={todo}
                      key={todo.id}
                      index={i}
                      loading="lazy"
                      classes={classes}
                      theme={props.theme}
                      onToggleComplete={onToggleComplete}
                      updateTodoHome={updateTodoHome}
                      onDelete={onDelete}
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
