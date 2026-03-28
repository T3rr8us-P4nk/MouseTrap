<style>
.navbar {
  height: 60px;
  background: #1a1a1d;
  border-bottom: 1px solid #2f3136;
  display: flex;
  justify-content: space-between; /* better layout */
  align-items: center;
  padding: 0 20px;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: 0.2s;
}

.nav-links a:hover {
  color: #00ff99;
  text-shadow: 0 0 8px #00ff99;
}

.status {
  color: #00ff99;
  text-shadow: 0 0 8px #00ff99;
  font-size: 20px;
}
</style>

<template>
  <nav class="navbar">
    <span class="status">MouseTrap</span>

    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
  </nav>
</template>