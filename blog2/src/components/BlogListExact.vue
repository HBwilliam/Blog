<template>
  <div class="blog-list">
    <template v-for="yearGroup in sortedGroupedBlogs" :key="yearGroup.year">
      <h2 class="year-heading">{{ yearGroup.year }}</h2>
      <template v-for="(blog, index) in yearGroup.blogs" :key="blog.id">
        <div class="item-container">
          <BlogItemExact class="item" :blog="blog" />
        </div>
        <hr v-if="index < yearGroup.blogs.length - 1" class="blog-divider">
      </template>
    </template>
  </div>
</template>

<script>
import BlogItemExact from '@/components/BlogItemExact.vue';
export default {
  name: 'BlogListExact',
  components: {
    BlogItemExact
  },
  props: {
    blogs: Array
  },
  computed: {
    groupedBlogs() {
      return this.blogs.reduce((acc, blog) => {
        const year = new Date(blog.date).getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(blog);
        return acc;
      }, {});
    },
    sortedGroupedBlogs() {
      return Object.keys(this.groupedBlogs)
        .sort((a, b) => b - a)
        .map(year => ({
          year: year,
          blogs: this.groupedBlogs[year]
        }));
    }
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