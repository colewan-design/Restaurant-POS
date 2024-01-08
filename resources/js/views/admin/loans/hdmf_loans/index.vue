<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New HDMF Loan has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>HDMF Loan has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this HDMF Loan?</v-card-text>
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
                            HDMF Loan
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee HDMF  Loans
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
                <router-link :to="{ name: 'loans.hdmf_loans.create' }">
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
        <v-data-table align="left" :headers="hdmfLoanHeaders" :items="hdmf_loans" disable-pagination
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'loans.hdmf_loans.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteHdmfLoans(item)" color="red-darken-4" size="small">
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
        loading: false,
        showDeleteDialog: false,
        hdmfLoanToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        hdmf_loans: [],
        hdmfLoanHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'PAG-IBIG ID/RTN', value: 'pag_ibig_id_rtn', sortable: true },
         { title: 'Application/Agreement Number', value: 'application_agreement_number', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Loan Type', value: 'loan_type', sortable: true },
         { title: 'Post Code', value: 'post_code', sortable: true },
         { title: 'Amount', value: 'amount', sortable: true },
         { title: 'Remarks', value: 'remarks', sortable: true },
         { title: 'Created At', value: 'created_at', sortable: true },
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
        this.getHdmfLoans();
      },
     methods: {
     deleteHdmfLoans(hdmf_loan) {
        this.hdmfLoanToDelete = hdmf_loan;
        this.showDeleteDialog = true;
    },
      confirmDelete() {
        if (this.hdmfLoanToDelete) {
          const hdmfLoanId = this.hdmfLoanToDelete.id; 
          axios.delete(`/api/hdmf_loans/destroy/${hdmfLoanId}`)
            .then(() => {
              this.hdmf_loans = this.hdmf_loans.filter(comp => comp.id !== hdmfLoanId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Hdmf  Loan:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/hdmf_loans');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/hdmf_loans');
      },
      getHdmfLoans() {
        this.loading = true;

        axios.get('/api/hdmf_loans')
            .then((response) => {
            console.log('Full API Response:', response);

            if (Array.isArray(response.data)) {
                this.hdmf_loans = response.data;
                console.log('Retrieved hdmf_loans:', this.hdmf_loans);
            } else {
                console.error('API response is not an array:', response.data);
                // Handle the case where the API response is not an array
            }
            })
            .catch((error) => {
            console.error('Error fetching hdmf_loans:', error);
            })
            .finally(() => {
            this.loading = false;
            console.log('Initial hdmf_loans:', this.hdmf_loans);
            });
        },

       editHdmfLoans(hdmf_loan) {
          // Implement edit logic here
          console.log('Editing Hdmf Loans:', hdmf_loan);
        },
    
     },
   
   };
   </script>