<template>
  <div class="blog">
    <MarkdownRenderer :markdownContent="post.markdown_content" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import axios from 'axios'; // Import axios directly if you're not using a global instance

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
      // Adjust the URL if you're not using a base URL with axios
      const response = await axios.get(`/posts/shortname/${shortName}`);
      this.post = response.data; // Assign the fetched data to the post object
    } catch (error) {
      console.error('Error fetching blog post:', error);
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
  
