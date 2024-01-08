<style>
.margin-padding-0{
    margin: 0;
    padding: 0;
}
</style>
<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
   <v-container>
 
        <v-row>
            <v-sheet width="1200" class="mt-2 mx-auto p-2">
                <v-form @submit.prevent>
                  
                   
                  <v-autocomplete
                      variant="solo"
                      label="Employee"
                      v-model="selected_employee"
                      :items="fetched_employee_names"
                      item-text="employee_name"
                      item-value="employee_id"
                      search-input
                  ></v-autocomplete>

                  <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="loan_term_in_months"
                        label="Loan Term (in months)"
                        :rules="[
                            v => !!v || 'Loan Term is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>


                  <v-text-field
                      prefix="₱"
                      variant="solo"
                      v-model="loan_granted"
                      label="Loan Granted"
                      :rules="[
                          v => !!v || 'Loan Granted is required',
                          v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                      ]"
                  ></v-text-field>
                  
                  <v-text-field
                      prefix="₱"
                      variant="solo"
                      v-model="principal_balance"
                      label="Principal Balance"
                      :rules="[
                          v => !!v || 'Principal Balance is required'
                      ]"
                  ></v-text-field>

                  <v-text-field
                      prefix="₱"
                      variant="solo"
                      v-model="interest_due"
                      label="Interest Due"
                      :rules="[
                          v => !!v || 'Interest Due is required'
                      ]"
                  ></v-text-field>

                  <v-text-field
                      prefix="₱"
                      variant="solo"
                      v-model="total_deductions"
                      label="Total Deductions"
                      :rules="[
                          v => !!v || 'Total Deductions is required'
                      ]"
                  ></v-text-field>

                  <v-text-field
                      prefix="₱"
                      variant="solo"
                      v-model="principal_due"
                      label="Principal Due"
                      :rules="[
                          v => !!v || 'Principal Due is required'
                      ]"
                  ></v-text-field>

                  <v-text-field
                      variant="solo"
                      label="Payroll Period"
                      v-model="payroll_period"
                      type="month"
                      @input="onMonthYearChange"
                  ></v-text-field>


                  <v-text-field
                      variant="solo"
                      v-model="bsu_remarks"
                      label="BSU Remarks"
                      :rules="[
                          v => !!v || 'BSU Remarks is required'
                      ]"
                  ></v-text-field>
                
                
                  <v-text-field
                      variant="solo"
                      v-model="remarks"
                      label="Remarks"
                      :rules="[
                          v => !!v || 'Remarks is required'
                      ]"
                  ></v-text-field>
                  
                  <v-autocomplete
                      variant="solo"
                      label="Loan Type"
                      v-model="selected_loan_type"
                      :items="loan_type_data.map(item => item.name)"
                      item-text="name"
                      item-value="id"
                      search-input
                  ></v-autocomplete>
                  <v-btn
                      type="submit"
                      class="mt-2 mr-2"
                      @click="handleUpdate"
                      color="teal"
                  >
                      Update
                  </v-btn>
                <router-link to="/admin/bsumpc_billings/">
                  <v-btn class="mt-2" color="red-darken-3" @click="clearFields">Cancel</v-btn>
                </router-link>
              </v-form>

            </v-sheet>
        </v-row>
   </v-container>
</template>

<script>
export default {
  data() {
    return { 
        selected_loan_type: '',
            loan_type_data: '',
            selected_employee: '', // Add this line
            fetched_employee_names: '', // Add this line
            employee_name: '',
            employee_id: '',
            loan_type: '',
            loan_granted: '',
            principal_balance: '',
            principal_due: '',
            interest_due: '',
            total_deductions: '',
            payroll_period: '',
            bsu_remarks: '',
            remarks: '',
            loan_term_in_months: '',
            employees: [],
            existingBsumpcBilling: [],
            loan_type_data: [
                {
                    id: 1,
                    name: 'Multipurpose Loan'
                },
                {
                    id: 2,
                    name: 'Home Loan'
                },
                {
                    id: 3,
                    name: 'Calamity Loan'
                },
              
            ],
    };
  },
  created() {
    this.fetchExistingBsumpcBillings();
    this.getEmployees(); 
  },
 
  methods: {
    onMonthYearChange(date) {
        const [year, month] = date.split('-');
        this.payroll_period = `${year}-${month}`;
        },
        getEmployees() {
            axios.get('/api/employees_lib/getList')
                .then((response) => {
                    this.employees = response.data;
                    this.fetched_employee_names = this.employees.map(employee => employee.employee_name);

                
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async fetchExistingBsumpcBillings() {
            try {
                const bsumpc_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/bsumpc_billings/edit/${bsumpc_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const bsumpc_billing = response.data;


                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.selected_loan_type = bsumpc_billing.loan_type;
                    this.loan_granted = bsumpc_billing.loan_granted;
                    this.principal_balance = response.data.principal_balance;
                    this.principal_due = response.data.principal_due;
                    this.interest_due = bsumpc_billing.interest_due;
                    this.total_deductions = bsumpc_billing.total_deductions;
                    this.payroll_period = bsumpc_billing.payroll_period;
                    this.bsu_remarks = bsumpc_billing.bsu_remarks;
                    this.loan_term_in_months = bsumpc_billing.loan_term_in_months;
                    this.remarks = bsumpc_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing bsumpc_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const bsumpc_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    loan_granted: this.loan_granted,
                    loan_type: this.selected_loan_type,
                    remarks: this.remarks,
                    principal_balance: this.principal_balance,
                    principal_due: this.principal_due,
                    interest_due: this.interest_due,
                    total_deductions: this.total_deductions,
                    payroll_period: this.payroll_period,
                    bsu_remarks: this.bsu_remarks,
                    loan_term_in_months: this.loan_term_in_months,
                };

                const response = await axios.post(`/api/bsumpc_billings/update/${bsumpc_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/bsumpc_billings', query: { showSuccessEditDialog: 'true' } });
                } else {
                    console.error('Failed to update data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
  },
};
</script>