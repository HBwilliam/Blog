<template>
    <div class="blog-list">
      <template v-for="(blog, index) in blogs" :key="blog.id">
        <div class="item-container">
          <BlogItem class="item" :blog="blog" />
        </div>
        <hr v-if="index < blogs.length - 1" class="blog-divider">
      </template>
    </div>
  </template>
  
  <script>
  import BlogItem from '@/components/BlogItem.vue';
  export default {
    name: 'BlogList',
    components: {
      BlogItem
    },
    props: {
      blogs: Array
    }
  }
  </script>
  
  <style scoped>
  .blog-list {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
  }
  
  .item-container {
    position: relative;
    cursor: pointer;
    z-index: 1;
  }
  
  .item-container::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0px;
    right: 0px;
    bottom: -5px;
    background-color: var(--text-color);
    opacity: 0;
    pointer-events: none;
  }
  
  .item-container:hover::before {
    opacity: 0.1;
  }
  
  .blog-divider {
    top: 0;
    bottom: 0;
    width: 100%;
    border: 0;
    border-top: 1px solid #414141;
  }
  </style>