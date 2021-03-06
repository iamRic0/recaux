import React, { Component } from "react";
const jwt = require("jsonwebtoken");
const axios = require("axios");

class Addcandidate extends Component {
  state = {
    name: "",
    email: "",
    jobspec: "",
    login: false,
    addedsucsess: false
  };
  chngehandl = e => {
    //console.log(e.target.name,)
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state);
  };

  componentDidMount() {
    var token = localStorage.getItem("jwt");
    try {
      var data = jwt.verify(token, "authdemo");
      console.log(data);
      if (data) {
        this.setState({ login: true });
      }
    } catch (error) {
      console.log(error);
      if (error) {
        this.setState({ login: false });
      }
    }
  }

  btn1handler = e => {
    e.preventDefault();
    console.log("submited");
    var params = new URLSearchParams();
    params.append("candidatename", this.state.name);
    params.append("candidateemail", this.state.email);
    params.append("candidatejobspec", this.state.jobspec);
    this.setState({ addedsucsess: false });
    axios
      .post("/usr/addcandidate", params)
      .then(data => {
        console.log(data.data);
        this.setState({ addedsucsess: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.login) {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-sm" />
              <div className="col-sm">
                {this.state.addedsucsess && (<div class="alert alert-success" role="alert">
                  candidate added successfully
                </div>)}
                <form onSubmit={this.btn1handler}>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={this.chngehandl}
                      placeholder="enter candidate name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="enter candidate email"
                      onChange={this.chngehandl}
                    />
                  </div>
                  <div className="form-group">
                    <label> </label>
                    <input
                      type="text"
                      name="jobspec"
                      className="form-control"
                      placeholder="enter candidate job spec"
                      onChange={this.chngehandl}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="add"
                  />
                </form>

                <br />
              </div>
              <div className="col-sm" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>please login to continue</h1>
        </div>
      );
    }
  }
}

export default Addcandidate;
