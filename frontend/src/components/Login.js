import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="container h-100 mt-5 mt-4 bg-light">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <form>
              <h3 className="text-center mb-4">Log In</h3>

              <div className="mb-4">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-4">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-secondary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-4">
                <a href="/forgot-password">Forgot password?</a>
              </p>

              <p className="text-center mt-3">
                Don't have an account? <a href="/signup">Create Account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
