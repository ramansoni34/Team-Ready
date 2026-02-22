<script>
  import { navigate, Link } from "svelte-routing";
  import { apiLogin } from "../api.js";

  let username = "";
  let password = "";

  async function handleLogin() {
    try {
      const result = await apiLogin(username, password);
      
      if (result.success) {
        console.log("Login successful");
        navigate("/dashboard", { replace: true });
      } else {
        alert("Login Failed: " + (result.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      // Fallback for development if backend is not running
      console.warn("Backend not reached. Navigating to dashboard for development.");
      navigate("/dashboard", { replace: true });
    }
  }
</script>

<div class="page-wrapper">
  <div class="login-card">
    <!-- Left Panel -->
    <div class="left-panel">
      <div class="logo-section">
        <div class="logo-icon">
          <svg viewBox="0 0 50 60" width="40" height="48">
            <path d="M25 0C25 0 15 15 15 25C15 30.5 19.5 35 25 35C30.5 35 35 30.5 35 25C35 15 25 0 25 0Z" fill="#768D71"/>
            <circle cx="25" cy="45" r="5" fill="#768D71" fill-opacity="0.6"/>
          </svg>
        </div>
        <div class="logo-text">
          <h1>Team Ready</h1>
          <p>Project Owner Portal</p>
        </div>
      </div>

      <div class="image-placeholder"></div>

      <div class="welcome-text">
        <h2>Welcome back, Project Owner.</h2>
        <p>Sign in to manage your team's AI workforce.</p>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="right-panel">
      <div class="header">
        <h2>Sign in</h2>
        <p>Enter your credentials to access Team Ready</p>
      </div>

      <form on:submit|preventDefault={handleLogin}>
        <div class="form-group">
          <label for="username">Email or Username</label>
          <input type="text" id="username" placeholder="you@company.com" bind:value={username} required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" bind:value={password} required />
        </div>

        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" />
            <label for="remember">Remember Me</label>
          </div>
          <div class="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="signup-prompt">
        Don't have an account? <Link to="/signup"><span>Sign Up</span></Link>
      </div>

      <div class="footer-links">
        <a href="#privacy">Privacy</a>
        <div class="dot"></div>
        <a href="#terms">Terms</a>
        <div class="dot"></div>
        <a href="#support">Support</a>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --bg-color: #E8EDE7;
    --card-bg: #F9FBF9;
    --accent-color: #768D71;
    --input-bg: rgba(221, 226, 216, 0.5);
    --text-dark: #2D362B;
    --text-medium: #5A6658;
    --text-light: #9BA699;
    --font-family: 'Inter', sans-serif;
  }

  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--bg-color);
    font-family: var(--font-family);
    padding: 20px;
  }

  .login-card {
    display: flex;
    width: 950px;
    max-width: 100%;
    min-height: 600px;
    background-color: var(--card-bg);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  /* Left Panel Styling */
  .left-panel {
    flex: 1;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 50px;
  }

  .logo-text h1 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-dark);
    margin: 0;
  }

  .logo-text p {
    font-size: 14px;
    font-weight: 500;
    color: var(--accent-color);
    margin: 0;
  }

  .image-placeholder {
    width: 100%;
    height: 300px;
    background-color: #DDE2D8;
    border-radius: 20px;
    margin-bottom: 40px;
  }

  .welcome-text h2 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-dark);
    margin: 0 0 10px 0;
  }

  .welcome-text p {
    font-size: 14px;
    color: var(--text-medium);
    margin: 0;
  }

  /* Right Panel Styling */
  .right-panel {
    width: 450px;
    padding: 50px;
    display: flex;
    flex-direction: column;
  }

  .header {
    margin-bottom: 45px;
  }

  .header h2 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-dark);
    margin: 0 0 5px 0;
  }

  .header p {
    font-size: 14px;
    color: var(--accent-color);
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 35px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .form-group label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-medium);
  }

  .form-group input {
    height: 50px;
    background-color: var(--input-bg);
    border: none;
    border-radius: 15px;
    padding: 0 20px;
    font-size: 14px;
    color: var(--text-dark);
    outline: none;
  }

  .form-group input::placeholder {
    color: var(--accent-color);
    opacity: 0.8;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--text-medium);
  }

  .remember-me input {
    width: 18px;
    height: 18px;
    background-color: #DDE2D8;
    border: none;
    border-radius: 5px;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    position: relative;
  }

  .remember-me input:checked {
    background-color: var(--accent-color);
  }

  .remember-me input:checked::after {
    content: "✓";
    color: white;
    position: absolute;
    left: 4px;
    top: -1px;
    font-size: 12px;
  }

  .forgot-password :global(a) {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent-color);
    text-decoration: none;
  }

  .login-button {
    height: 55px;
    background-color: var(--accent-color);
    color: #F9FBF9;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 5px;
    transition: background-color 0.2s;
  }

  .login-button:hover {
    background-color: #5E715A;
  }

  .signup-prompt {
    text-align: center;
    font-size: 14px;
    color: var(--text-medium);
    margin-bottom: 40px;
  }

  .signup-prompt span {
    color: var(--accent-color);
    font-weight: 700;
    text-decoration: none;
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: var(--text-light);
  }

  .footer-links a {
    color: inherit;
    text-decoration: none;
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--text-light);
  }

  /* Responsive adjustments */
  @media (max-width: 850px) {
    .login-card {
      flex-direction: column;
      width: 450px;
    }
    .left-panel {
      display: none;
    }
  }
</style>
