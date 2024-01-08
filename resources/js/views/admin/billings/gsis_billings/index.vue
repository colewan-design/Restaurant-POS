<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New GSIS Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>GSIS Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this GSIS Billing?</v-card-text>
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
                            GSIS Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee GSIS  Billings
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
                <router-link :to="{ name: 'billings.gsis_billings.create' }">
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
          <v-text-field v-model="searchBPNumber" label="Search By BP Number" @input="filterGsisBillings" 
            variant="solo"
            prepend-icon="mdi-clipboard-text-search-outline"
            />
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="searchApprovalDate" label="Search By Approval Date" @input="filterGsisBillings" 
            variant="solo"
            />
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="searchLoanType" label="Search By Loan Type" @input="filterGsisBillings" 
            variant="solo"
          
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchTermEnd" label="Search By Term End" @input="filterGsisBillings" 
            variant="solo"
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterGsisBillings" 
            variant="solo"
            />
        </v-col>
      </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <!-- <v-data-table align="left" 
        :headers="gsisBillingHeaders" 
        :items="gsis_billings" 
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.gsis_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteGsisBillings(item)" color="red-darken-4" size="small">
                <v-icon>mdi-delete</v-icon>Delete
              </v-btn>
            </div>
          </template>
        </v-data-table> -->


        <v-data-table-virtual
          fixed-header
            :headers="gsisBillingHeaders"
            :items="gsis_billings"
            height="600"
            :loading="loading"
          >
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.gsis_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteGsisBillings(item)" color="red-darken-4" size="small">
                <v-icon>mdi-delete</v-icon>Delete
              </v-btn>
            </div>
          </template>
        
        </v-data-table-virtual>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-tabs
          color="deep-purple-accent-4"
          align-tabs="center"
          center-active
          >
            <v-tab v-for="page in totalPages" :key="page" @click="changeTab(page)">{{ page }}</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
  
    </v-container>
   
    </template>
   <script>
   export default {
     data() {
       return {
        searchBPNumber: '',
        searchApprovalDate: '',
        searchLoanType: '',
        searchTermEnd: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        gsisBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        gsis_billings: [],
        gsisBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee ID', value: 'employee_id', sortable: true },
         { title: 'Employee Name', value: 'employee_name', sortable: true },
         { title: 'BP Number', value: 'bp_number', sortable: true },
         { title: 'Approval Date', value: 'approval_date', sortable: true },
         { title: 'Gross Loan Amount', value: 'gross_loan_amount', sortable: true },
         { title: 'Loan Type', value: 'loan_type', sortable: true },
         { title: 'Term Start', value: 'term_start', sortable: true },
         { title: 'Term End', value: 'term_end', sortable: true },
         { title: 'Loan Term (in months)', value: 'loan_term_in_months', sortable: true },
         { title: 'First Due Month', value: 'first_due_month', sortable: true },
         { title: 'Monthly Installment', value: 'monthly_installment', sortable: true },
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
        this.getGsisBillings();
      },
     methods: {
      filterGsisBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/gsis_billings?page=${this.currentPage}`;

        if (this.searchApprovalDate !== '') {
          apiUrl += `&searchApprovalDate=${this.searchApprovalDate}`;
        }
        
        if (this.searchBPNumber !== '') {
          apiUrl += `&searchBPNumber=${this.searchBPNumber}`;
        }

        if (this.searchLoanType !== '') {
          apiUrl += `&searchLoanType=${this.searchLoanType}`;
        }

        if (this.searchTermEnd !== '') {
          apiUrl += `&searchTermEnd=${this.searchTermEnd}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.gsis_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching gsis billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      changeTab(page) {
        this.currentPage = page;
        this.getGsisBillings();
      },
      getGsisBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/gsis_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.gsis_billings = response.data.data;
              this.totalPages = response.data.last_page;
              // this.totalEmployeeCount = response.data.total;
              // this.totalCount = response.data.total;
              // console.log(this.totalCount);

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching gsis billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteGsisBillings(gsis_billing) {
          this.gsisBillingToDelete = gsis_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.gsisBillingToDelete) {
          const gsisBillingId = this.gsisBillingToDelete.id; 
          axios.delete(`/api/gsis_billings/destroy/${gsisBillingId}`)
            .then(() => {
              this.gsis_billings = this.gsis_billings.filter(comp => comp.id !== gsisBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Gsis Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/gsis_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/gsis_billings');
      },
       editGsisLoans(gsis_billing) {
          // Implement edit logic here
          console.log('Editing Gsis Loans:', gsis_billing);
        },
    
     },
   
   };
   </script>