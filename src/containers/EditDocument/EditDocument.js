import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-documents';
import { Link } from 'react-router-dom';
import { fetchDocument, updateDocument } from '../../store/actions/document';
import './EditDocument.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { UPDATE_DOCUMENT_RESET } from '../../store/actions/actionTypes';

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
  updateButton: {
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

const EditDocument = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const documentId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState(0);
  const documentDetails = useSelector((state) => state.document);
  const {
    document,
    loading,
    error,
    success,
    updateLoading,
    updateSuccess,
    updateError
  } = documentDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateSuccess) {
      toast.success(`Document: "${title}" updated!`);
      props.history.push(`/documents/${documentId}`);
    }
    if (!document || document._id !== documentId || updateSuccess) {
      dispatch({ type: UPDATE_DOCUMENT_RESET });
      dispatch(fetchDocument(documentId));
    } else {
      setTitle(document.title);
      setCategory(document.category);
      setDescription(document.description);
    }
  }, [document, dispatch, documentId, updateSuccess, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateDocument({ _id: documentId, title, category, description }));
    // props.history.push(`/documents/${documentId}`);
  };

  let document2 = <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (document) {
    document2 = (
      <div>
        <div style={{ float: 'left', marginLeft: '2vh' }}>
          <Link className="btn grey" to={`/documents/${documentId}`}>
            Cancel edit
          </Link>
        </div>
        <div className={classes.form}>
          <h1>Edit Document</h1>
          {updateLoading && <p>Update Loading</p>}
          {updateError && <p>{updateError}</p>}
          {loading ? (
            <p>Fetch Loading</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <form onSubmit={submitHandler}>
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="title" shrink>
                    Title
                  </InputLabel>
                  <Input
                    required={true}
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="category" shrink>
                    Category
                  </InputLabel>
                  <Select
                    id="category"
                    value={category}
                    displayEmpty
                    onChange={(e) => setCategory(e.target.value)}
                    className={classes.select}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Fashion">Fashion</MenuItem>
                    <MenuItem value="Aerial">Aerial</MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Animals">Animals</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="description">Description (in $)</InputLabel>
                  <Input
                    id="description"
                    // min="1"
                    type="number"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </FormGroup>
              <Button
                type="submit"
                className={classes.updateButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }
  return <div>{document2}</div>;
};

export default withErrorHandler(EditDocument, axios);
