<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Phil Am Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Phil Am Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Phil Am Billing?</v-card-text>
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
                            Phil Am Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Phil Am Billing
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
                <router-link :to="{ name: 'billings.philam_billings.create' }" v-if="can('philam-billing-create')">
                <v-btn color="#0D47A1">
                    <v-icon>mdi-plus</v-icon>Add New
                </v-btn>
                </router-link>
            </v-col>
          </v-row>
      </v-container>
    <v-container>
      <v-row>
        <v-col cols="2">
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterPhilAmBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
  
          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterPhilAmBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-btn elevation="8" @click="generatePDFDV" variant="text" icon="mdi-file-pdf-box" color="red-accent-4"></v-btn>
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="philAmBillingHeaders" 
        :items="philam_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.philam_billings.edit', params: { id: item.id} }" v-if="can('philam-billing-edit')">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deletePhilamBillings(item, user.id)" color="red-darken-4" size="small" v-if="can('philam-billing-delete')">
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
        searchName: '',
        searchPresentMeterReading: '',
        searchEnergyUsed: '',
        searchAmountDue: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        philAmBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        philam_billings: [],
        philAmBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Employee ID', value: 'employee_id', sortable: true },
         { title: 'Monthly Premium Amount', value: 'monthly_premium', sortable: true },
         { title: 'Remarks', value: 'remarks', sortable: true },
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
        this.getPhilamBillings();
      },
     methods: {
      async generatePDFDV() {
        try {
            const response = await fetch('/api/pdf_generate_philam_billing_dv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('pdf generated successfully!');
            } else {
                console.error('Failed to generate pdf.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
      filterPhilAmBillings() {
        this.loading = true;
  
        // Prepare the API request URL with base parameters
        let apiUrl = `/api/philam_billings?page=${this.currentPage}`;
  
        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
    
  
        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }
  
        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.philam_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching philAm billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deletePhilamBillings(philAm_billing, userId) {
          this.philAmBillingToDelete = philAm_billing;
          this.admin_id = userId; 
          this.showDeleteDialog = true;
          // console.log(this.admin_id);
      },
  
      confirmDelete() {
        if (this.philAmBillingToDelete && this.admin_id) {  // Corrected from admin_id to this.admin_id
            const philAmBillingId = this.philAmBillingToDelete.id;
            const adminId = this.admin_id;
  
            axios.delete(`/api/philam_billings/destroy/${philAmBillingId}`, {
                params: { admin_id: adminId }
            })
            .then(() => {
                this.philam_billings = this.philam_billings.filter(comp => comp.id !== philAmBillingId);
                this.showDeleteDialog = false;
            })
            .catch((error) => {
                console.error('Error deleting Phil Am Billing:', error);
            });
        }
    },
  
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/philam_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/philam_billings');
      },
      getPhilamBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);
  
        axios.get(`/api/philam_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.philam_billings = response.data.data;
              this.totalPages = response.data.last_page;
  
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching philAm billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
  
     },
   
   };
  
  </script>