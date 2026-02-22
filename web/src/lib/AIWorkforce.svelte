<script>
  import { navigate } from "svelte-routing";

  let selectedProvider = "OpenAI";
  let showModal = false;
  let modelString = "";
  let providerModels = {
    "OpenAI": "gpt-4o",
    "Open Router": "anthropic/claude-3.5-sonnet",
    "Gemini": "gemini-1.5-pro",
    "Local (Ollama)": "llama3"
  };

  let hardLimit = "50.00";
  let autoKill = true;
  let autonomyLevel = "Strict Approval";
  let allowCollaboration = true;
  let mandatoryPeerReview = true;

  function handleProviderClick(provider) {
    selectedProvider = provider;
    modelString = providerModels[provider] || "";
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function saveModel() {
    providerModels[selectedProvider] = modelString;
    showModal = false;
  }

  function handleBack() {
    navigate("/dashboard");
  }

  function handleSave() {
    alert("Global configurations saved.");
  }
</script>

<div class="workforce-wrapper">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="user-overview">
      <div class="avatar-circle"></div>
      <h2 class="user-role">Project Owner</h2>
    </div>

    <nav class="sidebar-nav">
      <button class="nav-item" on:click={() => navigate("/profile")}>Profile Info</button>
      <button class="nav-item active">AI Configuration</button>
      <button class="nav-item" on:click={() => navigate("/security")}>Security & Keys</button>
    </nav>

    <button class="back-link" on:click={handleBack}>
      ← Back to Dashboard
    </button>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <h1 class="page-title">AI Workforce Settings</h1>

    <section class="settings-section">
      <h3>Model Provider Selection</h3>
      <div class="provider-grid">
        {#each ["OpenAI", "Open Router", "Gemini", "Local (Ollama)"] as provider}
          <button 
            class="provider-card {selectedProvider === provider ? 'active' : ''}" 
            on:click={() => handleProviderClick(provider)}
          >
            {provider}
          </button>
        {/each}
      </div>
    </section>

    <!-- Model Configuration Modal -->
    {#if showModal}
      <div 
        class="modal-backdrop" 
        on:click|self={closeModal} 
        on:keydown={(e) => e.key === 'Escape' && closeModal()}
        role="button"
        tabindex="-1"
        aria-label="Close modal"
      >
        <div class="modal-card">
          <header class="modal-header">
            <h2>Configure {selectedProvider}</h2>
            <p>Enter the specific model identifier you wish to use.</p>
          </header>
          
          <div class="modal-body">
            <div class="field-group">
              <label for="modelString">Model String</label>
              <div class="input-wrapper full">
                <input type="text" id="modelString" bind:value={modelString} placeholder="e.g. gpt-4o" />
              </div>
            </div>
          </div>

          <footer class="modal-footer">
            <button class="btn secondary" on:click={closeModal}>Cancel</button>
            <button class="btn primary" on:click={saveModel}>Save Configuration</button>
          </footer>
        </div>
      </div>
    {/if}

    <section class="settings-section">
      <h3>Spending Controls</h3>
      <div class="controls-row">
        <div class="field-group">
          <span class="field-label">Hard Monthly Limit ($)</span>
          <div class="input-wrapper">
            <input type="text" bind:value={hardLimit} />
          </div>
        </div>
        <div class="field-group">
          <span class="field-label">Auto-Kill processes on limit</span>
          <button class="toggle-switch {autoKill ? 'on' : ''}" on:click={() => autoKill = !autoKill}>
            <div class="knob"></div>
          </button>
        </div>
      </div>
    </section>

    <section class="settings-section">
      <h3>Agent Autonomy Level</h3>
      <div class="autonomy-options">
        <button 
          class="option-card {autonomyLevel === 'Strict Approval' ? 'active' : ''}"
          on:click={() => autonomyLevel = 'Strict Approval'}
        >
          <div class="radio-circle"></div>
          <div class="option-text">
            <span class="label">Strict Approval</span>
            <span class="desc">Agents ask permission for every external action.</span>
          </div>
        </button>

        <button 
          class="option-card {autonomyLevel === 'Autonomous' ? 'active' : ''}"
          on:click={() => autonomyLevel = 'Autonomous'}
        >
          <div class="radio-circle"></div>
          <div class="option-text">
            <span class="label">Autonomous</span>
            <span class="desc">Agents only ask for help on undefined decision blocks.</span>
          </div>
        </button>
      </div>
    </section>

    <section class="settings-section">
      <h3>Team Dynamics</h3>
      <div class="dynamics-row">
        <div class="dynamic-item">
          <span>Allow Inter-Agent Collaboration</span>
          <button class="toggle-switch {allowCollaboration ? 'on' : ''}" on:click={() => allowCollaboration = !allowCollaboration}>
            <div class="knob"></div>
          </button>
        </div>
        <div class="dynamic-item">
          <span>Mandatory Peer Review (Criticism)</span>
          <button class="toggle-switch {mandatoryPeerReview ? 'on' : ''}" on:click={() => mandatoryPeerReview = !mandatoryPeerReview}>
            <div class="knob"></div>
          </button>
        </div>
      </div>
    </section>

    <footer class="actions">
      <button class="btn primary full-width" on:click={handleSave}>Save Global Configurations</button>
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
  }

  .workforce-wrapper {
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

  .page-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 40px 0;
  }

  .settings-section {
    margin-bottom: 40px;
  }

  .settings-section h3 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 20px 0;
  }

  .provider-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .provider-card {
    height: 60px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    background: var(--card-fill);
    font-size: 12px;
    font-weight: 700;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .provider-card.active {
    border: 2px solid var(--brand-accent);
    color: var(--brand-accent);
  }

  .controls-row {
    display: flex;
    gap: 40px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field-label {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .input-wrapper {
    width: 240px;
    height: 45px;
    background: rgba(221, 226, 216, 0.4);
    border-radius: 12px;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }

  .input-wrapper input {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: var(--text-dark);
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

  .autonomy-options {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .option-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px 25px;
    border-radius: 15px;
    border: 1px solid var(--border-color);
    background: var(--card-fill);
    text-align: left;
    cursor: pointer;
  }

  .option-card.active {
    background: #E8F2E7;
    border-color: var(--brand-accent);
  }

  .radio-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    position: relative;
  }

  .option-card.active .radio-circle {
    background: var(--brand-accent);
    border-color: var(--brand-accent);
  }

  .option-text {
    display: flex;
    flex-direction: column;
  }

  .option-text .label {
    font-size: 14px;
    font-weight: 700;
  }

  .option-text .desc {
    font-size: 11px;
    color: var(--text-secondary);
  }

  .dynamics-row {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .dynamic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: var(--text-secondary);
  }

  .btn {
    height: 50px;
    border-radius: 15px;
    font-size: 15px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .btn.primary {
    background: var(--brand-accent);
    color: white;
  }

  .btn.secondary {
    background: var(--border-color);
    color: var(--text-secondary);
  }

  .full-width {
    width: 100%;
  }

  /* Modal Styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    cursor: pointer;
    border: none;
    outline: none;
  }

  .modal-card {
    background: var(--card-fill);
    border-radius: 25px;
    width: 450px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 30px;
    cursor: default;
  }

  .modal-header h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 5px 0;
  }

  .modal-header p {
    font-size: 13px;
    color: var(--brand-accent);
    margin: 0;
  }

  .modal-body .input-wrapper.full {
    width: 100%;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }

  .modal-footer .btn {
    padding: 0 25px;
  }
</style>
