import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Profile from './lib/Profile.svelte';
import NewDeployment from './lib/NewDeployment.svelte';
import ManageProjects from './lib/ManageProjects.svelte';
import Security from './lib/Security.svelte';
import FlowChart from './lib/FlowChart.svelte';
import DualChat from './lib/DualChat.svelte';
import ControlPanel from './lib/ControlPanel.svelte';
import TaskList from './lib/TaskList.svelte';
import AgentLog from './lib/AgentLog.svelte';

describe('Component Rendering', () => {
  it('should render Profile stub', () => {
    render(Profile);
    expect(screen.getByText(/Personal Details/i)).toBeInTheDocument();
  });

  it('should render NewDeployment stub', () => {
    render(NewDeployment);
    expect(screen.getByText(/Initialize New Deployment/i)).toBeInTheDocument();
  });

  it('should render ManageProjects stub', () => {
    render(ManageProjects);
    expect(screen.getByText(/Manage Projects/i)).toBeInTheDocument();
  });

  it('should render Security stub', () => {
    render(Security);
    expect(screen.getByText(/Security & API Management/i)).toBeInTheDocument();
  });

  it('should render FlowChart stub', () => {
    render(FlowChart);
    expect(screen.getByText(/Task Flow Chart/i)).toBeInTheDocument();
  });

  it('should render DualChat stub', () => {
    render(DualChat);
    expect(screen.getByText(/Dual Chat/i)).toBeInTheDocument();
  });

  it('should render ControlPanel stub', () => {
    render(ControlPanel);
    expect(screen.getByText(/Control Panel/i)).toBeInTheDocument();
  });

  it('should render TaskList stub', () => {
    render(TaskList);
    expect(screen.getByText(/Task List/i)).toBeInTheDocument();
  });

  it('should render AgentLog stub', () => {
    render(AgentLog);
    expect(screen.getByText(/Agent Logs/i)).toBeInTheDocument();
  });
});
