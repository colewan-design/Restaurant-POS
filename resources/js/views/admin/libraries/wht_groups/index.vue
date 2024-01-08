<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Group has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Group has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Group?</v-card-text>
            <v-card-actions>
              <v-btn @click="showDeleteDialog = false">Cancel</v-btn>
              <v-btn @click="confirmDelete" color="white">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
          <v-row>
              <v-col cols="12">
                  <v-card
                  class="mx-auto my-4"
                      elevation="16"
                  >
                      <v-card-item>
                          <v-card-title>
                            Group
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all Groups from Withholding Tax 
                          </v-card-subtitle>
                      </v-card-item>
  
                      <v-card-text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </v-card-text>
  
                  </v-card>
              </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" align="end">
                <router-link :to="{ name: 'libraries.wht_groups.create' }" >
                <v-btn color="#0D47A1">
                    <v-icon>mdi-plus</v-icon>Add New
                </v-btn>
                </router-link>
            </v-col>
          </v-row>
      </v-container>
    <v-container>
    
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="whtGroupHeaders" 
        :items="wht_groups" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'libraries.wht_groups.edit', params: { id: item.id} }" >
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteWhtGroups(item, user.id)" color="red-darken-4" size="small" >
                <v-icon>mdi-delete</v-icon>Delete
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-row>
  
    </v-container>
   
    </template>
    
 

    <!-- <script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script> -->

  <script setup>
    import { computed, ref } from "vue";
    import {onMounted} from "vue";
  import usePermissions from "@/composables/permissions";
  import {useAbility} from '@casl/vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const user = computed(() => store.state.auth.user);
  const {getPermissions} = usePermissions()
  const {can} = useAbility()
  onMounted(() => {
      getPermissions()
  })
  
  
  </script>

   <script>
   export default {
     data() {
       return {
        user: {},
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        whtGroupToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        wht_groups: [],
        whtGroupHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Title', value: 'title', sortable: true },
         { title: 'Actions', value: 'actions'},
        ],
       };
     },
     created() {
        const params = new URLSearchParams(this.$route.query);
        if (params.get('showSuccessDialog') === 'true') {
          this.showSuccessDialog = true;
        } else if (params.get('showSuccessEditDialog') === 'true') {
          this.showSuccessEditDialog = true;
        }
        this.getWhtGroups();
      },
     methods: {
      
      deleteWhtGroups(wht_group, userId) {
          this.whtGroupToDelete = wht_group;
          this.admin_id = userId; 
          this.showDeleteDialog = true;
          // console.log(this.admin_id);
      },

      confirmDelete() {
        if (this.whtGroupToDelete && this.admin_id) {  // Corrected from admin_id to this.admin_id
            const wht_group_id = this.whtGroupToDelete.id;
            const adminId = this.admin_id;

            axios.delete(`/api/withholding_tax_group/destroy/${wht_group_id}`, {
                params: { admin_id: adminId }
            })
            .then(() => {
                this.wht_groups = this.wht_groups.filter(comp => comp.id !== wht_group_id);
                this.showDeleteDialog = false;
            })
            .catch((error) => {
                console.error('Error deleting WithholdingTax Billing:', error);
            });
        }
    },

      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/wht_groups');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/wht_groups');
      },
      getWhtGroups() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/withholding_tax_group?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.wht_groups = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching withholding_tax billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editWithholdingTaxLoans(wht_group) {
          // Implement edit logic here
          console.log('Editing WithholdingTax Loans:', wht_group);
        },
    
     },
   
   };

  </script>