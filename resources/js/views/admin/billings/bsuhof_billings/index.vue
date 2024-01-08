<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New BSU Housing Occupancy Fee (HOF) Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>BSU Housing Occupancy Fee (HOF) Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this BSU Housing Occupancy Fee (HOF) Billing?</v-card-text>
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
                            BSU Housing Occupancy Fee (HOF) Billings
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee BSU Housing Occupancy Fee (HOF) Billings
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
                <router-link :to="{ name: 'billings.bsuhof_billings.create' }">
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
          <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterbsuhofBillings" 
            variant="solo"
            prepend-icon="mdi-clipboard-text-search-outline"
            />
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="searchClassification" label="Search By Classification" @input="filterbsuhofBillings" 
            variant="solo"
            />
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="searchFloorArea" label="Search By Floor Area" @input="filterbsuhofBillings" 
            variant="solo"
          
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchLotArea" label="Search By Lot Area" @input="filterbsuhofBillings" 
            variant="solo"
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterbsuhofBillings" 
            variant="solo"
            />
        </v-col>
      </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="bsuhofBillingHeaders" 
        :items="bsuhof_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.bsuhof_billings.edit', params: { id: item.id} }">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteBsuhofBillings(item)" color="red-darken-4" size="small">
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
        searchClassification: '',
        searchFloorArea: '',
        searchLotArea: '',
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        bsuhofBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        bsuhof_billings: [],
        bsuhofBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Classification', value: 'classification', sortable: true },
         { title: 'Floor Area', value: 'floor_area', sortable: true },
         { title: 'Lot Area', value: 'lot_area', sortable: true },
         { title: 'Lot Rental', value: 'lot_rental', sortable: true },
         { title: 'House Rental', value: 'house_rental', sortable: true },
         { title: 'Monthly Occupancy Fee', value: 'monthly_occupancy_fee', sortable: true },
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
        this.getBsuhofBillings();
      },
     methods: {
      filterbsuhofBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/bsuhof_billings?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }
        
        if (this.searchClassification !== '') {
          apiUrl += `&searchClassification=${this.searchClassification}`;
        }

        if (this.searchFloorArea !== '') {
          apiUrl += `&searchFloorArea=${this.searchFloorArea}`;
        }

        if (this.searchLotArea !== '') {
          apiUrl += `&searchLotArea=${this.searchLotArea}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.bsuhof_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching bsuhof billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteBsuhofBillings(bsuhof_billing) {
          this.bsuhofBillingToDelete = bsuhof_billing;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.bsuhofBillingToDelete) {
          const bsuhofBillingId = this.bsuhofBillingToDelete.id; 
          axios.delete(`/api/bsuhof_billings/destroy/${bsuhofBillingId}`)
            .then(() => {
              this.bsuhof_billings = this.bsuhof_billings.filter(comp => comp.id !== bsuhofBillingId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting Bsuhof Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/bsuhof_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/bsuhof_billings');
      },
      getBsuhofBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/bsuhof_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.bsuhof_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching bsuhof billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editBsuhofLoans(bsuhof_billing) {
          // Implement edit logic here
          console.log('Editing Bsuhof Loans:', bsuhof_billing);
        },
    
     },
   
   };
   </script>