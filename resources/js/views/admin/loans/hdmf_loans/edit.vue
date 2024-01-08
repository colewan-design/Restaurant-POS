<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
   <v-container>
 
        <v-row>
            <v-sheet width="1200" class="mt-2 mx-auto p-2">
                <v-form @submit.prevent>
                    <v-text-field
                        variant="solo"
                        v-model="pag_ibig_id_rtn"
                        label="PAG-IBIG ID/RTN"
                        :rules="[
                            v => !!v || 'PAG-IBIG ID/RTN is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="application_agreement_number"
                        label="Application/Agreement Number"
                        :rules="[
                            v => !!v || 'Application/Agreement Number is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>
                    <v-autocomplete
                        variant="solo"
                        label="Employee"
                        v-model="selected_employee"
                        :items="fetched_employee_name"
                        item-text="employee_name"
                        item-value="employee_id"
                        search-input
                    ></v-autocomplete>


                    <v-text-field
                        variant="solo"
                        v-model="post_code"
                        label="Post Code"
                        :rules="[
                            v => !!v || 'Post Code is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>
                    <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="amount"
                        label="Amount"
                        :rules="[
                            v => !!v || 'Amount is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
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
                  <router-link to="/admin/hdmf_loans/">
                    <v-btn class="mt-2" color="red-darken-3">Cancel</v-btn>
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
        fetched_employee_name: '',
            selected_employee: null,
            employees: [],
            selected_loan_type: null,
            loan_type_data: [
            {
                id: 1,
                name: 'Home Loan'
            },
            {
                id: 2,
                name: 'Car Loan'
            },
            ],

            pag_ibig_id_rtn: '',
            application_agreement_number: '',
            employee_id: '',
            loan_type: '',
            post_code: '',
            amount: '',
            remarks: '',
            existingHdmfLoan: [],
      
    };
  },
  created() {
    this.fetchExistingHdmfLoans();
    this.getEmployees(); 
  },
 
  methods: {
    getEmployees() {
            axios.get('/api/employees_lib')
                .then((response) => {
                    this.employees = response.data;
                    this.fetched_employee_name = this.employees.map(employee => employee.employee_name);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async fetchExistingHdmfLoans() {
            try {
                const hdmf_loan_id = this.$route.params.id;
                const response = await axios.get(`/api/hdmf_loans/edit/${hdmf_loan_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const hdmf_loan = response.data;

                    this.existingHdmfLoan = hdmf_loan.pag_ibig_id_rtn;

                    // Populate the form fields with the fetched data
                    this.selected_employee = hdmf_loan.employee_name;
                    this.pag_ibig_id_rtn = hdmf_loan.pag_ibig_id_rtn;
                    this.application_agreement_number = hdmf_loan.application_agreement_number;
                    this.selected_loan_type = hdmf_loan.loan_type;  // Adjust if necessary
                    this.post_code = hdmf_loan.post_code;
                    this.amount = hdmf_loan.amount;
                    this.remarks = hdmf_loan.remarks;
                } else {
                    console.error('Failed to fetch existing hdmf_loans.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const hdmf_loan_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    pag_ibig_id_rtn: this.pag_ibig_id_rtn,
                    application_agreement_number: this.application_agreement_number,
                    selected_loan_type: this.selected_loan_type,
                    post_code: this.post_code,
                    remarks: this.remarks,
                    amount: this.amount
                };

                const response = await axios.post(`/api/hdmf_loans/update/${hdmf_loan_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/hdmf_loans', query: { showSuccessEditDialog: 'true' } });
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