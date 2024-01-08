<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New China Bank Savings (CBS) Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>China Bank Savings (CBS) Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this China Bank Savings (CBS) Billing?</v-card-text>
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
                            China Bank Savings (CBS)Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee China Bank Savings (CBS)  Billings
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
                <router-link :to="{ name: 'billings.cbs_billings.create' }">
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
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filtercbsBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchBranch" label="Search By Branch" @input="filtercbsBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchAccountNumber" label="Search By Account Number" @input="filtercbsBillings" 
              variant="solo"
            
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchDateGranted" label="Search By Date Granted" @input="filtercbsBillings" 
              variant="solo"
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filtercbsBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="cbsBillingHeaders" 
        :items="cbs_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.cbs_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteCbsBillings(item)" color="red-darken-4" size="small">
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
        searchBranch: '',
        searchAccountNumber: '',
        searchDateGranted: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        cbsBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        cbs_billings: [],
        cbsBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Branch', value: 'branch', sortable: true },
         { title: 'Account Number', value: 'account_number', sortable: true },
         { title: 'Account Name', value: 'account_name', sortable: true },
         { title: 'Date Granted', value: 'date_granted', sortable: true },
         { title: 'Maturity Date', value: 'maturity_date', sortable: true },
         { title: 'First Pay Date', value: 'first_pay_date', sortable: true },
         { title: 'Terms', value: 'terms', sortable: true },
         { title: 'Loan Amount', value: 'loan_amount', sortable: true },
         { title: 'PMT', value: 'pmt', sortable: true },
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
        this.getCbsBillings();
      },
     methods: {
      filtercbsBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/cbs_billings?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
        
        if (this.searchBranch !== '') {
          apiUrl += `&searchBranch=${this.searchBranch}`;
        }

        if (this.searchAccountNumber !== '') {
          apiUrl += `&searchAccountNumber=${this.searchAccountNumber}`;
        }

        if (this.searchDateGranted !== '') {
          apiUrl += `&searchDateGranted=${this.searchDateGranted}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.cbs_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching cbs billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteCbsBillings(cbs_billing) {
          this.cbsBillingToDelete = cbs_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.cbsBillingToDelete) {
          const cbsBillingId = this.cbsBillingToDelete.id; 
          axios.delete(`/api/cbs_billings/destroy/${cbsBillingId}`)
            .then(() => {
              this.cbs_billings = this.cbs_billings.filter(comp => comp.id !== cbsBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Cbs Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/cbs_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/cbs_billings');
      },
      getCbsBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/cbs_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.cbs_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching cbs billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editCbsLoans(cbs_billing) {
          // Implement edit logic here
          console.log('Editing Cbs Loans:', cbs_billing);
        },
    
     },
   
   };
   </script>