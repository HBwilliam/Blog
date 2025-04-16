<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="navbar-container">
    <div class="navbar">
      <nav>
        <div class="left">
          <router-link class="title" to="/">
            <h1>Willam.dev</h1>
          </router-link>
        </div>
        <div class="right">
          <router-link to="/posts">Posts</router-link>
          <router-link to="/about">About Me</router-link>
          <div class="icons">
            <svg
              v-if="themeStore.theme === 'dark'"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--text-color)"
              @click="themeStore.toggleTheme">
              <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="var(--text-color)"
              @click="themeStore.toggleTheme">
              <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
            </svg>
          </div>
        </div>
      </nav>
    </div>
    <div class="view">
      <router-view id="main-content" />
    </div>
  </div>
</template>

<script>
  import { useThemeStore } from "@/stores/theme.js";
  import { watchEffect } from "vue";
  export default {
    setup() {
      const themeStore = useThemeStore();
      themeStore.initializeTheme();
      watchEffect(() => {
        document.documentElement.setAttribute("data-theme", themeStore.theme);
      });
      return { themeStore };
    },
    data() {
      return {
        year: new Date().getFullYear()
      };
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  /* Define themes using CSS variables */
  :root[data-theme="light"] {
    --bg-color: #F0EAEE;
    --text-color: #1E151C;
    --hover-color: #563E4F;
    --highlight-color: linear-gradient(to right, #563E4F, #776055);
  }
  :root[data-theme="dark"] {
    --bg-color: #150F13;
    --text-color: #EAE1E8;
    --hover-color: #C1A9BA;
    --highlight-color: linear-gradient(to right, #C1A9BA, #AA9388);
  }
  /* Apply theme globally */
  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0s ease, color 0s ease;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .view {
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the contents while allowing them to have their own width */
  }

  .button {
    background: var(--bg-color);
    color: var(--text-color);
    border: 1px solid var(--text-color);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    border-radius: 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 0.9em;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover {
    color: var(--hover-color);
    border-color: var(--hover-color);
  }
  .navbar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: var(--bg-color);
  }
  .navbar {
    max-width: 1400px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(10px); /* Blur the content behind the navbar */
    height: 60px; /* Adjust height as needed */
    padding: 10px 0px;
    box-sizing: border-box; /* Ensure padding does not affect the width */
    border-bottom: 1px solid var(--text-color); /* Optional: adds a border below the navbar */
  }

  nav {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
  }
  nav h1 {
    font-size: 1.2em;
    margin: 5px;
  }
  nav .right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  nav .icons {
    display: flex;
    gap: 10px;
    margin-left: 10px;
  }
  nav a {
    color: var(--text-color);
    font-weight: bold;
    text-decoration: none;
  }
  nav a.router-link-exact-active {
    color: var(--text-color);
    text-decoration: underline;
  }
  nav a:hover {
    color: var(--hover-color);
  }
  .title.router-link-exact-active {
    text-decoration: none;
  }
  .title:hover {
    text-decoration: underline;
    color: var(--text-color);
  }
  hr {
    width: 100%;
  }
  .skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.3s ease;
}
.skip-link:focus {
  top: 0;
}
</style>