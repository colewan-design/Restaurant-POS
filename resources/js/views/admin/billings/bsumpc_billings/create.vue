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
                        v-model="principal_due"
                        label="Principal Due"
                        :rules="[
                            v => !!v || 'Principal Due is required'
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
                        @click="handleSubmit"
                        color="teal"
                    >
                        Submit
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
            loan_term_in_months: '',
            selected_employee: '', // Add this line
            fetched_employee_names: [],
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
    watch: {
        principal_due: 'updateTotalDeductions',
        interest_due: 'updateTotalDeductions',
    },

    created() {
        this.fetchExistingBsumpcBillings();
        this.getEmployees(); 
    },

    methods: {
        updateTotalDeductions() {
            // Assuming principal_due and interest_due are numeric values
            this.total_deductions = parseFloat(this.principal_due || 0) + parseFloat(this.interest_due || 0);
        },
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
                const response = await fetch('/api/bsumpc_billings');

                if (response.ok) {
                    const bsumpc_billings = await response.json();
                    this.existingBsumpcBilling = bsumpc_billings.map(bsumpc_billing => bsumpc_billing.bp_number);
                } else {
                    console.error('Failed to fetch existing bsumpc billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
            await this.fetchExistingBsumpcBillings();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        loan_type: this.selected_loan_type,
                        loan_granted: this.loan_granted,
                        employee_id: selectedEmployee.employee_id,
                        principal_balance: this.principal_balance,
                        principal_due: this.principal_due,
                        interest_due: this.interest_due,
                        total_deductions: this.total_deductions,
                        payroll_period: this.payroll_period,
                        bsu_remarks: this.bsu_remarks,
                        loan_term_in_months: this.loan_term_in_months,
                        remarks: this.remarks
                     
                    };

                    const response = await fetch('/api/bsumpc_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.bsumpc_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('bsumpc_billing is a duplicate.');
            }
        },

        clearFields() {
            employee_name= '',
            employee_id= '',
            loan_type= '',
            loan_granted= '',
            principal_balance= '',
            principal_due= '',
            interest_due= '',
            total_deductions= '',
            payroll_period= '',
            bsu_remarks= '',
            loan_term_in_months= '',
            remarks= '';
        },
    },

    
};
</script>
