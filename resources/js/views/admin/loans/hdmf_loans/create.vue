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
                        @click="handleSubmit"
                        :disabled="isDuplicate || !pag_ibig_id_rtn.trim()"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/hdmf_loans/">
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

    computed: {
        isDuplicate() {
            return this.existingHdmfLoan.includes(this.pag_ibig_id_rtn.trim());
        },
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
                const response = await fetch('/api/hdmf_loans');

                if (response.ok) {
                    const hdmf_loans = await response.json();
                    this.existingHdmfLoan = hdmf_loans.map(hdmf_loan => hdmf_loan.pag_ibig_id_rtn);
                } else {
                    console.error('Failed to fetch existing hdmf_loans.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
            await this.fetchExistingHdmfLoans();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        pag_ibig_id_rtn: this.pag_ibig_id_rtn,
                        application_agreement_number: this.application_agreement_number,
                        employee_id: selectedEmployee.employee_id,
                        loan_type: this.selected_loan_type,
                        post_code: this.post_code,
                        amount: this.amount,
                        remarks: this.remarks
                    };

                    const response = await fetch('/api/hdmf_loans/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'loans.hdmf_loans.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('hdmf_loan is a duplicate.');
            }
        },

        clearFields() {
            pag_ibig_id_rtn= '';
            incentives= '';
            application_agreement_number= '';
            employee_id= '';
            loan_type= '';
            post_code= '';
            amount= '';
            remarks= '';
        },
    },

    
};
</script>
