<template>
  <head>
    <title>Blog Posts – William Habberjam</title>
    <meta name="description" content="Blog posts by William Habberjam, sorted by date." />
  </head>
    <div class="posts-view">
      <div class="top">
        <h1>Posts</h1>
        <p>Here you can find all my blog posts sorted by year and date of release. Tags will be available in the next version of the site, so hang tight!</p>
        <!-- <router-link to="/tags" class="button">
                <button>
                    Tags
                </button>
        </router-link> -->
      </div>
      <BlogListExact :blogs="blogs" />
      <!-- Show a loading message if no blogs are loaded -->
      <p v-if="!blogs.length">Loading posts...</p>
    </div>
  </template>
  
  <script>
  import axios from '@/axios'; // Import globally configured axios instance
  import BlogListExact from '@/components/BlogListExact.vue';
  import { ref, onMounted } from 'vue'; // Import ref and onMounted
  
  export default {
    name: 'PostsView',
    components: {
      BlogListExact
    },
    setup() {
      const blogs = ref([]); // Define reactive blogs array
  
      // Function to fetch the blog data
      const fetchBlogs = async () => {
        try {
          const response = await axios.get('/posts/date'); // Fetch posts data from the API
          blogs.value = response.data.map(post => ({
            id: post.id,
            short: post.short_name,
            title: post.title,
            date: post.date
          }));
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
  
      // Fetch the blogs when the component is mounted
      onMounted(fetchBlogs);
  
      return {
        blogs // Expose blogs to the template
      };
    }
  };
  </script>
  
  <style scoped>
    .posts-view {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    text-align: left;
    }
    .recent h2 {
    font-size: 1.3em;
    margin: 0;
    margin-top: 5px;
    }

    h1 {
    font-size: 2em;
    margin: 0;
    margin-top: 30px;
    }

    h1 {
    margin-top: 30px;
    font-size: 2em;
    }
  </style>
  