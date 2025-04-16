<template>
    <div class="blog">
      <MarkdownRenderer :markdownContent="post.markdown_content" />
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
  
  export default {
    name: 'BlogView',
    components: {
      MarkdownRenderer,
    },
    data() {
      return {
        post: {
          title: '',
          markdown_content: '',
          tags: [],
        },
      };
    },
    async created() {
      const route = useRoute();
      const shortName = route.params.short_name; // Extract short_name from the URL
  
      try {
        const response = await fetch(`http://localhost:3000/posts/shortname/${shortName}`);
        if (response.ok) {
          const post = await response.json();
          this.post = post; // Assign the fetched post data
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  .blog {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 40px;
    text-align: left;
  }
  </style>
  