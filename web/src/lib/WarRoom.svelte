<script>
  import { navigate } from "svelte-routing";

  function handleExit() {
    navigate("/dashboard");
  }
</script>

<div class="war-room-wrapper">
  <header class="header">
    <div class="header-left">
      <div class="live-indicator">
        <div class="pulse-dot"></div>
        <span>LIVE DEBATE</span>
      </div>
    </div>
    <div class="header-right">
      <button class="exit-btn" on:click={handleExit}>EXIT MONITOR</button>
    </div>
  </header>

  <main class="content">
    <div class="sidebar">
      <!-- Agent List Placeholder -->
    </div>
    <div class="debate-feed">
      <!-- Internal Chat Placeholder -->
      <h2>Internal Agent Debate</h2>
    </div>
  </main>
</div>

<style>
  .war-room-wrapper {
    background: #1a1a1a;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #252525;
  }

  .live-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ff4444;
    font-weight: bold;
  }

  .pulse-dot {
    width: 12px;
    height: 12px;
    background: #ff4444;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); opacity: 0.7; }
    70% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.7; }
  }

  .exit-btn {
    background: #444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
