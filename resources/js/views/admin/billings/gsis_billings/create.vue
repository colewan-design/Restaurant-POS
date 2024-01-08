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
                   <v-container class="margin-padding-0">
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                variant="solo"
                                v-model="agency_number"
                                label="Agency Number"
                                :rules="[
                                    v => !!v || 'Agency Number is required',
                                    v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                variant="solo"
                                v-model="agency_name"
                                label="Agency Name"
                                :rules="[
                                    v => !!v || 'Agency Name is required',
                                ]"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field
                                variant="solo"
                                v-model="office_assignment"
                                label="Office Assignment"
                                :rules="[
                                    v => !!v || 'Office Assignment is required'
                                ]"
                            ></v-text-field>
                        </v-col>

                    
                    </v-row>
                   </v-container>
                   
                 
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
                        v-model="gross_loan_amount"
                        label="Gross Loan Amount"
                        :rules="[
                            v => !!v || 'Gross Loan Amount is required'
                        ]"
                    ></v-text-field>

                  
                         <v-container class="margin-padding-0">
                            <v-row>
                                <v-col cols="3">
                                    <v-text-field
                                        variant="solo"
                                        type="date"
                                        label="Term Start Date"
                                        v-model="term_start"
                                        @input="calculateLoanTerm"
                                    ></v-text-field>
                                    </v-col>

                                    <v-col cols="3">
                                    <v-text-field
                                        variant="solo"
                                        type="date"
                                        label="Term End Date"
                                        v-model="term_end"
                                        @input="calculateLoanTerm"
                                    ></v-text-field>
                                    </v-col>
                                <v-col cols="3">
                                    <v-text-field
                                        variant="solo"
                                        label="First Due Month"
                                        v-model="first_due_month"
                                        type="month"
                                        @input="onMonthYearChange"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="3">
                                    <v-text-field
                                    variant="solo"
                                    type="date"
                                    label="Approval Date"
                                    v-model="approval_date"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                         </v-container>

                   
                    <v-text-field
                        variant="solo"
                        v-model="monthly_installment"
                        label="Monthly Installment"
                        :rules="[
                            v => !!v || 'Monthly Installment is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="loan_term_in_months"
                        label="Loan Term (in months)"
                        :rules="[
                            v => !!v || 'Loan Term is required'
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
                  <router-link to="/admin/gsis_billings/">
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
            showMonthPicker: false,
            showTermStartDatePicker: false,
            showTermEndDatePicker: false,
            // fetched_employee_name: '',
            fetched_employee_names: [],

            selected_employee: null,
            employees: [],
            selected_loan_type: null,
            months: [
            { 
                name: 'Jan', 
                value: 'January'
            },
            { 
                name: 'Feb', 
                value: 'February'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },  { 
                name: 'Jan', 
                value: 'January'
            },
            ],
            loan_type_data: [
                {
                    id: 1,
                    name: 'GSIS Conso Loan'
                },
                {
                    id: 2,
                    name: 'GSIS Emergency Loan'
                },
                {
                    id: 3,
                    name: 'GSIS Policy Loan'
                },
                {
                    id: 4,
                    name: 'GSIS Real Estate'
                },
                {
                    id: 5,
                    name: 'GSIS OULI'
                },
                {
                    id: 6,
                    name: 'GSIS GFAL II'
                },
                {
                    id: 7,
                    name: 'GSIS MPL'
                },
                {
                    id: 8,
                    name: 'GSIS CPL'
                }
            ],

            agency_number: 10000025102,
            agency_name: 'Benguet State University',
            employee_name: '',
            employee_id: '',
            loan_type: '',
            office_assignment: 'Benguet State University, La Trinidad Benguet',
    
            remarks: '',
            approval_date: '',
            gross_loan_amount: '',
            term_start: null,
            term_end: null,
            loan_term_in_months: '',
            first_due_month: '',
            monthly_installment: '',
            employees: [],
            existingGsisBilling: [],
          
        };
    },

    
    created() {
        
        this.getEmployees(); 
    },

    methods: {

        calculateLoanTerm() {
        if (this.term_start && this.term_end) {
            const start = new Date(this.term_start);
            const end = new Date(this.term_end);
            const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            this.loan_term_in_months = diffMonths;
        }
        },
        onMonthYearChange(date) {
        const [year, month] = date.split('-');
        this.first_due_month = `${year}-${month}`;
        },
        selectMonth(selectedMonth) {
            this.first_due_month = selectedMonth;
            this.toggleMonthPicker(); 
        },
        toggleMonthPicker() {
        this.showMonthPicker = !this.showMonthPicker;
        },
        toggleTermStartDatePicker() {
        this.showTermStartDatePicker = !this.showTermStartDatePicker;
        },
        toggleTermEndDatePicker() {
        this.showTermEndDatePicker = !this.showTermEndDatePicker;
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
       

        async handleSubmit() {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        agency_number: this.agency_number,
                        office_assignment: this.office_assignment,
                        employee_id: selectedEmployee.employee_id,
                        loan_type: this.selected_loan_type,
                    
                        approval_date: this.approval_date,
                        gross_loan_amount: this.gross_loan_amount,
                        term_start: this.term_start,
                        term_end: this.term_end,
                        loan_term_in_months: this.loan_term_in_months,
                        first_due_month: this.first_due_month,
                        monthly_installment: this.monthly_installment,
                        remarks: this.remarks
                    };

                    const response = await fetch('/api/gsis_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.gsis_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('gsis_billing is a duplicate.');
            }
        },

        clearFields() {
            term_start= null;
            term_end= null;
            loan_term_in_months= '';
            first_due_month= '';
            monthly_installment= '';       
            agency_number= '';
            office_assignment= '';
            employee_id= '';
            loan_type= '';
            approval_date= '';
            gross_loan_amount= '';
            remarks= '';
        },
    },

    
};
</script>
