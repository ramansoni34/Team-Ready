<script>
    import { Router, Route } from "svelte-routing";
    import Login from "./lib/Login.svelte";
    import SignUp from "./lib/SignUp.svelte";
    import Dashboard from "./lib/Dashboard.svelte";
    import Profile from "./lib/Profile.svelte";
    import NewDeployment from "./lib/NewDeployment.svelte";
    import ManageProjects from "./lib/ManageProjects.svelte";
    import Security from "./lib/Security.svelte";
    import AIWorkforce from "./lib/AIWorkforce.svelte";
    import ForgotPassword from "./lib/ForgotPassword.svelte";
    import WarRoom from "./lib/WarRoom.svelte";
</script>

<main>
    <Router>
        <Route path="/" component="{Login}" />
        <Route path="signup" component="{SignUp}" />
        <Route path="forgot-password" component="{ForgotPassword}" />
        <Route path="dashboard" component="{Dashboard}" />
        <Route path="profile" component="{Profile}" />
        <Route path="new-deployment" component="{NewDeployment}" />
        <Route path="manage-projects" component="{ManageProjects}" />
        <Route path="security" component="{Security}" />
        <Route path="ai-workforce" component="{AIWorkforce}" />
        <Route path="monitor" component="{WarRoom}" />
    </Router>
</main>
