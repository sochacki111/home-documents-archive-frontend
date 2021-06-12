import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from '../../axios-documents';
import { Document } from '../../components/Document/Document';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import './Documents.css';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean; // TODO Delete?
  token: string;
  // TODO refactor
  match: any;
}

interface Document {
  _id: string;
  title: string;
  author: {
    id: string;
    email: string;
  };
  image: string;
  description: string;
}

interface IState {
  documents: Document[];
  error: string | boolean;
  category: string;
  searchKeyword: string;
  sortOrder: string;
}

class Documents extends Component<IProps, IState> {
  state: IState = {
    documents: [],
    error: false,
    category: this.props.match.params.id ? this.props.match.params.id : '',
    searchKeyword: '',
    sortOrder: '',
  };

  componentDidMount() {
    this.fetchDocuments();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (
      this.state.category !== prevState.category ||
      this.state.sortOrder !== prevState.sortOrder
    ) {
      this.fetchDocuments();
    }
  }

  async fetchDocuments() {
    try {
      const config = {
        headers: {
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
          token: localStorage.getItem('token'),
        },
      };
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${this.props.token}`,
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   withCredentials: true,
      // };
      const response = await axios.get(`/documents`, config);
      if (response.data) {
        this.setState({ documents: response.data });
      }
    } catch (err) {
      console.log(err);
    }
  }

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.fetchDocuments();
  };

  sortHandler = (e: any) => {
    this.setState({ sortOrder: e.target.value });
  };

  categoryHandler = (e: any) => {
    this.setState({ category: e.target.value });
  };

  render() {
    let documents: JSX.Element | null = null;
    if (Array.isArray(this.state.documents)) {
      documents = (
        <GridList cellHeight={160} cols={4}>
          {this.state.documents.map((document) => (
            <GridListTile cols={2} rows={1} key={document._id}>
              <Link to={'/documents/' + document._id}>
                <img
                  src={document.image}
                  alt={document.description}
                  className="MuiGridListTile-imgFullWidth"
                />
              </Link>
            </GridListTile>
          ))}
        </GridList>
      );
    }

    return (
      <div style={{ marginTop: '15vh' }}>
        <section className="Documents">{documents}</section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  null
)(withErrorHandler(Documents, axios));
