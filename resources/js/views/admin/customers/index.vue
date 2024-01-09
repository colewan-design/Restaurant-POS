<template>
 
  <v-container class="mt-10">
    <!-- add -->
      <v-dialog v-model="showSuccessDialog">
          <v-card width="600" class="mx-auto" color="teal">
              <v-card-title>Success!</v-card-title>
              <v-card-text>New Customer has been inserted successfully.</v-card-text>
              <v-card-actions>
                <v-btn @click="closeDialog">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    <!-- edit -->
      <v-dialog v-model="showSuccessEditDialog">
          <v-card width="600" class="mx-auto" color="indigo-darken-3">
              <v-card-title>Success!</v-card-title>
              <v-card-text>New Customer has been updated successfully.</v-card-text>
              <v-card-actions>
                <v-btn @click="closeEditDialog">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
      <!-- delete -->
      <v-dialog v-model="showDeleteDialog">
        <v-card width="600" class="mx-auto" color="red-darken-4">
          <v-card-title>Confirm Deletion</v-card-title>
          <v-card-text>Are you sure you want to delete this Customer?</v-card-text>
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
                          Customers
                        </v-card-title>
                        <v-card-subtitle>
                            This page lists down all Customers
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
              <router-link :to="{ name: 'customers.create' }">
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
          <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterlandCustomers" 
            variant="solo"
            prepend-icon="mdi-clipboard-text-search-outline"
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterlandCustomers" 
            variant="solo"
            />
        </v-col>
        <v-col cols="8" align="end">
          <v-btn elevation="8" @click="generateExcel" variant="text" icon="mdi-microsoft-excel" color="green-accent-4" class="mr-5"></v-btn>
          <v-btn elevation="8" @click="generatePDF" variant="text" icon="mdi-file-pdf-box" color="red-accent-4"></v-btn>
        </v-col>
      </v-row>
    <v-row>
      <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
      <v-data-table align="left" 
        :headers="customerHeaders" 
        :items="customers" 
        disable-pagination
        single-line
        :loading="loading"
    >
        <template v-slot:item.actions="{ item: customer }">
            <div class="d-flex align-center">
                <router-link :to="{ name: 'customers.edit', params: { id: customer.id } }">
                    <v-btn class="mr-3" color="amber" size="small">
                        <v-icon>mdi-pencil</v-icon>Edit
                    </v-btn>
                </router-link>
                <v-btn @click="deleteCustomer(customer, user.id)" color="red-darken-4" size="small">
                    <v-icon>mdi-delete</v-icon>Delete
                </v-btn>
            </div>
        </template>
    </v-data-table>

    </v-row>

  </v-container>
 
  </template>
  


<script setup>
  import { computed, ref } from "vue";
  import {onMounted} from "vue";
import usePermissions from "@/composables/permissions";
import {useAbility} from '@casl/vue';
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.state.auth.user);
const {getPermissions} = usePermissions()
const {can} = useAbility()
onMounted(() => {
    getPermissions()
})


</script>

 <script>
 export default {
   data() {
     return {
      user: {},
      searchName: '',
      searchPresentMeterReading: '',
      searchEnergyUsed: '',
      searchAmountDue: '',
      searchRemarks: '',
      totalPages: 0, 
      currentPage: 1, 
      loading: false,
      showDeleteDialog: false,
      customerToDelete: null,
      showSuccessDialog: false,
      showSuccessEditDialog: false,
      customers: [],
      customerHeaders: [
       { title: 'Series', value: 'id', sortable: true },
       { title: 'First Name', value: 'first_name', sortable: true },
       { title: 'Last Name', value: 'last_name', sortable: true },
       { title: 'Phone Number', value: 'phone_number', sortable: true },
       { title: 'Address', value: 'address', sortable: true },
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
      this.getCustomers();
    },
   methods: {
    async generateExcel() {
        try {
            const response = await fetch('/api/excel_generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Excel generated successfully!', result.file_path);
                // Now, you can handle the file_path as needed (e.g., download it)
            } else {
                console.error('Failed to generate excel.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async generatePDF() {
        try {
            const response = await fetch('/api/pdf_generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('pdf generated successfully!');
            } else {
                console.error('Failed to generate pdf.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
    filterlandCustomers() {
      this.loading = true;

      // Prepare the API request URL with base parameters
      let apiUrl = `/api/customers?page=${this.currentPage}`;

      if (this.searchName !== '') {
        apiUrl += `&searchName=${this.searchName}`;
      }
      
      if (this.searchPresentMeterReading !== '') {
        apiUrl += `&searchPresentMeterReading=${this.searchPresentMeterReading}`;
      }

      if (this.searchEnergyUsed !== '') {
        apiUrl += `&searchEnergyUsed=${this.searchEnergyUsed}`;
      }

      if (this.searchAmountDue !== '') {
        apiUrl += `&searchAmountDue=${this.searchAmountDue}`;
      }

      if (this.searchRemarks !== '') {
        apiUrl += `&searchRemarks=${this.searchRemarks}`;
      }

      // Make the API request
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data) {
            this.customers = response.data.data;
            this.totalPages = response.data.last_page;
          } else {
            console.error('No data received from the API.');
          }
        })
        .catch((error) => {
          console.error('Error fetching customers:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteCustomer(customer, userId) {
        this.customerToDelete = customer;
        this.admin_id = userId; 
        this.showDeleteDialog = true;
    },

    confirmDelete() {
      if (this.customerToDelete && this.admin_id) {  
          const customerId = this.customerToDelete.id;
          const adminId = this.admin_id;

          axios.delete(`/api/customer/destroy/${customerId}`, {
              params: { admin_id: adminId }
          })
          .then(() => {
              this.customers = this.customers.filter(comp => comp.id !== customerId);
              this.showDeleteDialog = false;
          })
          .catch((error) => {
              console.error('Error deleting customer:', error);
          });
      }
  },

    closeDialog() {
        this.showSuccessDialog = false;
        this.$router.push('/admin/customers');
        
    },
    closeEditDialog() {
        this.showSuccessEditDialog = false;
        this.$router.push('/admin/customers');
    },
    getCustomers() {
      this.loading = true;
      console.log('Current Page:', this.currentPage);

      axios.get(`/api/customer?page=${this.currentPage}`)
        .then((response) => {
          if (response.data) {
            this.customers = response.data.data;
            this.totalPages = response.data.last_page;

          } else {
            console.error('No data received from the API.');
          }
        })
        .catch((error) => {
          console.error('Error fetching customers:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

   },
 
 };

</script>