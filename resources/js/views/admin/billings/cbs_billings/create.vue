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
                        @click="handleSubmit"
                        color="teal"
                    >
                        Submit
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
        this.getEmployees(); 
    },

    methods: {
        async getEmployees() {
            try {
                const response = await axios.get('/api/employees_lib/getList');
                this.employees = response.data;
                this.fetched_employee_names = this.employees.map(employee => employee.employee_name);
            } catch (error) {
                console.error(error);
            }
        },
      

        async handleSubmit() {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);

            if (!this.isDuplicate()) {
                try {
                    const formData = {
                        employee_id: selectedEmployee.employee_id,
                        branch: this.branch,
                        account_number: this.account_number,
                        account_name: this.account_name,
                        date_granted: this.date_granted,
                        maturity_date: this.maturity_date,
                        first_pay_date: this.first_pay_date,
                        terms: this.terms,
                        loan_amount: this.loan_amount,
                        pmt: this.pmt,
                        remarks: this.remarks,
                        cbs_id: this.cbs_id,
                    };

                    const response = await fetch('/api/cbs_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.cbs_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('cbs_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingCbsBilling.includes(this.cbs_id);
        },

        clearFields() {
            this.branch = '';
            this.account_number = '';
            this.account_name = '';
            this.date_granted = '';
            this.maturity_date = '';
            this.first_pay_date = '';
            this.terms = '';
            this.loan_amount = '';
            this.pmt = '';
            this.remarks = '';
            this.cbs_id = '';
        },
    },
};
</script>
