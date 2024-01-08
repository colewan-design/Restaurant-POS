
<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Ucpb Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Ucpb Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Ucpb Billing?</v-card-text>
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
                            Ucpb Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Ucpb Billing
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
                <router-link :to="{ name: 'billings.ucpb_billings.create' }" v-if="can('ucpb-billing-create')">
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
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterucpbBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchPromissoryNumber" label="Search By Promissory Number" @input="filterucpbBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchTerm" label="Search By Term" @input="filterucpbBillings" 
              variant="solo"
            
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchPenalty" label="Search By Penalty" @input="filterucpbBillings" 
              variant="solo"
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterucpbBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="ucpbBillingHeaders" 
        :items="ucpb_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.ucpb_billings.edit', params: { id: item.id} }" v-if="can('ucpb-billing-edit')">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteUcpbBillings(item)" color="red-darken-4" size="small" v-if="can('ucpb-billing-delete')">
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
        searchPromissoryNumber: '',
        searchTerm: '',
        searchPenalty: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        ucpbBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        ucpb_billings: [],
        ucpbBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Promissory Number', value: 'promissory_number', sortable: true },
         { title: 'Term', value: 'term', sortable: true },
         { title: 'Date Granted', value: 'date_granted', sortable: true },
         { title: 'Date Maturity', value: 'date_maturity', sortable: true },
         { title: 'Loan Amount', value: 'loan_amount', sortable: true },

         { title: 'Monthly Amortization', value: 'monthly_amortization', sortable: true },
         { title: 'Penalty', value: 'penalty', sortable: true },
         { title: 'POI', value: 'poi', sortable: true },
         { title: 'Due Date', value: 'due_date', sortable: true },

         { title: 'Due Amount', value: 'due_amount', sortable: true },
         { title: 'Number of Unpaid Amortization', value: 'unpaid_amortization_number', sortable: true },
         { title: 'Last Payment Date', value: 'last_payment_date', sortable: true },
         { title: 'Outstanding Balance', value: 'outstanding_balance', sortable: true },

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
        this.getUcpbBillings();
      },
     methods: {
      filterucpbBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/ucpb_billings?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
        
        if (this.searchPromissoryNumber !== '') {
          apiUrl += `&searchPromissoryNumber=${this.searchPromissoryNumber}`;
        }

        if (this.searchTerm !== '') {
          apiUrl += `&searchTerm=${this.searchTerm}`;
        }

        if (this.searchPenalty !== '') {
          apiUrl += `&searchPenalty=${this.searchPenalty}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.ucpb_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching ucpb billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteUcpbBillings(ucpb_billing) {
          this.ucpbBillingToDelete = ucpb_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.ucpbBillingToDelete) {
          const ucpbBillingId = this.ucpbBillingToDelete.id; 
          axios.delete(`/api/ucpb_billings/destroy/${ucpbBillingId}`)
            .then(() => {
              this.ucpb_billings = this.ucpb_billings.filter(comp => comp.id !== ucpbBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Ucpb Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/ucpb_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/ucpb_billings');
      },
      getUcpbBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/ucpb_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.ucpb_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching ucpb billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editUcpbLoans(ucpb_billing) {
          // Implement edit logic here
          console.log('Editing Ucpb Loans:', ucpb_billing);
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