<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New BSU Multiprupose Cooperative (MPC) Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>BSU Multiprupose Cooperative (MPC) Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this BSU Multiprupose Cooperative (MPC) Billing?</v-card-text>
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
                            BSU Multiprupose Cooperative (MPC) Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee BSU Multiprupose Cooperative (MPC)  Billings
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
                <router-link :to="{ name: 'billings.bsumpc_billings.create' }">
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
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterbsumpcBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchLoanGranted" label="Search By Loan Granted" @input="filterbsumpcBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchLoanTerm" label="Search By Loan Term" @input="filterbsumpcBillings" 
              variant="solo"
            
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchLoanType" label="Search By Loan Type" @input="filterbsumpcBillings" 
              variant="solo"
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterbsumpcBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="bsumpcBillingHeaders" 
        :items="bsumpc_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.bsumpc_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteBsumpcBillings(item)" color="red-darken-4" size="small">
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
        searchLoanGranted: '',
        searchLoanTerm: '',
        searchLoanType: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        bsumpcBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        bsumpc_billings: [],
        bsumpcBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Loan Granted', value: 'loan_granted', sortable: true },
         { title: 'Loan Term (in months)', value: 'loan_term_in_months', sortable: true },
         { title: 'Loan Type', value: 'loan_type', sortable: true },
         { title: 'Principal Balance', value: 'principal_balance', sortable: true },
         { title: 'Principal Due', value: 'principal_due', sortable: true },
         { title: 'Interest Due', value: 'interest_due', sortable: true },
         { title: 'Total Deductions', value: 'total_deductions', sortable: true },
         { title: 'Period', value: 'payroll_period', sortable: true },
         { title: 'BSU Remarks', value: 'bsu_remarks', sortable: true },
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
        this.getBsumpcBillings();
      },
     methods: {
      filterbsumpcBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/bsumpc_billings?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
        
        if (this.searchLoanGranted !== '') {
          apiUrl += `&searchLoanGranted=${this.searchLoanGranted}`;
        }

        if (this.searchLoanTerm !== '') {
          apiUrl += `&searchLoanTerm=${this.searchLoanTerm}`;
        }

        if (this.searchLoanType !== '') {
          apiUrl += `&searchLoanType=${this.searchLoanType}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.bsumpc_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching bsumpc billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteBsumpcBillings(bsumpc_billing) {
          this.bsumpcBillingToDelete = bsumpc_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.bsumpcBillingToDelete) {
          const bsumpcBillingId = this.bsumpcBillingToDelete.id; 
          axios.delete(`/api/bsumpc_billings/destroy/${bsumpcBillingId}`)
            .then(() => {
              this.bsumpc_billings = this.bsumpc_billings.filter(comp => comp.id !== bsumpcBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Bsumpc Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/bsumpc_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/bsumpc_billings');
      },
      getBsumpcBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/bsumpc_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.bsumpc_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching bsumpc billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editBsumpcLoans(bsumpc_billing) {
          // Implement edit logic here
          console.log('Editing Bsumpc Loans:', bsumpc_billing);
        },
    
     },
   
   };
   </script>