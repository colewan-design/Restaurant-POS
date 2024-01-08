<template>
    <v-container>
        <v-row>
          <v-col cols="12">
            <v-window v-model="onboarding" show-arrows="hover">
              <v-window-item v-for="(item, index) in slide_items" :key="`card-${index}`">
                  <v-card elevation="2" height="200" class="d-flex align-center justify-center ma-2">
                  <h1 class="text-h2"> {{ item }}</h1>
                  </v-card>
              </v-window-item>
              </v-window>
          </v-col>
        </v-row>
        <v-row>
            <!-- video here -->
        </v-row>
    </v-container>

  </template>
  
  <script>
  export default {
    data: () => ({
      slide_items: [
      "Compensation Benefits and Other Obligations Office", "Benguet State University", "Admin Building"
      ],
      onboarding: 0,
    }),
    mounted() {
      // Auto-slide every 3 seconds (adjust the interval as needed)
      setInterval(this.autoSlide, 3000);
    },
    methods: {
      autoSlide() {
        // Increment onboarding index, and loop back to 0 when reaching the end
        this.onboarding = (this.onboarding + 1) % this.slide_items.length;
      },
    },
  };
  </script>
  