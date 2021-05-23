import * as actionTypes from './actionTypes';
import axios from '../../axios-documents';
import { toast } from 'react-toastify';

export const fetchDocumentSuccess = (document) => {
  return {
    type: actionTypes.FETCH_DOCUMENT_SUCCESS,
    document: document
  };
};

export const fetchDocumentFail = (error) => {
  return {
    type: actionTypes.FETCH_DOCUMENT_FAIL,
    error: error
  };
};

export const fetchDocumentStart = () => {
  return {
    type: actionTypes.FETCH_DOCUMENT_START
  };
};

export const fetchDocument = (documentId) => async (dispatch, getState) => {
  const {
    auth: { token }
  } = getState();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const { data } = await axios.get('/documents/' + documentId, config);
    dispatch(fetchDocumentSuccess(data));
  } catch (err) {
    dispatch(fetchDocumentFail(err));
  }
};

export const addDocumentSuccess = (id, documentData) => {
  return {
    type: actionTypes.ADD_DOCUMENT_SUCCESS,
    documentId: id,
    documentData: documentData
  };
};

export const addDocumentFail = (error) => {
  return {
    type: actionTypes.ADD_DOCUMENT_FAIL,
    error: error
  };
};

export const addDocumentStart = () => {
  return {
    type: actionTypes.ADD_DOCUMENT_START
  };
};

export const purchaseDocument = () => {
  return {
    type: actionTypes.ADD_DOCUMENT_START
  };
};

export const addDocument = (documentData, token) => {
  return (dispatch) => {
    dispatch(addDocumentStart());
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios
      .post('/documents', documentData, config)
      .then((response) => {
        dispatch(addDocumentSuccess(response.data._id, documentData));
      })
      .catch((error) => {
        dispatch(addDocumentFail(error));
      });
  };
};

export const addDocumentInit = () => {
  return {
    type: actionTypes.ADD_DOCUMENT_INIT
  };
};

export const updateDocument = (document) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.UPDATE_DOCUMENT_REQUEST, payload: document });
  const {
    auth: { token }
  } = getState();
  try {
    const { data } = await axios.patch(`/documents/${document._id}`, document, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: actionTypes.UPDATE_DOCUMENT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_DOCUMENT_FAIL, error: message });
  }
};
