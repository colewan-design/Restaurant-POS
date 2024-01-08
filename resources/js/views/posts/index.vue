<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" v-for="post in posts?.data" :key="post.id">
          <v-card class="elevate">
            <img :src="getImageUrl(post)" alt="Post Image" class="post-image" />
            <div class="post-details">
              <div class="post-categories">
                <v-chip v-for="category in post.categories" :key="category.id">
                  {{ category.name }}
                </v-chip>
              </div>
              <h3 class="post-title">{{ post.title }}</h3>
              <div class="post-date">{{ new Date(post.created_at).toLocaleDateString() }}</div>
              <div class="post-content" v-html="post.content.substring(0, 100) + '...'"></div>
              <router-link
                :to="{ name: 'public-posts.details', params: { id: post.id } }"
                class="read-more"
                >Continue reading</router-link
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  const posts = ref([]);
  
  async function fetchPosts() {
    try {
      const response = await axios.get('/api/get-posts');
      posts.value = response.data;
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }
  
  function getImageUrl(post) {
    return post.resized_image.length > 0
      ? new URL(post.resized_image, import.meta.url).href
      : new URL(post.original_image, import.meta.url).href;
  }
  
  onMounted(fetchPosts);
  </script>
  
  <style scoped>
  .post-image {
    width: 100%;
    height: auto;
  }
  
  .post-details {
    padding: 1rem;
  }
  
  .post-categories {
    margin-bottom: 0.5rem;
  }
  
  .post-title {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  
  .post-date {
    color: #888;
    margin-bottom: 1rem;
  }
  
  .post-content {
    margin-bottom: 1rem;
  }
  
  .read-more {
    color: #007BFF;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }
  
  .elevate {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  