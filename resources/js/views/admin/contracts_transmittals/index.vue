<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Contracts Transmittals has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Contracts Transmittals has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Contracts Transmittals?</v-card-text>
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
                            Contracts Transmittals
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all Contracts Transmittals in CBOO
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
                <router-link :to="{ name: 'contracts_transmittals.create' }" v-if="can('contract-transmittal-billing-create')">
                <v-btn color="#0D47A1">
                    <v-icon>mdi-plus</v-icon>Add New
                </v-btn>
                </router-link>
            </v-col>
          </v-row>
      </v-container>
    <v-container>
      <v-row>
        <v-col cols="6">
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterContractsTransmittals" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterContractsTransmittals" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="contractsTransmittalHeaders" 
        :items="contracts_transmittals" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'contracts_transmittals.edit', params: { id: item.id} }" v-if="can('contract-transmittal-edit')">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteContractsTransmittals(item)" color="red-darken-4" size="small" v-if="can('contract-transmittal-delete')">
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
        searchRemarks: '',
        totalPages: 0, 
        currentPage: 1, 
        loading: false,
        showDeleteDialog: false,
        contractsTransmittalToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        contracts_transmittals: [],
        contractsTransmittalHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Subject', value: 'subject', sortable: true },
         { title: 'Purpose', value: 'purpose', sortable: true },
         { title: 'Sent By', value: 'sent_by', sortable: true },
         { title: 'Signed By', value: 'signed_by', sortable: true },
         { title: 'Received Date', value: 'received_date', sortable: true },
      

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
        this.getContractsTransmittals();
      },
     methods: {
      filterContractsTransmittals() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/contracts_transmittals?page=${this.currentPage}`;

        if (this.searchName !== '') {
          apiUrl += `&searchName=${this.searchName}`;
        }

        if (this.searchRemarks !== '') {
          apiUrl += `&searchRemarks=${this.searchRemarks}`;
        }

        // Make the API request
        axios
          .get(apiUrl)
          .then((response) => {
            if (response.data) {
              this.contracts_transmittals = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching contract-transmittal billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteContractsTransmittals(contracts_transmittal) {
          this.contractsTransmittalToDelete = contracts_transmittal;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.contractsTransmittalToDelete) {
          const contractsTransmittalId = this.contractsTransmittalToDelete.id; 
          axios.delete(`/api/contracts_transmittals/destroy/${contractsTransmittalId}`)
            .then(() => {
              this.contracts_transmittals = this.contracts_transmittals.filter(comp => comp.id !== contractsTransmittalId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting contract-transmittal Billing:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/contracts_transmittals');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/contracts_transmittals');
      },
      getContractsTransmittals() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/contracts_transmittals?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.contracts_transmittals = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching contract-transmittal billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
     },
   
   };
   </script>

<script setup>
  import {onMounted} from "vue";
import usePermissions from "@/composables/permissions";
import {useAbility} from '@casl/vue';


const {getPermissions} = usePermissions()
const {can} = useAbility()
onMounted(() => {
    getPermissions()
})


</script>