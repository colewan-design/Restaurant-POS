<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Lwop Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Lwop Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Lwop Billing?</v-card-text>
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
                            Lwop Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Lwop Billing
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
                <router-link :to="{ name: 'billings.lwop_billings.create' }" v-if="can('lwop-billing-create')">
                <v-btn color="#0D47A1">
                    <v-icon>mdi-plus</v-icon>Add New
                </v-btn>
                </router-link>
            </v-col>
          </v-row>
      </v-container>
    <v-container>
      <v-row>
        <v-col cols="6">
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterlwopBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterlwopBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="lwopBillingHeaders" 
        :items="lwop_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.lwop_billings.edit', params: { id: item.id} }" v-if="can('lwop-billing-edit')">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteLwopBillings(item)" color="red-darken-4" size="small" v-if="can('lwop-billing-delete')">
                <v-icon>mdi-delete</v-icon>Delete
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-row>
  
    </v-container>
   
    </template>
   <script>
   export default {
     data() {
       return {
        searchName: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        lwopBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        lwop_billings: [],
        lwopBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Dates', value: 'dates_incurred', sortable: true },
         { title: 'Number of Days', value: 'days_number', sortable: true },

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
        this.getLwopBillings();
      },
     methods: {
      filterlwopBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/lwop_billings?page=${this.currentPage}`;

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
              this.lwop_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching lwop billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteLwopBillings(lwop_billing) {
          this.lwopBillingToDelete = lwop_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.lwopBillingToDelete) {
          const lwopBillingId = this.lwopBillingToDelete.id; 
          axios.delete(`/api/lwop_billings/destroy/${lwopBillingId}`)
            .then(() => {
              this.lwop_billings = this.lwop_billings.filter(comp => comp.id !== lwopBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Lwop Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/lwop_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/lwop_billings');
      },
      getLwopBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/lwop_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.lwop_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching lwop billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editLwopLoans(lwop_billing) {
          // Implement edit logic here
          console.log('Editing Lwop Loans:', lwop_billing);
        },
    
     },
   
   };
   </script>

<script setup>
  import {onMounted} from "vue";
import usePermissions from "@/composables/permissions";
import {useAbility} from '@casl/vue';


const {getPermissions} = usePermissions()
const {can} = useAbility()
onMounted(() => {
    getPermissions()
})


</script>