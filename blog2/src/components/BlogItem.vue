<template>
  <router-link
    :to="`/blog/${blog.short}`"
    class="blog-item-link"
    :aria-label="`Read blog post titled ${blog.title}`"
  >
    <article class="blog-item" role="article">
      <h2 class="blog-title">{{ blog.title }}</h2>
      <p class="blog-date">{{ formattedDate }}</p>
    </article>
  </router-link>
</template>

<script>
export default {
  name: 'BlogItem',
  props: {
    blog: Object
  },
  computed: {
    formattedDate() {
      if (!this.blog.date) return '';

      const date = new Date(this.blog.date);
      const options = { month: 'long', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  }
}
</script>

<style scoped>
.blog-item-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  padding: 5px;
  transition: background-color 0.2s ease;
}

.blog-item-link:hover,
.blog-item-link:focus {
  outline: none;
}

.blog-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.blog-date {
  margin: 0;
  color: #414141;
  font-size: 0.9rem;
}

@media (max-width: 900px) {
  .blog-item {
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .blog-date {
    margin-bottom: 0.5rem;
  }
}
</style>
