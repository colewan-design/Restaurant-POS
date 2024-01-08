<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Withholding Tax Billing has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New Withholding Tax Billing has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this Withholding Tax Billing?</v-card-text>
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
                            Withholding Tax Billing
                          </v-card-title>
                          <v-card-subtitle>
                              This page lists down all BSU Employee Withholding Tax Billing
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
                <router-link :to="{ name: 'billings.withholding_tax_billings.create' }" v-if="can('withholding-tax-billing-create')">
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
            <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterwithholding_taxBillings" 
              variant="solo"
              prepend-icon="mdi-clipboard-text-search-outline"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchPresentMeterReading" label="Search By Branch" @input="filterwithholding_taxBillings" 
              variant="solo"
              />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="searchEnergyUsed" label="Search By Account Number" @input="filterwithholding_taxBillings" 
              variant="solo"
            
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchAmountDue" label="Search By Date Granted" @input="filterwithholding_taxBillings" 
              variant="solo"
              />
          </v-col>

          <v-col cols="2">
            <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterwithholding_taxBillings" 
              variant="solo"
              />
          </v-col>
        </v-row>
      <v-row>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
        <v-data-table align="left" 
        :headers="withholding_taxBillingHeaders" 
        :items="withholding_tax_billings" 
        disable-pagination
        single-line
        :loading="loading">
          <template v-slot:item.actions="{ item }">
            <div class="d-flex align-center">
              <router-link :to="{ name: 'billings.withholding_tax_billings.edit', params: { id: item.id} }" v-if="can('withholding-tax-billing-edit')">
                <v-btn class="mr-3" color="amber" size="small">
                  <v-icon>mdi-pencil</v-icon>Edit
                </v-btn>
              </router-link>
              <v-btn @click="deleteWithholdingTaxBillings(item, user.id)" color="red-darken-4" size="small" v-if="can('withholding-tax-billing-delete')">
                <v-icon>mdi-delete</v-icon>Delete
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-row>
  
    </v-container>
   
    </template>
    
 

    <!-- <script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script> -->

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
        withholding_taxBillingToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        withholding_tax_billings: [],
        withholding_taxBillingHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Amount', value: 'amount', sortable: true },
         { title: 'Group', value: 'group', sortable: true },
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
        this.getWithholdingTaxBillings();
      },
     methods: {
      filterwithholding_taxBillings() {
        this.loading = true;

        // Prepare the API request URL with base parameters
        let apiUrl = `/api/withholding_tax_billings?page=${this.currentPage}`;

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
              this.withholding_tax_billings = response.data.data;
              this.totalPages = response.data.last_page;
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching withholding_tax billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      deleteWithholdingTaxBillings(withholding_tax_billing, userId) {
          this.withholding_taxBillingToDelete = withholding_tax_billing;
          this.admin_id = userId; 
          this.showDeleteDialog = true;
          // console.log(this.admin_id);
      },

      confirmDelete() {
        if (this.withholding_taxBillingToDelete && this.admin_id) {  // Corrected from admin_id to this.admin_id
            const withholding_taxBillingId = this.withholding_taxBillingToDelete.id;
            const adminId = this.admin_id;

            axios.delete(`/api/withholding_tax_billings/destroy/${withholding_taxBillingId}`, {
                params: { admin_id: adminId }
            })
            .then(() => {
                this.withholding_tax_billings = this.withholding_tax_billings.filter(comp => comp.id !== withholding_taxBillingId);
                this.showDeleteDialog = false;
            })
            .catch((error) => {
                console.error('Error deleting WithholdingTax Billing:', error);
            });
        }
    },

      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/withholding_tax_billings');
          
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/withholding_tax_billings');
      },
      getWithholdingTaxBillings() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/withholding_tax_billings?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.withholding_tax_billings = response.data.data;
              this.totalPages = response.data.last_page;

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching withholding_tax billings:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },

       editWithholdingTaxLoans(withholding_tax_billing) {
          // Implement edit logic here
          console.log('Editing WithholdingTax Loans:', withholding_tax_billing);
        },
    
     },
   
   };

  </script>