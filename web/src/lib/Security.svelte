<script>
  import { navigate } from "svelte-routing";

  let keys = [
    { provider: "OpenAI (Primary)", key: "sk-••••••••••••••••••••••••", configured: true },
    { provider: "Open Router", key: "Not configured", configured: false }
  ];

  let logs = [
    { item: "OpenAI Key", actor: "Accessed by Agent E1 (Lead Dev)", time: "2 mins ago" },
    { item: "Ollama Local", actor: "Accessed by Agent E3 (Tester)", time: "14 mins ago" },
    { item: "Master Key", actor: "User Login (New Session)", time: "1 hour ago" }
  ];

  let autoRotation = false;
  let twoFactor = true;

  function handleBack() {
    navigate("/dashboard");
  }

  function handleRevoke() {
    if (confirm("WARNING: This will revoke all API access. Are you sure?")) {
      alert("All access revoked.");
    }
  }
</script>

<div class="security-wrapper">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="user-overview">
      <div class="avatar-circle"></div>
      <h2 class="user-role">Project Owner</h2>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-item" on:click={() => navigate("/profile")}>Profile Info</button>
      <button class="nav-item" on:click={() => navigate("/ai-workforce")}>AI Configuration</button>
      <button class="nav-item active">Security & Keys</button>
    </nav>

    <button class="back-link" on:click={handleBack}>
      ← Back to Dashboard
    </button>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <header class="page-header">
      <h1 class="page-title">Security & API Management</h1>
      <p class="page-subtitle">Manage your credentials and monitor access tokens.</p>
    </header>

    <section class="section">
      <h3>Provider API Keys</h3>
      <div class="keys-list">
        {#each keys as item}
          <div class="key-card">
            <div class="key-info">
              <span class="provider">{item.provider}</span>
              <span class="value {item.configured ? '' : 'placeholder'}">{item.key}</span>
            </div>
            <button class="key-btn {item.configured ? 'primary' : 'secondary'}">
              {item.configured ? 'ROTATE' : 'ADD KEY'}
            </button>
          </div>
        {/each}
      </div>
    </section>

    <section class="section rotation-section">
      <div class="rotation-header">
        <h3>Automatic Key Rotation</h3>
        <button class="toggle-switch {autoRotation ? 'on' : ''}" on:click={() => autoRotation = !autoRotation}>
          <div class="knob"></div>
        </button>
      </div>
      <p class="desc">Rotate keys every 90 days to maintain high security.</p>
    </section>

    <section class="section">
      <h3>Credential Access Logs</h3>
      <div class="logs-container">
        <div class="logs-table">
          {#each logs as log}
            <div class="log-row">
              <span class="log-item">{log.item}</span>
              <span class="log-actor">{log.actor}</span>
              <span class="log-time">{log.time}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <section class="section two-factor">
      <div class="tfa-card">
        <span class="label">Two-Factor Authentication (2FA)</span>
        <button class="toggle-switch {twoFactor ? 'on' : ''}" on:click={() => twoFactor = !twoFactor}>
          <div class="knob"></div>
        </button>
      </div>
    </section>

    <footer class="actions">
      <button class="btn danger-outline" on:click={handleRevoke}>Revoke All API Access</button>
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
  }

  .security-wrapper {
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

  .avatar-circle {
    width: 80px;
    height: 80px;
    background: var(--border-color);
    border-radius: 50%;
    margin: 0 auto 15px auto;
  }

  .user-role {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
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

  .page-header {
    margin-bottom: 40px;
  }

  .page-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  .page-subtitle {
    font-size: 13px;
    color: var(--brand-accent);
    margin: 0;
  }

  .section {
    margin-bottom: 40px;
  }

  .section h3 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 20px 0;
  }

  .keys-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .key-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(221, 226, 216, 0.3);
    border-radius: 15px;
    padding: 15px 20px;
  }

  .key-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .key-info .provider {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-secondary);
  }

  .key-info .value {
    font-size: 14px;
  }

  .key-info .value.placeholder {
    color: var(--text-muted);
  }

  .key-btn {
    height: 35px;
    padding: 0 20px;
    border-radius: 10px;
    border: none;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }

  .key-btn.primary {
    background: var(--brand-accent);
    color: white;
  }

  .key-btn.secondary {
    background: var(--border-color);
    color: var(--text-secondary);
  }

  .rotation-section {
    display: flex;
    flex-direction: column;
  }

  .rotation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rotation-section .desc {
    font-size: 12px;
    color: var(--brand-accent);
    margin-top: -15px;
  }

  .toggle-switch {
    width: 50px;
    height: 26px;
    background: var(--border-color);
    border-radius: 13px;
    border: none;
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  .toggle-switch.on {
    background: var(--brand-accent);
  }

  .toggle-switch .knob {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 0.2s;
  }

  .toggle-switch.on .knob {
    transform: translateX(24px);
  }

  .logs-container {
    border: 1px solid var(--border-color);
    border-style: dashed;
    border-radius: 20px;
    padding: 30px 20px;
  }

  .logs-table {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .log-row {
    display: grid;
    grid-template-columns: 120px 1fr 100px;
    font-size: 12px;
    align-items: center;
  }

  .log-item {
    font-weight: 600;
    color: var(--text-secondary);
  }

  .log-actor {
    color: var(--text-muted);
  }

  .log-time {
    color: var(--text-muted);
    text-align: right;
  }

  .tfa-card {
    background: #E8F2E7;
    border: 1px solid var(--brand-accent);
    border-radius: 15px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tfa-card .label {
    font-size: 14px;
    font-weight: 700;
  }

  .btn.danger-outline {
    width: 100%;
    height: 50px;
    background: var(--card-fill);
    border: 1px solid var(--danger);
    color: var(--danger);
    border-radius: 15px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
</style>
