<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Coco Life Savings Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Coco Life Savings Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Coco Life Savings Billing?</v-card-text>
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
                            Coco Life Savings Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Coco Life Savings Billing
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
                <router-link :to="{ name: 'billings.coco_billings.create' }">
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
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filtercocoBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchPremiums" label="Search By Branch" @input="filtercocoBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchPremiumAppears" label="Search By Account Number" @input="filtercocoBillings" 
              variant="solo"
            
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchLoan" label="Search By Date Granted" @input="filtercocoBillings" 
              variant="solo"
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filtercocoBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="cocoBillingHeaders" 
        :items="coco_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.coco_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteCocoBillings(item)" color="red-darken-4" size="small">
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
        searchPremiums: '',
        searchPremiumAppears: '',
        searchLoan: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        cocoBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        coco_billings: [],
        cocoBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Premiums', value: 'premiums', sortable: true },
         { title: 'Premium Appears', value: 'premium_appears', sortable: true },
         { title: 'Loan', value: 'loan', sortable: true },
         { title: 'Penalty', value: 'penalty', sortable: true },
         { title: 'Totals', value: 'totals', sortable: true },
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
        this.getCocoBillings();
      },
     methods: {
      filtercocoBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/coco_billings?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
        
        if (this.searchPremiums !== '') {
          apiUrl += `&searchPremiums=${this.searchPremiums}`;
        }

        if (this.searchPremiumAppears !== '') {
          apiUrl += `&searchPremiumAppears=${this.searchPremiumAppears}`;
        }

        if (this.searchLoan !== '') {
          apiUrl += `&searchLoan=${this.searchLoan}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.coco_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching coco billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteCocoBillings(coco_billing) {
          this.cocoBillingToDelete = coco_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.cocoBillingToDelete) {
          const cocoBillingId = this.cocoBillingToDelete.id; 
          axios.delete(`/api/coco_billings/destroy/${cocoBillingId}`)
            .then(() => {
              this.coco_billings = this.coco_billings.filter(comp => comp.id !== cocoBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Coco Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/coco_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/coco_billings');
      },
      getCocoBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/coco_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.coco_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching coco billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editCocoLoans(coco_billing) {
          // Implement edit logic here
          console.log('Editing Coco Loans:', coco_billing);
        },
    
     },
   
   };
   </script>