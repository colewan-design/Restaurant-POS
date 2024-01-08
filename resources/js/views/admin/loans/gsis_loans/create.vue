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
                        @click="handleSubmit"
                        :disabled="isDuplicate || !bpno.trim()"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/gsis_loans/">
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

    computed: {
        isDuplicate() {
            return this.existingGsisLoan.includes(this.bpno.trim());
        },
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
                const response = await fetch('/api/gsis_loans');

                if (response.ok) {
                    const gsis_loans = await response.json();
                    this.existingGsisLoan = gsis_loans.map(gsis_loan => gsis_loan.bpno);
                } else {
                    console.error('Failed to fetch existing gsis_loans.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
            await this.fetchExistingGsisLoans();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        bpno: this.bpno,
                        employee_id: selectedEmployee.employee_id,
                        loan_type: this.selected_loan_type,
                        amount: this.amount,
                        remarks: this.remarks
                    };

                    const response = await fetch('/api/gsis_loans/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'loans.gsis_loans.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('gsis_loan is a duplicate.');
            }
        },

        clearFields() {
            bpno= '';
            gsis_loans_id= '';
            employee_id= '';
            loan_type= '';
            amount= '';
            remarks= '';
        },
    },

    
};
</script>
