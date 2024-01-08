<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Position has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>Position has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Position?</v-card-text>
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
                            Position
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Positions
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
                <router-link :to="{ name: 'libraries.positions.create' }">
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
        <v-data-table align="left" :headers="positionHeaders" :items="positions" disable-pagination
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'libraries.positions.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deletePosition(item)" color="red-darken-4" size="small">
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
        positionToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        positions: [],
        positionHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Position', value: 'position_name', sortable: true },
         { title: 'Project', value: 'project_name', sortable: true },
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
        this.getPositions();
      },
     methods: {
     deletePosition(position) {
        this.positionToDelete = position;
        this.showDeleteDialog = true;
    },
      confirmDelete() {
        if (this.positionToDelete) {
          const positionId = this.positionToDelete.id; 
          axios.delete(`/api/positions/destroy/${positionId}`)
            .then(() => {
              this.positions = this.positions.filter(comp => comp.id !== positionId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting position:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/libraries/positions');
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/libraries/positions');
      },
      getPositions() {
        this.loading = true; 
        axios.get('/api/positions')
          .then((response) => {
            console.log('Full API Response:', response); // Log the entire API response
            if (response.data) {
              this.positions = response.data; // Assign the entire response to positions
              console.log('Retrieved positions:', this.positions); // Logging retrieved positions
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching positions:', error);
          })
          .finally(() => {
            this.loading = false; 
            console.log('Initial positions:', this.positions); // Moved logging to ensure it's executed after data retrieval
          });
      },
  
       editPosition(position) {
          // Implement edit logic here
          console.log('Editing positions:', position);
        },
    
     },
   
   };
   </script>