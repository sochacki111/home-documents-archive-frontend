import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios-documents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: '50%',
    marginTop: '15vh',
    margin: 'auto'
  },
  uploadButton: {
    width: '25%',
    marginTop: '1vh',
    margin: 'auto'
  },
  select: {
    textAlign: 'left'
  },
  dropZone: {
    height: '20%',
    width: '25%'
  }
}));

const NewDocument = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const onAddDocument = async (documentData, token) =>
    dispatch(actions.addDocument(documentData, token));

  const fileSelectedHandler = (file) => {
    setSelectedFile(file[0]);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (selectedFile !== null) {
      fd.append('file', selectedFile, selectedFile.name);
      fd.append('title', title);
      fd.append('description', description);
      // TODO Refine redirect AFTER successful document create. Right now it's just redirecting

      await onAddDocument(fd, token);
      toast.success(`Document: "${title}" uploaded!`);
      props.history.push('/');
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.form}>
      <h1>New document</h1>
      <FormGroup>
        <DropzoneArea
          className={classes.dropZone}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          filesLimit={1}
          onChange={fileSelectedHandler.bind(this)}
        />
        <FormControl>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            required={true}
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            type="text"
            value={description || ''}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormControl>
        <Button
          className={classes.uploadButton}
          onClick={fileUploadHandler}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </FormGroup>
    </div>
  );
};

export default withErrorHandler(NewDocument, axios);
