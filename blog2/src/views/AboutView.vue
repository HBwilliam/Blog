<template>
  <head>
    <title>About – William Habberjam</title>
    <meta name="description" content="About William Habberjam" />
  </head>
  <div class="about">
    <h1>About Me</h1>
    <MarkdownRenderer :markdownContent="markdownContent" />
  </div>
</template>

<script>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

export default {
  name: 'AboutView',
  components: {
    MarkdownRenderer
  },
  data() {
    return {
      markdownContent: ''
    };
  },
  methods: {
    async loadMarkdown() {
      try {
        const response = await fetch('/Me.md'); // Fetch directly from public folder
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.markdownContent = await response.text(); // Convert response to text
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    }
  },
  mounted() {
    this.loadMarkdown();
  }
};
</script>

<style scoped>
.about {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  text-align: left;
}
</style>
