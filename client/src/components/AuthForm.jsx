function AuthForm(props) {
    const {
      buttonText,
      inputs: { username, password },
      handleChange,
      submit,
      errMsg,
      togglePage,
    } = props;
  
    return (
      <div id="auth-container">
        <form id="auth-form" onSubmit={submit}>
          <label>Log In with Username</label>
          <input
            placeholder="Username"
            name="username"
            type="text"
            onChange={handleChange}
            value={username}
          />
          <label>Password</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={password}
          />
          <button id="auth-btn">{buttonText}</button>
          <p>{errMsg}</p>
        </form>
      </div>
    );
  }
  
  export default AuthForm;