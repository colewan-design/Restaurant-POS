<template>
    <v-container class="mt-10">
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto my-4" elevation="16">
            <v-card-item>
              <v-card-title class="headline font-weight-bold">
                Employee Activity Logs
              </v-card-title>
              <v-card-subtitle>
                This page lists down all BSU Employee Activity Logs
              </v-card-subtitle>
            </v-card-item>
  
            <v-card-text>
              Welcome to the activity log page. Here, you can view the logs of all employee activities.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- <v-row>
        <v-col v-for="(log) in activity_logs" :key="log.id" cols="12">
          <v-row>
            <v-col cols="1" class="mt-6 ml-10">
                <v-icon>mdi-circle</v-icon>
            </v-col>
            
            <v-col cols="5">
              <v-card elevation="8" class="mb-4">
                <v-card-item>
                  <v-card-title>{{ log.employee_name }}</v-card-title>
                  <v-card-subtitle>{{ log.description }}</v-card-subtitle>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->
      <v-row>
        <v-timeline side="end">
            <v-timeline-item
            v-for="item in activity_logs"
            :key="item.id"
            :dot-color="item.color"
            size="small"
            >
            <v-alert
                :value="true"
                :color="item.color"
            >
          
            <span>Concerned Employee: {{ item.employee_name }}</span> <br>
            <span>Action Taken: {{ item.title }}</span>
             
            </v-alert>
            </v-timeline-item>
        </v-timeline>
      </v-row>
    </v-container>
  </template>
 
  
  <script setup>
  import { computed, ref } from "vue";
  import { onMounted } from "vue";
  import usePermissions from "@/composables/permissions";
  import { useAbility } from "@casl/vue";
  import { useStore } from "vuex";
  const store = useStore();
  const user = computed(() => store.state.auth.user);
  const { getPermissions } = usePermissions();
  const { can } = useAbility();
  onMounted(() => {
    getPermissions();
  });
  </script>
  
  <script>
  export default {
    data() {
      return {
        user: {},
        searchName: "",
        totalPages: 0,
        currentPage: 1,
        loading: false,
        activity_logs: [],
        icons: ['mdi-snowflake', 'mdi-leaf', 'mdi-fire', 'mdi-water'],
        activityLogHeaders: [
          { text: "Employee", value: "employee_name", sortable: true },
          { text: "Description", value: "description", sortable: true },
        ],
      };
    },
    created() {
      this.getActivityLogs();
    },
    methods: {
        season(val) {
        return this.icons[val]
      },
      filterActivityLogs() {
        this.loading = true;
  
        // Prepare the API request URL with base parameters
        let apiUrl = `/api/activity_logs?page=${this.currentPage}`;
  
        if (this.searchName !== "") {
          apiUrl += `&searchName=${this.searchName}`;
        }
  
        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.activity_logs = response.data;
              this.totalPages = response.last_page;
            } else {
              console.error("No data received from the API.");
            }
          })
          .catch((error) => {
            console.error("Error fetching activity logs:", error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
  
      getActivityLogs() {
        this.loading = true;
        console.log("Current Page:", this.currentPage);
  
        axios
          .get(`/api/activity_logs?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.activity_logs = response.data;
              this.totalPages = response.last_page;
            } else {
              console.error("No data received from the API.");
            }
          })
          .catch((error) => {
            console.error("Error fetching activity logs:", error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
  };
  </script>
  