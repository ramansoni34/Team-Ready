<script>
  import { navigate } from "svelte-routing";

  let projectName = "";
  let deliverables = "";
  let repoUrl = "https://github.com/user/repo";
  let constraints = "";
  let testingType = "Unit + Integration";
  let minCoverage = 85;

  let criteria = [
    { text: "Clean documentation for all functions", checked: true },
    { text: "Zero critical security vulnerabilities", checked: false }
  ];

  function handleAddCondition() {
    criteria = [...criteria, { text: "New Condition", checked: false }];
  }

  function handleLaunch() {
    alert("Launching AI Workforce for project: " + projectName);
    navigate("/dashboard");
  }
</script>

<div class="deployment-wrapper">
  <header class="page-header">
    <h1 class="page-title">Initialize New Deployment</h1>
    <p class="page-subtitle">Define the scope, constraints, and criteria for your AI team.</p>
  </header>

  <main class="main-card">
    <div class="card-grid">
      <!-- Left Column: Project Core -->
      <div class="col">
        <h2 class="section-title">1. Project Core</h2>
        
        <div class="field-group">
          <label for="projectName">Project Name</label>
          <div class="input-wrapper">
            <input type="text" id="projectName" placeholder="e.g. E-commerce Backend Migration" bind:value={projectName} />
          </div>
        </div>

        <div class="field-group">
          <label for="deliverables">Final Deliverables (What must be delivered?)</label>
          <div class="input-wrapper textarea">
            <textarea id="deliverables" placeholder="Describe the final output..." bind:value={deliverables}></textarea>
          </div>
        </div>

        <div class="field-group">
          <label for="repoUrl">Existing Repository (GitHub / GitLab URL)</label>
          <div class="input-wrapper repo">
            <svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <input type="text" id="repoUrl" bind:value={repoUrl} />
          </div>
        </div>

        <div class="field-group">
          <label for="constraints">Constraints & Decisions (Your "Taste")</label>
          <div class="input-wrapper textarea large">
            <textarea id="constraints" placeholder="List any forbidden libraries or specific architectural choices..." bind:value={constraints}></textarea>
          </div>
        </div>
      </div>

      <!-- Right Column: Acceptance & Testing -->
      <div class="col">
        <h2 class="section-title">2. Acceptance & Testing</h2>

        <div class="field-group">
          <span class="field-label">Acceptance Criteria (Checklist)</span>
          <div class="checklist-card">
            {#each criteria as item}
              <div class="check-item">
                <button class="checkbox {item.checked ? 'checked' : ''}" on:click={() => item.checked = !item.checked}></button>
                <span>{item.text}</span>
              </div>
            {/each}
            <button class="add-btn" on:click={handleAddCondition}>+ Add Condition</button>
          </div>
        </div>

        <div class="testing-row">
          <div class="field-group half">
            <span class="field-label">Testing Type</span>
            <div class="selector-box active">
              {testingType}
            </div>
          </div>
          <div class="field-group half">
            <label for="minCoverage">Min. Coverage %</label>
            <div class="input-wrapper small">
              <input type="number" id="minCoverage" bind:value={minCoverage} />
              <span>%</span>
            </div>
          </div>
        </div>

        <div class="field-group">
          <span class="field-label">Knowledge Base (PDFs, Docs, Snippets)</span>
          <div class="upload-zone">
            <span class="main-text">Click or Drag files to upload</span>
            <span class="sub-text">PDF, TXT, MD, or JSON up to 50MB</span>
          </div>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <button class="btn primary launch-btn" on:click={handleLaunch}>
        Launch AI Workforce →
      </button>
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
    --input-bg: rgba(221, 226, 216, 0.3);
  }

  .deployment-wrapper {
    background-color: var(--bg-main);
    min-height: 100vh;
    padding: 40px 60px;
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
    box-sizing: border-box;
  }

  .page-header {
    margin-bottom: 40px;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  .page-subtitle {
    font-size: 14px;
    color: var(--brand-accent);
  }

  .main-card {
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0,0,0,0.02);
  }

  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 30px 0;
  }

  .field-group {
    margin-bottom: 30px;
  }

  .field-group label, .field-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 10px;
  }

  .input-wrapper {
    background: var(--input-bg);
    border-radius: 12px;
    height: 45px;
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

  .input-wrapper input::placeholder {
    color: var(--text-muted);
  }

  .input-wrapper.textarea {
    height: 80px;
    padding: 15px;
  }

  .input-wrapper.textarea.large {
    height: 120px;
  }

  .input-wrapper textarea {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    resize: none;
    font-family: inherit;
    font-size: 13px;
  }

  .input-wrapper.repo {
    gap: 10px;
  }

  .input-wrapper.repo .icon {
    color: var(--brand-accent);
  }

  .input-wrapper.repo input {
    color: var(--brand-accent);
  }

  /* Checklist */
  .checklist-card {
    background: #F0F4F0;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--text-secondary);
  }

  .checkbox {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid var(--brand-accent);
    background: var(--border-color);
    cursor: pointer;
    padding: 0;
  }

  .checkbox.checked {
    background: var(--brand-accent);
  }

  .add-btn {
    background: none;
    border: none;
    color: var(--brand-accent);
    font-size: 12px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
    margin-top: 5px;
  }

  .testing-row {
    display: flex;
    gap: 20px;
  }

  .field-group.half {
    flex: 1;
  }

  .selector-box {
    background: var(--brand-accent);
    color: white;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
  }

  .input-wrapper.small {
    height: 40px;
    justify-content: space-between;
  }

  .input-wrapper.small input {
    width: 40px;
  }

  .upload-zone {
    border: 1px solid var(--brand-accent);
    border-style: dashed;
    border-radius: 20px;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
  }

  .upload-zone .main-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--brand-accent);
  }

  .upload-zone .sub-text {
    font-size: 11px;
    color: var(--text-muted);
  }

  .launch-btn {
    background: var(--brand-accent);
    color: white;
    width: 100%;
    height: 60px;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 700;
    border: none;
    cursor: pointer;
  }
</style>
