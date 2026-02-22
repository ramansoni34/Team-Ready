<script>
  import { Link, navigate } from "svelte-routing";
  import { apiForgotPassword } from "../api.js";

  let email = "";

  async function handleSendResetLink() {
    try {
      const result = await apiForgotPassword(email);
      if (result.success) {
        alert("Reset link sent to your email!");
        navigate("/");
      } else {
        alert("Failed to send reset link: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      // Fallback for development
      console.warn("Backend not reached. Simulating success for development.");
      alert("Reset link sent! (Dev Simulation)");
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
        <h2>No worries, it happens. <br />Let's get you back to work.</h2>
        <p>We will help you reset your credentials safely.</p>
      </div>
    </div>

    <!-- Right Card: Forgot Password Form -->
    <div class="card form-card">
      <div class="back-nav">
        <Link to="/">
          <div class="back-link">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M10 5L0 5L4 0M4 10L0 5" stroke="#768D71" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>Back to login</span>
          </div>
        </Link>
      </div>

      <header>
        <h2>Forgot Password</h2>
        <p class="subtitle">Enter your email to receive a reset link</p>
      </header>

      <form on:submit|preventDefault={handleSendResetLink}>
        <div class="input-group">
          <label for="email">Registered Email Address</label>
          <input type="email" id="email" placeholder="your-email@company.com" bind:value={email} required />
        </div>

        <button type="submit" class="primary-btn">Send Reset Link</button>
      </form>

      <div class="resend-prompt">
        Didn't receive the email? <span class="resend-action">Resend</span>
      </div>

      <footer class="legal-links">
        <a href="#privacy">Privacy Policy</a>
        <div class="dot"></div>
        <a href="#support">Contact Support</a>
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
    --radius-input: 15px;
  }

  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--bg-main);
    padding: 20px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
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

  .back-nav {
    margin-bottom: 20px;
    opacity: 0.7;
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--brand-accent);
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
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
    gap: 30px;
    margin-bottom: 35px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .input-group label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-body);
  }

  .input-group input {
    height: 55px;
    background-color: var(--input-fill);
    border: none;
    border-radius: var(--radius-input);
    padding: 0 15px;
    font-size: 14px;
    color: var(--text-heading);
    outline-color: var(--brand-accent);
  }

  .input-group input::placeholder {
    color: var(--brand-accent);
    opacity: 0.6;
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
    transition: transform 0.1s, background-color 0.2s;
  }

  .primary-btn:active {
    transform: scale(0.98);
  }

  .resend-prompt {
    text-align: center;
    font-size: 13px;
    color: var(--text-body);
    opacity: 0.8;
    margin-bottom: auto;
  }

  .resend-action {
    color: var(--brand-accent);
    font-weight: 700;
    cursor: pointer;
  }

  .legal-links {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 40px;
  }

  .legal-links a {
    color: inherit;
    text-decoration: none;
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--text-muted);
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
