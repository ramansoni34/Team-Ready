<script>
  import { navigate } from "svelte-routing";

  let fullName = "John Doe";
  let email = "john.doe@example.com";
  let plan = "Premium Plan";
  let currentSpend = 124.50;
  let spendingLimit = 500.00;

  function handleBack() {
    navigate("/dashboard");
  }

  function handleUpdate() {
    alert("Profile update logic not implemented.");
  }

  function handleLogout() {
    alert("Logout logic not implemented.");
    navigate("/");
  }
</script>

<div class="profile-wrapper">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="user-overview">
      <div class="avatar-large">JD</div>
      <h2 class="user-name">{fullName}</h2>
      <span class="plan-label">{plan}</span>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-item active">Profile Info</button>
      <button class="nav-item" on:click={() => navigate("/ai-workforce")}>AI Configuration</button>
      <button class="nav-item" on:click={() => navigate("/security")}>Security & Keys</button>
    </nav>

    <button class="back-link" on:click={handleBack}>
      ← Back to Dashboard
    </button>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <h1 class="page-title">Personal Details</h1>

    <section class="section">
      <div class="field-group">
        <span class="field-label">Full Name</span>
        <div class="input-display">{fullName}</div>
      </div>

      <div class="field-group">
        <span class="field-label">Email Address</span>
        <div class="input-display">{email}</div>
      </div>
    </section>

    <section class="section">
      <h3>Subscription Plan</h3>
      <div class="plan-card">
        <div class="plan-info">
          <h4>Enterprise AI Plus</h4>
          <p>Unlimited Agents • Priority Model Access • $199/mo</p>
        </div>
        <button class="upgrade-btn">UPGRADE</button>
      </div>
    </section>

    <section class="section">
      <h3>Global Spending Limit</h3>
      <p class="subtitle">Maximum dollar cap across all active projects.</p>
      
      <div class="spending-card">
        <div class="spending-info">
          <div class="spend-stats">
            <div class="stat">
              <span class="label">Current Month Spend</span>
              <span class="value">${currentSpend.toFixed(2)}</span>
            </div>
            <span class="limit-label">Limit: ${spendingLimit.toFixed(2)}</span>
          </div>
          
          <div class="progress-bar">
            <div class="progress-fill" style="width: {(currentSpend / spendingLimit) * 100}%"></div>
          </div>
        </div>
      </div>
    </section>

    <footer class="actions">
      <button class="btn primary" on:click={handleUpdate}>Update Profile</button>
      <button class="logout-link" on:click={handleLogout}>Logout from all devices</button>
    </footer>
  </main>
</div>

<style>
  :root {
    --bg-main: #E8EDE7;
    --card-fill: #F9FBF9;
    --border-color: #DDE2D8;
    --text-dark: #2D362B;
    --brand-accent: #768D71;
    --text-secondary: #5A6658;
    --text-muted: #9BA699;
    --danger: #EF4444;
    --success-light: #E8F2E7;
  }

  .profile-wrapper {
    background-color: var(--bg-main);
    min-height: 100vh;
    padding: 40px;
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
    display: flex;
    gap: 30px;
    box-sizing: border-box;
  }

  /* Sidebar */
  .sidebar {
    width: 280px;
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    padding: 60px 0 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-overview {
    text-align: center;
    margin-bottom: 60px;
  }

  .avatar-large {
    width: 90px;
    height: 90px;
    background: var(--brand-accent);
    border-radius: 50%;
    color: white;
    font-size: 28px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px auto;
  }

  .user-name {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 5px 0;
  }

  .plan-label {
    font-size: 12px;
    color: var(--brand-accent);
    font-weight: 500;
  }

  .sidebar-nav {
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: auto;
  }

  .nav-item {
    height: 45px;
    border-radius: 15px;
    border: none;
    background: none;
    text-align: left;
    padding: 0 20px;
    font-size: 14px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .nav-item.active {
    background: var(--brand-accent);
    color: white;
    font-weight: 600;
  }

  .back-link {
    background: none;
    border: none;
    color: var(--brand-accent);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
  }

  .page-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 50px 0;
  }

  .section {
    margin-bottom: 50px;
  }

  .section h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 20px 0;
  }

  .field-group {
    margin-bottom: 25px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 10px;
  }

  .input-display {
    height: 45px;
    background: rgba(221, 226, 216, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
  }

  .plan-card {
    background: var(--success-light);
    border: 1px solid var(--brand-accent);
    border-radius: 20px;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .plan-info h4 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 5px 0;
  }

  .plan-info p {
    font-size: 13px;
    color: var(--brand-accent);
    margin: 0;
  }

  .upgrade-btn {
    background: var(--brand-accent);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }

  .subtitle {
    font-size: 13px;
    color: var(--brand-accent);
    margin: -15px 0 25px 0;
  }

  .spending-card {
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    border-style: dashed;
    border-radius: 20px;
    padding: 25px;
  }

  .spend-stats {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 15px;
  }

  .stat {
    display: flex;
    flex-direction: column;
  }

  .stat .label {
    font-size: 12px;
    color: var(--text-secondary);
    margin-bottom: 5px;
  }

  .stat .value {
    font-size: 22px;
    font-weight: 700;
  }

  .limit-label {
    font-size: 14px;
    color: var(--text-muted);
  }

  .progress-bar {
    height: 8px;
    background: var(--border-color);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--brand-accent);
    border-radius: 4px;
  }

  .actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .btn.primary {
    width: 530px;
    height: 55px;
    background: var(--brand-accent);
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }

  .logout-link {
    background: none;
    border: none;
    color: var(--danger);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
</style>
