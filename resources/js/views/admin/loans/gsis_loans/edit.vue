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
                        v-model="bpno"
                        label="BPNO"
                        :rules="[
                            v => !!v || 'BPNO is required',
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
                  <router-link to="/admin/gsis_loans/">
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
                name: 'Conso Loan'
            },
            {
                id: 2,
                name: 'Emergency Loan'
            },
            {
                id: 3,
                name: 'Policy Loan'
            },
            {
                id: 4,
                name: 'Real Estate'
            },
            {
                id: 5,
                name: 'OULI'
            },
            {
                id: 6,
                name: 'GFALL II'
            },
            {
                id: 6,
                name: 'MPL'
            },
            {
                id: 7,
                name: 'CPL'
            },
            ],

            bpno: '',
            employee_id: '',
            loan_type: '',
            amount: '',
            remarks: '',
            existingGsisLoan: [],
      
    };
  },
  created() {
    this.fetchExistingGsisLoans();
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
        async fetchExistingGsisLoans() {
            try {
                const gsis_loan_id = this.$route.params.id;
                const response = await axios.get(`/api/gsis_loans/edit/${gsis_loan_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const gsis_loan = response.data;

                    this.existingGsisLoan = gsis_loan.pag_ibig_id_rtn;

                    // Populate the form fields with the fetched data
                    this.selected_employee = gsis_loan.employee_name;
                    this.bpno = gsis_loan.bpno;
                    this.selected_loan_type = gsis_loan.loan_type;  
                    this.amount = gsis_loan.amount;
                    this.remarks = gsis_loan.remarks;
                } else {
                    console.error('Failed to fetch existing gsis_loans.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const gsis_loan_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    bpno: this.bpno,
                    selected_loan_type: this.selected_loan_type,
                    remarks: this.remarks,
                    amount: this.amount
                };

                const response = await axios.post(`/api/gsis_loans/update/${gsis_loan_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/gsis_loans', query: { showSuccessEditDialog: 'true' } });
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