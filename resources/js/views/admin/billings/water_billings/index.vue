<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Water Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Water Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Water Billing?</v-card-text>
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
                            Water Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Water Billing
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
                <router-link :to="{ name: 'billings.water_billings.create' }" v-if="can('water-billing-create')">
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
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterwaterBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchArrearsTotalAmount" label="Search Total Amount in Arrears" @input="filterwaterBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchEnergyUsed" label="Search By Energy Used" @input="filterwaterBillings" 
              variant="solo"
            
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchDateBilled" label="Search By Date Billed" @input="filterwaterBillings" 
              variant="solo"
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterwaterBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="waterBillingHeaders" 
        :items="water_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.water_billings.edit', params: { id: item.id} }" v-if="can('water-billing-edit')">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteWaterBillings(item)" color="red-darken-4" size="small" v-if="can('water-billing-delete')">
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
        searchArrearsTotalAmount: '',
        searchEnergyUsed: '',
        searchDateBilled: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        waterBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        water_billings: [],
        waterBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Date Billed', value: 'date_billed', sortable: true },
         { title: 'Total Amount in Arrears', value: 'arrears_total_amount', sortable: true },
         { title: 'Energy Used', value: 'energy_used', sortable: true },
         { title: 'Unpaid Total Amount', value: 'unpaid_total_amount', sortable: true },

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
        this.getWaterBillings();
      },
     methods: {
      filterwaterBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/water_billings?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
        
        if (this.searchArrearsTotalAmount !== '') {
          apiUrl += `&searchArrearsTotalAmount=${this.searchArrearsTotalAmount}`;
        }

        if (this.searchEnergyUsed !== '') {
          apiUrl += `&searchEnergyUsed=${this.searchEnergyUsed}`;
        }

        if (this.searchDateBilled !== '') {
          apiUrl += `&searchDateBilled=${this.searchDateBilled}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.water_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching water billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteWaterBillings(water_billing) {
          this.waterBillingToDelete = water_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.waterBillingToDelete) {
          const waterBillingId = this.waterBillingToDelete.id; 
          axios.delete(`/api/water_billings/destroy/${waterBillingId}`)
            .then(() => {
              this.water_billings = this.water_billings.filter(comp => comp.id !== waterBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Water Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/water_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/water_billings');
      },
      getWaterBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/water_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.water_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching water billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editWaterLoans(water_billing) {
          // Implement edit logic here
          console.log('Editing Water Loans:', water_billing);
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