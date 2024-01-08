<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Compensation Benefit has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>Compensation Benefit has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Compensation Benefit?</v-card-text>
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
                            Compensations and Benefits
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Compensations and Benefits
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
                <router-link :to="{ name: 'admin.libraries.compensations.create' }">
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
        <v-data-table align="left" :headers="compensationHeaders" :items="compensations" disable-pagination
          :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'admin.libraries.compensations.edit', params: { id: item.id} }">
                <v-btn @click="compensations.edit(item)" class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteCompensation(item)" color="red-darken-4" size="small">
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
        compensationToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        compensations: [],
        compensationHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Compensation/Benefit', value: 'title', sortable: true },
         { title: 'Details', value: 'details', sortable: true },
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
        this.getCompensations();
      },
     methods: {
     deleteCompensation(compensation) {
        this.compensationToDelete = compensation;
        this.showDeleteDialog = true;
    },
      confirmDelete() {
        if (this.compensationToDelete) {
          const compensationId = this.compensationToDelete.id; 
          axios.delete(`/api/compensations/destroy/${compensationId}`)
            .then(() => {
              this.compensations = this.compensations.filter(comp => comp.id !== compensationId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting compensation benefit:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/admin/libraries/compensations');
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/admin/libraries/compensations');
      },
      getCompensations() {
        this.loading = true; 
        axios.get('/api/compensations')
          .then((response) => {
            console.log('Full API Response:', response); // Log the entire API response
            if (response.data) {
              this.compensations = response.data; // Assign the entire response to compensations
              console.log('Retrieved compensations:', this.compensations); // Logging retrieved compensations
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching compensations:', error);
          })
          .finally(() => {
            this.loading = false; 
            console.log('Initial compensations:', this.compensations); // Moved logging to ensure it's executed after data retrieval
          });
      },
  
       editCompensation(compensation) {
          // Implement edit logic here
          console.log('Editing compensations:', compensation);
        },
    
     },
   
   };
   </script>