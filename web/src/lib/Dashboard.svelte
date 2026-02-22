<script>
  import { navigate } from "svelte-routing";
  import { onMount } from 'svelte';
  import { initSocket, sendCommand } from "../api.js";
  import { chatMessages, agentLogs } from "../stores.js";

  // --- State ---
  let command = '';
  let criticismMode = true;

  onMount(() => {
    const socket = initSocket();

    return () => {
      if (socket) socket.disconnect();
    };
  });

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleNewProject() {
    navigate("/new-deployment");
  }

  function handleManageProjects() {
    navigate("/manage-projects");
  }

  async function handleSendCommand() {
    if (!command.trim()) return;
    
    // Update store directly for user message
    chatMessages.update(messages => [
      ...messages,
      { sender: 'Boss', text: command, type: 'user' }
    ]);
    
    const currentCommand = command;
    command = '';
    
    sendCommand(currentCommand);
  }
</script>

<div class="dashboard-wrapper">
  <!-- Header -->
  <header class="header">
    <div class="header-left">
      <h1 class="title">Team Ready - Dashboard</h1>
      <div class="criticism-toggle">
        <span class="label">AGENT CRITICISM MODE</span>
        <button class="toggle {criticismMode ? 'on' : ''}" on:click={() => criticismMode = !criticismMode}>
          <div class="knob"></div>
        </button>
      </div>
    </div>
    
    <div class="header-right">
      <button class="btn primary" on:click={handleNewProject}>+ New Project</button>
      <button class="btn secondary" on:click={handleManageProjects}>Manage Projects</button>
      <button class="profile-btn" on:click={handleProfileClick}>
        <div class="avatar">
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="8" r="4" fill="#768D71"/>
            <path d="M4 18C4 15 6.5 13 10 13C13.5 13 16 15 16 18" stroke="#768D71" stroke-width="2" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
      </button>
    </div>
  </header>

  <main class="content">
    <!-- Left Column -->
    <div class="col left">
      <section class="card task-list">
        <h2>Task List (LLM Marked)</h2>
        <ul class="tasks">
          <li>
            <div class="checkbox checked"></div>
            <span>Design Login Screen</span>
          </li>
          <li>
            <div class="checkbox checked"></div>
            <span>Implement API Client</span>
          </li>
          <li>
            <div class="checkbox"></div>
            <span>Write Unit Tests</span>
          </li>
        </ul>
      </section>

      <section class="card logs">
        <h2>AI Employee Logs</h2>
        <ul class="log-entries">
          {#each $agentLogs as log}
            <li>• {log}</li>
          {/each}
        </ul>
      </section>
    </div>

    <!-- Middle Column -->
    <div class="col middle">
      <section class="card flow-chart">
        <h2>Task Flow Chart</h2>
        <div class="chart-container">
          <div class="node outline">UI Design</div>
          <div class="arrow">→</div>
          <div class="node filled">API Integration</div>
        </div>
      </section>

      <div class="agent-controls">
        <button class="control-card start">
          <span>Start All Agents</span>
        </button>
        <button class="control-card stop">
          <span>Stop All Agents</span>
        </button>
      </div>
    </div>

    <!-- Right Column -->
    <div class="col right">
      <section class="card chat">
        <div class="chat-header">
          <h2>Client Chat</h2>
          <button class="fullscreen-btn" on:click={() => navigate("/monitor")}>⛶ FULL SCREEN</button>
        </div>

        <div class="chat-feed">
          {#each $chatMessages as msg}
            <div class="message-wrapper {msg.type}">
              <div class="message-bubble">
                {msg.text}
              </div>
              {#if msg.type === 'user'}
                <span class="sender-label">BOSS</span>
              {/if}
            </div>
          {/each}
        </div>

        <div class="chat-input-area">
          <div class="input-wrapper">
            <button class="attach-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A6658" stroke-width="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
            <input type="text" placeholder="Message agents..." bind:value={command} on:keydown={(e) => e.key === 'Enter' && handleSendCommand()}/>
            <button class="send-btn" on:click={handleSendCommand}>
              <svg width="12" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1L9 6L1 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
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

  .dashboard-wrapper {
    background-color: var(--bg-main);
    min-height: 100vh;
    padding: 30px 40px;
    font-family: 'Inter', sans-serif;
    color: var(--text-dark);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }

  .criticism-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--card-fill);
    border: 1px solid var(--brand-accent);
    padding: 5px 15px;
    border-radius: 15px;
  }

  .criticism-toggle .label {
    font-size: 11px;
    font-weight: 600;
    color: var(--brand-accent);
  }

  .toggle {
    width: 35px;
    height: 18px;
    background: var(--border-color);
    border-radius: 9px;
    border: none;
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  .toggle.on {
    background: var(--brand-accent);
  }

  .toggle .knob {
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 0.2s;
  }

  .toggle.on .knob {
    transform: translateX(17px);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .btn {
    height: 40px;
    border-radius: 12px;
    border: none;
    padding: 0 20px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn.primary {
    background: var(--brand-accent);
    color: white;
  }

  .btn.secondary {
    background: var(--border-color);
    color: var(--text-secondary);
  }

  .profile-btn {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  .avatar {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    display: grid;
    grid-template-columns: 280px 1fr 320px;
    gap: 20px;
    flex: 1;
  }

  .card {
    background: var(--card-fill);
    border: 1px solid var(--border-color);
    border-radius: 25px;
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
  }

  .card h2 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 20px 0;
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Task List */
  .tasks {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .tasks li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    color: var(--text-secondary);
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid var(--brand-accent);
    background: var(--border-color);
  }

  .checkbox.checked {
    background: var(--brand-accent);
  }

  /* Logs */
  .logs {
    flex: 1;
  }

  .log-entries {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: var(--text-secondary);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Flow Chart */
  .flow-chart {
    height: 620px;
  }

  .chart-container {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 40px;
  }

  .node {
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 600;
  }

  .node.outline {
    border: 1px solid var(--brand-accent);
    color: var(--text-dark);
  }

  .node.filled {
    background: var(--brand-accent);
    color: white;
  }

  .arrow {
    color: var(--brand-accent);
    font-size: 18px;
  }

  /* Agent Controls */
  .agent-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    height: 90px;
  }

  .control-card {
    border-radius: 25px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
  }

  .control-card.start {
    background: var(--brand-accent);
    color: white;
  }

  .control-card.stop {
    background: var(--card-fill);
    border: 1px solid var(--danger);
    color: var(--danger);
  }

  /* Chat */
  .chat {
    flex: 1;
    padding: 25px 15px;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  .chat-header h2 {
    margin: 0;
  }

  .fullscreen-btn {
    background: rgba(118, 141, 113, 0.1);
    border: 1px solid var(--brand-accent);
    color: var(--brand-accent);
    font-size: 10px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  .chat-feed {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .message-wrapper {
    display: flex;
    flex-direction: column;
    max-width: 85%;
  }

  .message-wrapper.system {
    align-self: flex-start;
  }

  .message-wrapper.user {
    align-self: flex-end;
  }

  .message-bubble {
    padding: 12px 15px;
    border-radius: 10px;
    font-size: 11px;
    line-height: 1.4;
  }

  .system .message-bubble {
    background: var(--brand-accent);
    color: white;
  }

  .user .message-bubble {
    background: var(--success-light);
    border: 1px solid var(--border-color);
    color: var(--text-dark);
  }

  .sender-label {
    font-size: 9px;
    font-weight: 700;
    color: var(--brand-accent);
    align-self: flex-end;
    margin-top: 5px;
  }

  .chat-input-area {
    margin-top: auto;
  }

  .input-wrapper {
    background: #F0F4F0;
    border: 1px solid var(--border-color);
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 10px;
  }

  .input-wrapper input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-size: 13px;
    color: var(--text-dark);
  }

  .input-wrapper input::placeholder {
    color: var(--text-muted);
  }

  .attach-btn, .send-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .send-btn {
    background: var(--brand-accent);
    width: 35px;
    height: 35px;
    border-radius: 10px;
  }
</style>
