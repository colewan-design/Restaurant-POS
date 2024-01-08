<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Salary Matrix record has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>Salary Matrix record has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Salary Matrix record?</v-card-text>
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
                            Salary Matrix 
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Salary Matrix record
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
                <router-link :to="{ name: 'salary_matrix.create' }">
                <v-btn color="#0D47A1">
                    <v-icon>mdi-plus</v-icon>Add New
                </v-btn>
                </router-link>
            </v-col>
          </v-row>
      </v-container>
    <v-container>
      <v-row>
        <v-data-table align="left" :headers="salary_matrixHeaders" :items="salary_matrix_data" disable-pagination>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'salary_matrix.edit', params: { id: item.id} }">
                <v-btn @click="salary_matrix.edit(item)" class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteSalaryMatrix(item)" color="red-darken-4" size="small">
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
        showDeleteDialog: false,
        salaryMatrixToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        salary_matrix_data: [],
         salary_matrixHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Salary Grade', value: 'salary_grade', sortable: true },
         { title: 'Salary Step', value: 'salary_step', sortable: true },
         { title: 'Salary Amount', value: 'salary_amount', sortable: true },
         { title: 'Created At', value: 'created_at', sortable: true },
         { title: 'Actions', value: 'actions'},
        ],
       };
     },
     methods: {
     deleteSalaryMatrix(salary_matrix) {
        this.salaryMatrixToDelete = salary_matrix;
        this.showDeleteDialog = true;
    },
      confirmDelete() {
        if (this.salaryMatrixToDelete) {
          const salaryMatrixId = this.salaryMatrixToDelete.id; 
          axios.delete(`/api/salary_matrix/destroy/${salaryMatrixId}`)
            .then(() => {
              // Remove the deleted salary matrix from the local list (this is for UI update only)
              this.salary_matrix_data = this.salary_matrix_data.filter(salma => salma.id !== salaryMatrixId);
              // Close the delete confirmation dialog
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting salary matrix:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/salary_matrix');
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/salary_matrix');
      },
      getSalaryMatrixData() {
        axios.get('/api/salary_matrix')
          .then((response) => {
            console.log('Full API Response:', response); // Log the entire API response
            if (response.data) {
              this.salary_matrix_data = response.data; // Assign the entire response to salary_matrix_data
              console.log('Retrieved salary_matrix_data:', this.salary_matrix_data); // Logging retrieved salary_matrix_data
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching salary_matrix_data:', error);
          })
          .finally(() => {
            console.log('Initial salary_matrix_data:', this.salary_matrix_data); // Moved logging to ensure it's executed after data retrieval
          });
      },
  
       editSalaryMatrix(salary_matrix) {
          // Implement edit logic here
          console.log('Editing Salary Matrix record:', salary_matrix);
        },
    
     },
     created() {
        const params = new URLSearchParams(this.$route.query);
        if (params.get('showSuccessDialog') === 'true') {
          this.showSuccessDialog = true;
        } else if (params.get('showSuccessEditDialog') === 'true') {
          this.showSuccessEditDialog = true;
        }
        this.getSalaryMatrixData();
      },
   };
   </script>