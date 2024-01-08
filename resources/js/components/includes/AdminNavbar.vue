<template>
    <v-app-bar app color="primary" fixed>
      <v-toolbar-title>Baguio POS</v-toolbar-title>
      <v-spacer></v-spacer>
<!-- 
        <v-btn @click="handleUpdateTheme('light')">
          <v-icon>{{ theme === 'light' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
        </v-btn>
        <v-btn>    
            <router-link to="/admin/system_themeuration"><v-icon color="white" size="20">mdi-cog</v-icon></router-link>
        </v-btn>
        <v-btn>    
            <router-link to="/"><v-icon color="white" size="22">mdi-home</v-icon></router-link>
        </v-btn>
      <v-btn><v-icon color="white" size="20">mdi-information</v-icon></v-btn>

      <v-btn class="text-none" stacked id="notification-activator" @click.stop="activateNotificationMenu">
        <v-badge :content="totalCount" color="success">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn> -->

      <v-menu activator="#notification-activator">
        <v-card class="mx-auto" max-width="600">
          <v-list lines="two">
            <v-list-subheader>Today</v-list-subheader>
            <div v-for="log in activity_logs" :key="log.id">
              <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                <template v-slot:title>{{ log.title }} for {{ log.employee_name }}</template>
                <template v-slot:subtitle>
                  <span class="font-weight-bold">{{ log.created_at }}</span>
                </template>
              </v-list-item>
              <v-divider inset></v-divider>
            </div>
       

          </v-list>
        </v-card>

      </v-menu>
      <!-- <v-btn text>Contact</v-btn> -->
      <v-btn id="menu-activator" color="white">Hi, {{ user.name }}</v-btn>
  
      <v-menu activator="#menu-activator">
        <v-card class="mx-auto" max-width="425">
          <v-list v-model="selectedItem">
            <div
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              >
              <router-link :to="item.route" >
                <v-list-item>
                  <template v-slot:title>{{ item.title }}</template>
                </v-list-item>
              </router-link>
            </div>
          <v-list-item>
            <v-list-item-title @click="logout" style="cursor: pointer;">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </template>
  
  
  <script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);
  const { processing, logout } = useAuth();
  
  const items = [
    { title: "Profile", route: "/admin/profile" },
    { title: "Settings", route: "/settings" },
  ];
  
  const selectedItem = ref(null);

  </script>

<script>
  export default {
    data() {
      return {
        isDark: true,
        drawer: false,
        isDay: true,
        theme:'',
        activity_logs: [],
        totalCount: 0,
      };
    },
    created() {
      this.getActivityLogs();
      this.countUnread();
      // Call getActivityLogs every 5 seconds
      // this.intervalId = setInterval(this.getActivityLogs, 5000);
    },
    beforeDestroy() {
      // Clear the interval when the component is destroyed
      clearInterval(this.intervalId);
    },
    methods: {
      async fetchCurrentTheme() {
          try {
              const response = await axios.get(`/api/system_theme/edit/1`);

              if (response.status === 200) {
                  const system_theme = response.data;
                  this.theme = system_theme.theme;
                  
                  console.log(this.electric_billing_vat);

              } else {
                  console.error('Failed to fetch existing theme.');
              }
          } catch (error) {
              console.error('Error:', error);
          }
      },
      async handleUpdateTheme() {
      // Toggle between light and dark themes
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      try {
        const formData = {
          theme: this.theme,
          electric_billing_vat : this.electric_billing_vat
        };

        const response = await axios.post(`/api/system_theme/update/1`, formData);

        if (response.status === 200) {
          console.log('Theme updated successfully!');
        } else {
          console.error('Failed to update data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
     
      deactivateNotifications() {
        axios.put('/api/activity_logs/deactivateNotifications')
          .then(() => {
            // After updating, refresh the activity logs and count
            this.getActivityLogs();
            this.countUnread();
          })
          .catch((error) => {
            console.error(error);
          });
      },
      getActivityLogs() {
        axios.get('/api/activity_logs')
          .then((response) => {
            this.activity_logs = response.data;
            this.totalCount = response.data.count;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      countUnread() {
        axios.get('/api/activity_logs/countUnread')
          .then((response) => {
            this.totalCount = response.data.unread_count;
            console.log('Count of activity logs:', this.totalCount);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      activateNotificationMenu() {
        this.notificationMenu = !this.notificationMenu;
        if (this.notificationMenu) {
          this.deactivateNotifications();
        }
      },
    },
  };
</script>
