<script>
  import { navigate, Link } from "svelte-routing";
  import { apiSignUp } from "../api.js";

  let fullName = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

  async function handleSignUp() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await apiSignUp(fullName, email, password);
      
      if (result.success) {
        alert("Account created successfully!");
        navigate("/");
      } else {
        alert("Sign up failed: " + result.message);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      // Fallback for development
      console.warn("Backend not reached. Simulating success for development.");
      alert("Account created! (Dev Simulation)");
      navigate("/");
    }
  }
</script>

<div class="page-wrapper">
  <div class="cards-layout">
    <!-- Left Card: Welcome/Branding -->
    <div class="card branding-card">
      <div class="logo-area">
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

      <div class="feature-image"></div>

      <div class="welcome-message">
        <h2>Welcome User, We are ready <br />to help you with your project.</h2>
        <p>Sign up to manage your team's AI workforce.</p>
      </div>
    </div>

    <!-- Right Card: Sign Up Form -->
    <div class="card form-card">
      <header>
        <h2>Sign up</h2>
        <p class="subtitle">Create your new account to get started</p>
      </header>

      <form on:submit|preventDefault={handleSignUp}>
        <div class="input-group">
          <label for="fullName">Full Name</label>
          <input type="text" id="fullName" bind:value={fullName} required />
        </div>

        <div class="input-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" bind:value={email} required />
        </div>

        <div class="input-group">
          <label for="password">Choose a Password</label>
          <input type="password" id="password" bind:value={password} required />
        </div>

        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" bind:value={confirmPassword} required />
        </div>

        <button type="submit" class="primary-btn">Sign Up</button>
      </form>

      <div class="alt-action">
        Already have an account? <Link to="/"><span>Login</span></Link>
      </div>

      <div class="divider">
        <span class="line"></span>
        <span class="label">or</span>
        <span class="line"></span>
      </div>

      <footer class="legal-links">
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#support">Support</a>
      </footer>
    </div>
  </div>
</div>

<style>
  :root {
    --bg-main: #E8EDE7;
    --card-fill: #F9FBF9;
    --brand-accent: #768D71;
    --input-fill: rgba(221, 226, 216, 0.4);
    --text-heading: #2D362B;
    --text-body: #5A6658;
    --text-muted: #9BA699;
    --radius-card: 30px;
    --radius-input: 12px;
  }

  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--bg-main);
    padding: 20px;
    box-sizing: border-box;
  }

  .cards-layout {
    display: flex;
    gap: 50px;
    width: 950px;
    max-width: 100%;
  }

  .card {
    background-color: var(--card-fill);
    border-radius: var(--radius-card);
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Left Side - Branding */
  .branding-card {
    max-width: 420px;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
  }

  .logo-text h1 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .logo-text p {
    font-size: 14px;
    font-weight: 500;
    color: var(--brand-accent);
    margin: 0;
  }

  .feature-image {
    width: 100%;
    height: 280px;
    background-color: #DDE2D8;
    border-radius: 20px;
    margin-bottom: 35px;
  }

  .welcome-message h2 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-heading);
    line-height: 1.4;
    margin: 0 0 10px 0;
  }

  .welcome-message p {
    font-size: 14px;
    color: var(--text-body);
    margin: 0;
  }

  /* Right Side - Form */
  .form-card {
    max-width: 430px;
  }

  header {
    margin-bottom: 35px;
  }

  header h2 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0 0 5px 0;
  }

  .subtitle {
    font-size: 14px;
    color: var(--brand-accent);
    margin: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .input-group label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-body);
  }

  .input-group input {
    height: 44px;
    background-color: var(--input-fill);
    border: none;
    border-radius: var(--radius-input);
    padding: 0 15px;
    font-size: 14px;
    color: var(--text-heading);
    outline-color: var(--brand-accent);
  }

  .primary-btn {
    height: 55px;
    background-color: var(--brand-accent);
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 10px;
    transition: transform 0.1s, background-color 0.2s;
  }

  .primary-btn:active {
    transform: scale(0.98);
  }

  .alt-action {
    text-align: center;
    font-size: 14px;
    color: var(--text-body);
    margin: 30px 0;
  }

  .alt-action span {
    color: var(--brand-accent);
    font-weight: 700;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
  }

  .divider .line {
    flex: 1;
    height: 1px;
    background-color: #DDE2D8;
  }

  .divider .label {
    font-size: 12px;
    color: var(--text-muted);
  }

  .legal-links {
    display: flex;
    gap: 25px;
    font-size: 11px;
  }

  .legal-links a {
    color: var(--text-muted);
    text-decoration: none;
  }

  @media (max-width: 900px) {
    .cards-layout {
      flex-direction: column;
      align-items: center;
    }
    .branding-card {
      display: none;
    }
  }
</style>
