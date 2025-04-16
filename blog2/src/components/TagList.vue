<template>
    <div class="tag-list">
      <template v-if="Object.keys(sortedGroupedTags).length">
        <template v-for="(tags, letter) in sortedGroupedTags" :key="letter">
          <h2 class="letter-heading">{{ letter }}</h2>
          <ul class="tag-group">
            <li v-for="tag in tags" :key="tag" class="tag-item">
              <button>
                {{ tag }}
              </button>
            </li>
          </ul>
        </template>
      </template>
      <p v-else class="loading">Loading tags...</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "TagListGrouped",
    data() {
      return {
        tags: [], // Will store only tag names
      };
    },
    computed: {
      groupedTags() {
        return this.tags.reduce((acc, tag) => {
          const letter = tag.charAt(0).toUpperCase(); // Get first letter, uppercase
          if (!acc[letter]) {
            acc[letter] = [];
          }
          acc[letter].push(tag);
          return acc;
        }, {});
      },
      sortedGroupedTags() {
        return Object.keys(this.groupedTags)
          .sort()
          .reduce((acc, letter) => {
            acc[letter] = this.groupedTags[letter].sort(); // Sort tags in each group
            return acc;
          }, {});
      }
    },
    mounted() {
      this.fetchTags();
    },
    methods: {
      async fetchTags() {
        try {
          const response = await axios.get("/tags");
          this.tags = response.data.map(tag => tag.name); // Extract names only
        } catch (error) {
          console.error("Error fetching tags:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tag-list {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  
  .letter-heading {
    font-size: 1.5rem;
    color: #333;
  }
  
  .tag-group {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
  }
  
  .tag-item {
    padding: 5px 10px;
    font-size: 1.2rem;
    color: #555;
  }
  
  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
  }
    button {
        background: none;
        box-shadow: none;
        border: none;
        color: inherit;
        padding: 0;
        text-decoration: none;
    }
  </style>
  