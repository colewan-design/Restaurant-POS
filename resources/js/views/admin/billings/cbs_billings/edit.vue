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
                        variant="solo"
                        v-model="branch"
                        label="Branch"
                        :rules="[
                            v => !!v || 'Branch is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>

                    <v-text-field
                        variant="solo"
                        v-model="account_number"
                        label="Account Number"
                        :rules="[
                            v => !!v || 'Account Number is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="account_name"
                        label="Account Name"
                        :rules="[
                            v => !!v || 'Account Name is required'
                           
                        ]"
                    ></v-text-field>
                    <v-row>
                        <v-col cols="4">
                                <v-text-field
                                    type="date"
                                    variant="solo"
                                    v-model="date_granted"
                                    label="Date Granted"
                                ></v-text-field>
                        </v-col>

                            
                        <v-col cols="4">
                                <v-text-field
                                    type="date"
                                    variant="solo"
                                    v-model="maturity_date"
                                    label="Maturity Date"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                                <v-text-field
                                    type="date"
                                    variant="solo"
                                    v-model="first_pay_date"
                                    label="First Pay Date"
                                ></v-text-field>
                        </v-col>
                    </v-row>


                    <v-text-field
                        variant="solo"
                        v-model="terms"
                        label="Terms"
                        :rules="[
                            v => !!v || 'Terms is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="loan_amount"
                        label="Loan Amount"
                        :rules="[
                            v => !!v || 'Loan Amount is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'
                        ]"
                    ></v-text-field>
                    
                    <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="pmt"
                        label="PMT"
                        :rules="[
                            v => !!v || 'PMT is required'
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
                 
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/cbs_billings/">
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
        selected_employee: '', 
        fetched_employee_names: [],
        employee_name: '',
        employee_id: '',
        branch: '',
        account_number: '',
        account_name: '',
        date_granted: '',
        maturity_date: '',
        first_pay_date: '',
        terms: '',
        loan_amount: '',
        pmt: '',
        remarks: '',
        employees: [],
        existingCbsBilling: [],
    };
  },
  created() {
    this.fetchExistingCbsBillings();
    this.getEmployees(); 
  },
 
  methods: {
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
        async fetchExistingCbsBillings() {
            try {
                const cbs_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/cbs_billings/edit/${cbs_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const cbs_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.branch = cbs_billing.branch;
                    this.account_number = cbs_billing.account_number;
                    this.account_name = response.data.account_name;
                    this.date_granted = response.data.date_granted;
                    this.maturity_date = cbs_billing.maturity_date;
                    this.first_pay_date = cbs_billing.first_pay_date;
                    this.terms = cbs_billing.terms;
                    this.loan_amount = cbs_billing.loan_amount;
                    this.pmt = cbs_billing.pmt;
                    this.remarks = cbs_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing cbs_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const cbs_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    branch: this.branch,
                    loan_type: this.selected_loan_type,
                    account_number: this.account_number,
                    account_name: this.account_name,
                    date_granted: this.date_granted,
                    maturity_date: this.maturity_date,
                    first_pay_date: this.first_pay_date,
                    terms: this.terms,
                    loan_amount: this.loan_amount,
                    pmt: this.pmt,
                    remarks: this.remarks,
                };

                const response = await axios.post(`/api/cbs_billings/update/${cbs_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/cbs_billings', query: { showSuccessEditDialog: 'true' } });
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