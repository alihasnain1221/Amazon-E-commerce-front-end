import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    backgroundImage: "url(https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=2000)"
  },
  root: {
    flexGrow: 1,
  },
}));