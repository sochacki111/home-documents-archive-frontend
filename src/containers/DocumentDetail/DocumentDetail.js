import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import TitleIcon from '@material-ui/icons/Title';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../axios-documents';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchDocument } from '../../store/actions/document';
import './DocumentDetail.module.css';

const DocumentDetail = (props) => {
  const dispatch = useDispatch();
  const documentId = props.match.params.id;
  // TODO Fix first load 'loadedDocument' as null
  const loadedDocument = useSelector((state) => state.document.document);
  // const documentDetails = useSelector((state) => state.document.document);
  // const { isAuthor, loadedDocument } = documentDetails;
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(fetchDocument(documentId));
  }, [dispatch, documentId]);
  const [shareEmail, setShareEmail] = useState('');
  const share = async () => {
    try {
      await axios.post(`/documents/share`, { documentId, shareEmail });
      alert('document has been shared!')
    } catch (err) {
      console.log(err);
    }
  };
  let document = <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (loadedDocument) {
    document = (
      <div
        className="DocumentDetail"
        style={{
          marginTop: '5%',
          marginLeft: '5%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
            src={loadedDocument.image}
            alt="Document"
          />
        </div>
        <div style={{ float: 'left', marginLeft: '5%' }}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TitleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Title" secondary={loadedDocument.title} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DescriptionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Description"
                secondary={loadedDocument.description}
              />
            </ListItem>
          </List>
          {loadedDocument.isAuthor ? (
            <Button
              component={Link}
              type="submit"
              color="secondary"
              variant="contained"
              style={{ backgroundColor: '#f0ad4e' }}
              to={`/documents/edit/${loadedDocument._id}`}
            >
              Edit
            </Button>
          ) : null}
          <Input
            id="shareEmail"
            type="text"
            value={shareEmail || ''}
            onChange={(event) => setShareEmail(event.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              share();
            }}
          >
            Share
          </Button>
        </div>
      </div>
    );
  }
  return <div>{document}</div>;
};

export default withErrorHandler(DocumentDetail, axios);
