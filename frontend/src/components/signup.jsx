const Signup = (props) => {
  return (
    <>
      <main className="signup-main">
        <div className="username">
          <input
            type="text"
            name=""
            id=""
            placeholder="username"
            value={props.username}
            onChange={(e) => props.setUsername(e.target.value)}
          />
        </div>
        <div className="password">
          <input
            type="password"
            name=""
            id=""
            placeholder="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
        </div>
        <div className="password" id="confirm-password">
          <input
            type="password"
            name=""
            id=""
            placeholder="confirm password"
            value={props.cpassword}
            onChange={(e) => props.setcPassword(e.target.value)}
          />
        </div>
        <p className="error-message">{props.errorMessage}</p>
      </main>
      <div className="checkbox">
        <input
          type="checkbox"
          name=""
          id="checkbox"
          checked={props.checkbox}
          onClick={() => {
            props.setCheckbox(!props.checkbox);
          }}
        />
        <label htmlFor="checkbox"> Remeber me for a month.</label>
      </div>
      <button className="btn btn-login" onClick={props.handleLogin}>
        Signup
      </button>
    </>
  );
};

export default Signup;
