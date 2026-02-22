<script>
  import { navigate } from "svelte-routing";

  let filter = "All";
  let projects = [
    {
      id: "alpha",
      name: "Project Alpha: Web Automation",
      details: "Department: Development • 4 Agents Active",
      progress: 75,
      status: "ACTIVE"
    },
    {
      id: "marketing",
      name: "Q4 Marketing Campaign",
      details: "Department: Creative • 2 Agents Paused",
      progress: 25,
      status: "PAUSED"
    },
    {
      id: "audit",
      name: "API Security Audit",
      details: "Department: Analytics • 3 Agents Idle",
      progress: 100,
      status: "COMPLETE"
    }
  ];

  function handleBack() {
    navigate("/dashboard");
  }

  function handleNewDeployment() {
    navigate("/new-deployment");
  }

  function handleArchiveAll() {
    alert("Archiving all projects...");
  }
</script>

<div class="manage-wrapper">
  <header class="page-header">
    <h1 class="page-title">Manage Projects</h1>
    <p class="page-subtitle">Overview of your AI workforce deployments</p>
    
    <div class="filter-bar">
      <button class="filter-btn {filter === 'All' ? 'active' : ''}" on:click={() => filter = 'All'}>All ({projects.length + 1})</button>
      <button class="filter-btn {filter === 'Active' ? 'active' : ''}" on:click={() => filter = 'Active'}>Active</button>
      <button class="filter-btn {filter === 'Paused' ? 'active' : ''}" on:click={() => filter = 'Paused'}>Paused</button>
    </div>
  </header>

  <main class="projects-grid">
    {#each projects as project}
      <div class="project-card">
        <h2 class="project-name">{project.name}</h2>
        <p class="project-details">{project.details}</p>
        
        <div class="progress-section">
          <div class="progress-container">
            <div class="progress-bar" style="width: {project.progress}%"></div>
          </div>
          <span class="progress-label">{project.progress}%</span>
        </div>

        <div class="card-footer">
          <div class="status-tag {project.status.toLowerCase()}">{project.status}</div>
          <button class="action-link">
            {project.status === 'COMPLETE' ? 'Archive Project' : project.status === 'PAUSED' ? 'Resume Project' : 'View Details →'}
          </button>
        </div>
      </div>
    {/each}
  </main>

  <footer class="page-footer">
    <button class="back-link" on:click={handleBack}>← Back to Dashboard</button>
    <button class="btn primary archive-btn" on:click={handleArchiveAll}>Archive All</button>
  </footer>
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
    --success-light: #E8F2E7;
    --paused-bg: #F5F5F5;
  }

  .manage-wrapper {
    background-color: var(--bg-main);
    box-sizing: border-box;
    color: var(--text-dark);
    display: flex;
    flex-direction: column;
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    padding: 40px 60px;
  }

  .page-header {
    margin-bottom: 50px;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  .page-subtitle {
    font-size: 14px;
    color: var(--brand-accent);
    margin-bottom: 30px;
  }

  .filter-bar {
    display: flex;
    gap: 10px;
  }

  .filter-btn {
    height: 36px;
    padding: 0 25px;
    border-radius: 18px;
    border: none;
    background: rgba(221, 226, 216, 0.6);
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .filter-btn.active {
    background: var(--brand-accent);
    color: white;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 60px;
  }

  .project-card {
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    border-radius: 25px;
    padding: 30px 25px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .project-name {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }

  .project-details {
    font-size: 13px;
    color: var(--brand-accent);
    margin: 0 0 25px 0;
  }

  .progress-section {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
  }

  .progress-container {
    flex: 1;
    height: 10px;
    background: rgba(221, 226, 216, 0.4);
    border-radius: 5px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: var(--brand-accent);
    border-radius: 5px;
  }

  .progress-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--brand-accent);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .status-tag {
    height: 30px;
    padding: 0 15px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-tag.active, .status-tag.complete {
    background: var(--success-light);
    color: var(--brand-accent);
  }

  .status-tag.paused {
    background: var(--paused-bg);
    color: var(--text-muted);
  }

  .action-link {
    background: none;
    border: none;
    color: var(--brand-accent);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .new-card {
    background: var(--bg-main);
    border: 2px dashed var(--brand-accent);
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .new-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--brand-accent);
    margin-bottom: 10px;
  }

  .new-desc {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .back-link {
    background: none;
    border: none;
    color: var(--brand-accent);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .archive-btn {
    width: 150px;
    height: 50px;
    background: var(--brand-accent);
    color: white;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    border: none;
    cursor: pointer;
  }
</style>
