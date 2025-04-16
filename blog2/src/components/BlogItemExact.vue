<template>
  <router-link :to="`/blog/${blog.short}`" class="link">
    <div class="blog-item">
      <p class="blog-title">{{ blog.title }}</p>
      <p class="blog-date">{{ formattedDate }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'BlogItemExact',
  props: {
    blog: Object
  },
  computed: {
    formattedDate() {
      if (!this.blog.date) return '';
      
      // Create a Date object directly from the ISO string
      const date = new Date(this.blog.date);
      
      // Format specifically for month and day only
      return `${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}`;
    }
  }
}
</script>

<style scoped>
.blog-item {
  display: flex;
  justify-content: space-between;
  bottom: 0;
  top: 0;
  padding: 5px;
}
.blog-item p {
  margin: 0;
}
/* Media query for screens smaller than 900px */
@media (max-width: 900px) {
  .blog-item {
    flex-direction: column-reverse;
  }
  .blog-date {
    margin-bottom: 0.5rem;
  }
}
.blog-title {
  color: #6a64ff;
  color: var(--hover-color);
  font-size: 1rem;
  font-weight: bold;
}
.link {
  text-decoration: none;
}
.blog-date {
  color: #414141;
}
</style>