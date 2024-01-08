<template>
 
    <v-container class="mt-10">
      <!-- add -->
        <v-dialog v-model="showSuccessDialog">
            <v-card width="600" class="mx-auto" color="teal">
                <v-card-title>Success!</v-card-title>
                <v-card-text>New disallowance deduction has been inserted successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
      <!-- edit -->
        <v-dialog v-model="showSuccessEditDialog">
            <v-card width="600" class="mx-auto" color="indigo-darken-3">
                <v-card-title>Success!</v-card-title>
                <v-card-text>Disallowance Deduction has been updated successfully.</v-card-text>
                <v-card-actions>
                  <v-btn @click="closeEditDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- delete -->
        <v-dialog v-model="showDeleteDialog">
          <v-card width="600" class="mx-auto" color="red-darken-4">
            <v-card-title>Confirm Deletion</v-card-title>
            <v-card-text>Are you sure you want to delete this disallowance deduction?</v-card-text>
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
                  <v-container>
                    <v-row>
                      <v-col cols="3">
                        <v-card-item>
                            <v-card-title>
                                Disallowances
                            </v-card-title>
                            <v-card-subtitle>
                                This page lists down all BSU Employees' disallowances 
                            </v-card-subtitle>
                        </v-card-item>
                      </v-col>
                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Grand Total Disallowance</v-card-title>
                          <v-card-text>₱{{ disallowanceSum }}</v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Grand Total Payments</v-card-title>
                          <v-card-text>₱{{ paymentSum }}</v-card-text>
                        </v-card>
                      </v-col>

                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Grand Total Balance</v-card-title>
                          <v-card-text>₱{{ balanceSum }}</v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Grand Total Amount Due</v-card-title>
                          <v-card-text>₱{{ dueSum }}</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                   </v-container>
  
                  </v-card>
              </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="searchName" label="Search By Name"
                variant="solo"
                prepend-icon="mdi-clipboard-text-search-outline"
                />
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="searchPayPeriod" label="Search By Pay Period" 
                variant="solo"
              
                />
            </v-col>

            <v-col cols="2">
              <v-text-field v-model="searchPreprator" label="Search By Preparator" 
                variant="solo"
                />
            </v-col>
            <v-col cols="2">
              <v-btn @click="toggleFilteringMode" color="primary" size="x-large">
                <v-icon left>{{ useMultipleFilters ? 'mdi-filter' : 'mdi-filter-variant' }}</v-icon>
                {{ useMultipleFilters ? 'Individual Filter' : 'Multiple Filter' }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" align="end">
                <router-link :to="{ name: 'admin.obligations.disallowance.create' }">
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
        <v-data-table align="left" :headers="disallowanceHeaders" :items="filteredDisallowance" disable-pagination
        :loading="loading">

          <template v-slot:body="{ items }">
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.employee_name }}</td>
            <td>{{ formatCurrency(item.total_disallowances) }}</td>
            <td>{{ formatCurrency(item.total_payments) }}</td>
            <td>{{ formatCurrency(item.total_balance) }}</td>
            <td>{{ formatCurrency(item.amount_due) }}</td>
            <td>{{ item.payroll_period }}</td>
            <td>{{ item.remarks }}</td>
            <td>{{ item.prepared_by }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="d-flex align-center">
                <router-link :to="{ name: 'admin.obligations.disallowance.edit', params: { id: item.id} }">
                  <v-btn class="mr-3" color="amber" size="small">
                    <v-icon>mdi-pencil</v-icon>Edit
                  </v-btn>
                </router-link>
                <v-btn @click="deleteDisallowance(item)" color="red-darken-4" size="small">
                  <v-icon>mdi-delete</v-icon>Delete
                </v-btn>
              </div>
            </td>
          </tr> 
        </template>
        </v-data-table>
      </v-row>
  
    </v-container>
   
    </template>
   <script>
   export default {
     data() {
       return {
        useMultipleFilters: false,
        searchName: '',
        searchPayPeriod: '',
        searchPreprator: '',
        loading: false,
        showDeleteDialog: false,
        disallowanceToDelete: null,
        showSuccessDialog: false,
        showSuccessEditDialog: false,
        disallowance_deductions: [],
        disallowanceHeaders: [
         { title: 'Series', value: 'id', sortable: true },
         { title: 'Employee', value: 'employee_name', sortable: true },
         { title: 'Total Disallowance', value: 'total_disallowances', sortable: true },
         { title: 'Total Payments', value: 'total_payments', sortable: true },
         { title: 'Total Balance', value: 'total_balance', sortable: true },
         { title: 'Amount Due', value: 'amount_due', sortable: true },
         { title: 'Payroll Period', value: 'payroll_period', sortable: true },
         { title: 'Remarks', value: 'remarks', sortable: true },
         { title: 'Prepared By', value: 'prepared_by', sortable: true },
         { title: 'Created At', value: 'created_at', sortable: true },
         { title: 'Actions', value: 'actions'},
        ],
       };
     },
     computed: {
      filteredDisallowance() {
        if (this.useMultipleFilters) {
          return this.disallowance_deductions.filter(disallowance_deduction => {
            const employee_name = disallowance_deduction.employee_name && disallowance_deduction.employee_name.toString().toLowerCase();
            const pay_period = disallowance_deduction.payroll_period && disallowance_deduction.payroll_period.toString().toLowerCase();
            const preparator = disallowance_deduction.prepared_by && disallowance_deduction.prepared_by.toString().toLowerCase();

            return (
              (!this.searchName || employee_name.includes(this.searchName.toLowerCase())) &&
              (!this.searchPayPeriod || pay_period.includes(this.searchPayPeriod.toLowerCase())) &&
              (!this.searchPreprator || preparator.includes(this.searchPreprator.toLowerCase()))
            );
          });
        } else {
          return this.disallowance_deductions.filter(disallowance_deduction => {
            const employee_name = disallowance_deduction.employee_name && disallowance_deduction.employee_name.toString().toLowerCase();
            const pay_period = disallowance_deduction.payroll_period && disallowance_deduction.payroll_period.toString().toLowerCase();
            const preparator = disallowance_deduction.prepared_by && disallowance_deduction.prepared_by.toString().toLowerCase();

            return (
              (!this.searchName || employee_name.includes(this.searchName.toLowerCase())) &&
              (!this.searchPayPeriod || pay_period.includes(this.searchPayPeriod.toLowerCase())) &&
              (!this.searchPreprator || preparator.includes(this.searchPreprator.toLowerCase()))
            );
          });
        }
      },
      disallowanceSum() {
      return this.calculateSum('total_disallowances');
      },
      paymentSum() {
        return this.calculateSum('total_payments');
      },
      balanceSum() {
        return this.calculateSum('total_balance');
      },
      dueSum() {
        return this.calculateSum('amount_due');
      },
      formattedDisallowanceDeductions() {
        return this.disallowance_deductions.map((deduction) => {
          return {
            ...deduction,
            active: deduction.active === 1 ? true : false,
          };
        });
      },
    },
     methods: {
      toggleFilteringMode() {
      this.useMultipleFilters = !this.useMultipleFilters;
      this.searchName = '';
      this.searchPayPeriod = '';
      this.searchPreprator = '';
    },
      formatCurrency(amount) {
        // Assuming the amount is a number, you may need to adjust the logic based on your data structure.
        const formattedAmount = parseFloat(amount || 0).toFixed(2);
        return `₱ ${formattedAmount}`;
      },
        calculateSum(property) {
        return this.disallowance_deductions.reduce((sum, deduction) => {
          return sum + parseFloat(deduction[property] || 0);
        }, 0).toFixed(2);
      },
      deleteDisallowance(disallowance_deduction) {
          this.disallowanceToDelete = disallowance_deduction;
          this.showDeleteDialog = true;
      },
      confirmDelete() {
        if (this.disallowanceToDelete) {
          const disallowanceDeductionId = this.disallowanceToDelete.id; 
          axios.delete(`/api/disallowance_deductions/destroy/${disallowanceDeductionId}`)
            .then(() => {
              this.disallowance_deductions = this.disallowance_deductions.filter(mand => mand.id !== disallowanceDeductionId);
              this.showDeleteDialog = false;
            })
            .catch((error) => {
              console.error('Error deleting disallowance:', error);
            });
        }
      },
      closeDialog() {
          this.showSuccessDialog = false;
          this.$router.push('/admin/obligations/disallowance');
      },
      closeEditDialog() {
          this.showSuccessEditDialog = false;
          this.$router.push('/admin/obligations/disallowance');
      },
      getDisallowance() {
        this.loading = true; 
        axios.get('/api/disallowance_deductions')
          .then((response) => {
            console.log('Full API Response:', response); // Log the entire API response
            if (response.data) {
              this.disallowance_deductions = response.data; // Assign the entire response to disallowance Deduction
              console.log('Retrieved Disallowance Deductions:', this.disallowance_deductions); // Logging retrieved disallowance Deduction
            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching Disallowance Deduction:', error);
          })
          .finally(() => {
            this.loading = false;
            console.log('Initial Disallowance Deductions:', this.disallowance_deductions); // Moved logging to ensure it's executed after data retrieval
          });
      },
  
       editDisallowance(disallowance) {
          // Implement edit logic here
          console.log('Editing Disallowance Deduction:', disallowance);
        },
    
     },
     created() {
        const params = new URLSearchParams(this.$route.query);
        if (params.get('showSuccessDialog') === 'true') {
          this.showSuccessDialog = true;
        } else if (params.get('showSuccessEditDialog') === 'true') {
          this.showSuccessEditDialog = true;
        }
        this.getDisallowance();
      },
   };
   </script>