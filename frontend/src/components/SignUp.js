import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault(); // Prevent the form from submitting
    const { fname, lname, email, password } = this.state;
    console.log({ fname, lname, email, password });
  }

  render() {
    return (
      <div className="container h-100 mt-5 mt-4 bg-light">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <h3 className="text-center mb-4">Sign Up</h3>

              <div className="mb-4">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(e) => this.setState({ fname: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  onChange={(e) => this.setState({ lname: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-secondary">
                  Sign Up
                </button>
              </div>

              <p className="forgot-password text-right mt-4">
                Already registered? <a href="/login">Log In</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
