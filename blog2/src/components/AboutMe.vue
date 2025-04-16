<template>
    <main class="hero" role="main" aria-label="Introduction section">
      <h1 class="visually-hidden">Welcome to William Habberjam's blog</h1>
      <section aria-labelledby="greeting-heading">
        <h2 id="greeting-heading">Good <span class="time" :aria-label="time">{{ time }}!</span></h2>
      </section>
  
      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading">I'm William Habberjam</h2>
        <p>
          I'm a student software developer living in France. I have a love for all the domains of software development, but I'm particularly interested in low-level and systems programming.
        </p>
        <p>
          I started this blog in March 2025 to share my learning journey and meet like-minded people. I hope you enjoy your stay!
        </p>
      </section>
  
      <div class="button-bar">
        <router-link to="/about" class="button" aria-label="Learn more about William">
          About me
        </router-link>
      </div>
    </main>
  </template>
  
  <script>
  export default {
    name: 'AboutMe',
    computed: {
      time() {
        const hour = new Date().getHours();
        if (hour < 12) {
          return "Morning";
        } else if (hour < 18) {
          return "Afternoon";
        } else {
          return "Evening";
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .visually-hidden {
    position: absolute !important;
    height: 1px; width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  
  .button-bar {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .time {
    background: var(--highlight-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .hero {
    margin: 0 auto;
    text-align: left;
  }
  
  .hero h1,
  .hero h2 {
    margin: 0 0 10px;
  }
  
  .hero h1 {
    font-size: 2.5em;
  }
  
  .hero h2 {
    font-size: 1.5em;
  }
  
  .hero p {
    font-size: 1.1em;
  }
  </style>
  