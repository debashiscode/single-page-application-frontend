import React from "react";
import Lists from "../Lists";
import axios from "axios";
import AuthContext from "../context/auth";
import "./style.css";
import ReactPaginate from 'react-paginate';

class Posts extends  React.Component {
  static contextType = AuthContext
  constructor(props){
    super(props);
      this.state = {
            username:"",
            loading: false,
            alldata: [],
            offset: 0,
            perPage: 10,
            currentPage: 1,
            filterKey: "",
            };
        this.getLists = this.getLists.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.updateField = this.updateField.bind(this);
      }

  componentDidMount() {
      this.getLists();
  }
  getLists() {
    const { currentPage, perPage, filterKey } = this.state;
      this.setState({ loading: true })
      axios
        .get(
          `http://localhost:8080/v1/fetchPosts?pageNo=${currentPage ||
            1}&pageSize=${perPage}&title=${filterKey}`,
          {
            headers: { Authorization: `Bearer ${this.context.authTokens}` }
          }
        )
        .then(result =>
              this.setState({
                 loading: false,
                alldata: result.data.post || [],
                pageCount: result.data.totalNoPages

              })
          )
        .catch(err => {
          this.setState({ error: "Something went wrong" });
        });
    }
    updateField(e) {
      e.preventDefault();
      this.setState({ filterKey: e.target.value }, () => this.getLists());
    }

    handlePageClick(e) {
      const selectedPage = e.selected;
      const offset = selectedPage * this.state.perPage;
      this.setState({
          currentPage: selectedPage,
          offset: offset
      }, () => {
          this.getLists()
      });
  }

 render() {
    const listTable = this.state.loading ? (
      <span>Loading...Is usually slower than localhost...</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
       getList={this.getList}
    />
    );
    return (
      <div className="container postsBody">
      <div className="spa-label pull-right">Welcome: {this.context.userName} </div>
      <br />
      <div className="spa-label">List Of Posts</div>
      <br />
      <br />
      <label className="no-margin">Filter data as per title: </label>
      <input
        className="filter"
        type="text"
        name="filterKey"
        value={this.filterKey}
        onChange={this.updateField}
      />
      <br />
      <br />
        {listTable}
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
      </div>
    );
  }
}
export default Posts;
