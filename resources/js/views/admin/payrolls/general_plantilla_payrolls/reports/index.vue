<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New General Plantilla Payroll has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>General Plantilla  has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this General Plantilla?</v-card-text>
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
                            General Plantilla Payroll
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee General Plantilla Payroll
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
                <router-link :to="{ name: 'payrolls.general_plantilla_payrolls.reports.index' }">
                <v-btn class="" color="#0D47A1" style="margin-right: 2rem;">
                    Reports
                </v-btn>
                </router-link>

                <router-link :to="{ name: 'billings.hdmf_billings.create' }">
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
        :headers="hdmfBillingHeaders" 
        :items="hdmf_billings" 
        disable-pagination
        single-line
        hide-details
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.hdmf_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteHdmfBillings(item)" color="red-darken-4" size="small">
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
        hdmfBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        hdmf_billings: [],
        hdmfBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee ID', value: 'employee_id', sortable: true },
         { title: 'Employee Name', value: 'employee_name', sortable: true },

         { title: 'Basic Salary', value: 'dvdate', sortable: true },
         { title: 'PERA', value: 'scheme_desc', sortable: true },
         { title: 'Overtime', value: 'scheme_desc', sortable: true },
         
         { title: 'Step', value: 'loan_granted', sortable: true },
         { title: 'RC', value: 'monthly_amortization', sortable: true },
         { title: 'RC Code', value: 'start_term', sortable: true },
         { title: 'Deductions', value: 'end_term', sortable: true },
         { title: 'Basic Salary', value: 'remarks', sortable: true },
         
        
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
        this.getHdmfBillings();
      },
     methods: {
     deleteHdmfBillings(hdmf_billing) {
        this.hdmfBillingToDelete = hdmf_billing;
        this.showDeleteDialog = true;
    },
      confirmDelete() {
        if (this.hdmfBillingToDelete) {
          const hdmfBillingId = this.hdmfBillingToDelete.id; 
          axios.delete(`/api/hdmf_billings/destroy/${hdmfBillingId}`)
            .then(() => {
              this.hdmf_billings = this.hdmf_billings.filter(comp => comp.id !== hdmfBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Hdmf Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/hdmf_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/hdmf_billings');
      },
      getHdmfBillings() {
        this.loading = true;

        axios.get('/api/hdmf_billings')
            .then((response) => {
            console.log('Full API Response:', response);

            if (Array.isArray(response.data)) {
                this.hdmf_billings = response.data;
                console.log('Retrieved hdmf_billings:', this.hdmf_billings);
            } else {
                console.error('API response is not an array:', response.data);
                // Handle the case where the API response is not an array
            }
            })
            .catch((error) => {
            console.error('Error fetching hdmf_billings:', error);
            })
            .finally(() => {
            this.loading = false;
            console.log('Initial hdmf_billings:', this.hdmf_billings);
            });
        },

       editHdmfLoans(hdmf_billing) {
          // Implement edit logic here
          console.log('Editing Hdmf Loans:', hdmf_billing);
        },
    
     },
   
   };
   </script>