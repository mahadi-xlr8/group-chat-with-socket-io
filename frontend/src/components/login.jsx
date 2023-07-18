const LoginComponent = (props) => {
  return (
    <>
      <main>
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
      <button className="btn btn-login" onClick={props.onClick}>
        Login
      </button>
    </>
  );
};

export default LoginComponent;