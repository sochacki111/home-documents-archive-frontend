import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  document: null,
  documents: [],
  loading: false,
  success: false,
  error: null,
  updateLoading: false,
  updateSuccess: false,
  updateError: null
};

const addDocumentInit = (state, action) => {
  return updateObject(state, { added: false });
};

const addDocumentStart = (state, action) => {
  return updateObject(state, { loading: false });
};

const addDocumentSuccess = (state, action) => {
  const newDocument = updateObject(action.documentData, { id: action.documentId });
  return updateObject(state, {
    loading: false,
    added: true,
    documents: state.documents.concat(newDocument)
  });
};

const addDocumentFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const purchaseDocumentSuccess = (state, action) => {
  return updateObject(state, { purchased: true });
};

const fetchDocumentStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchDocumentSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    document: action.document
  });
};

const fetchDocumentFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload
  });
};

const updateDocumentSuccess = (state, action) => {
  return updateObject({ updateLoading: false, updateSuccess: true });
};

const updateDocumentRequest = (state, action) => {
  return updateObject(state, { updateLoading: true });
};

const updateDocumentReset = (state, action) => {
  return updateObject(state, {
    updateLoading: false,
    updateSuccess: false,
    updateError: null
  });
};

const updateDocumentFail = (state, action) => {
  return updateObject({ updateLoading: false, updateError: action.payload });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DOCUMENT_INIT:
      return addDocumentInit(state, action);
    case actionTypes.ADD_DOCUMENT_START:
      return addDocumentStart(state, action);
    case actionTypes.ADD_DOCUMENT_SUCCESS:
      return addDocumentSuccess(state, action);
    case actionTypes.ADD_DOCUMENT_FAIL:
      return addDocumentFail(state, action);
    case actionTypes.PURCHASE_DOCUMENT:
      return purchaseDocumentSuccess(state, action);
    case actionTypes.FETCH_DOCUMENT_START:
      return fetchDocumentStart(state, action);
    case actionTypes.FETCH_DOCUMENT_SUCCESS:
      return fetchDocumentSuccess(state, action);
    case actionTypes.FETCH_DOCUMENT_FAIL:
      return fetchDocumentFail(state, action);
    // case actionTypes.FETCH_DOCUMENTS_START:
    //   return fetchDocumentsStart(state, action);
    // case actionTypes.FETCH_DOCUMENTS_SUCCESS:
    //   return fetchDocumentsSuccess(state, action);
    // case actionTypes.FETCH_DOCUMENTS_FAIL:
    //   return fetchDocumentsFail(state, action);
    case actionTypes.UPDATE_DOCUMENT_REQUEST:
      return updateDocumentRequest(state, action);
    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return updateDocumentSuccess(state, action);
    case actionTypes.UPDATE_DOCUMENT_FAIL:
      return updateDocumentFail(state, action);
    case actionTypes.UPDATE_DOCUMENT_RESET:
      return updateDocumentReset(state, action);
    default:
      return state;
  }
};

export default reducer;
