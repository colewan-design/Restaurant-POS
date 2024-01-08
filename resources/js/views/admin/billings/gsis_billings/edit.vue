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
                                
                            >
                        </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                variant="solo"
                                v-model="agency_name"
                                label="Agency Name"
                                
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                variant="solo"
                                v-model="office_assignment"
                                label="Office Assignment"
                                
                            ></v-text-field>
                        </v-col>
                    </v-row>
                   </v-container>
                   
                   <!-- <v-text-field
                        variant="solo"
                        v-model="selected_employee"
                        label="Employee"
                        readonly
                    >
                    <v-tooltip
                        activator="parent"
                        location="start"
                            >Read Only
                        </v-tooltip>
                    </v-text-field> -->

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
                                        @input="calculateBillingTerm"
                                    ></v-text-field>
                                    </v-col>

                                    <v-col cols="3">
                                    <v-text-field
                                        variant="solo"
                                        type="date"
                                        label="Term End Date"
                                        v-model="term_end"
                                        @input="calculateBillingTerm"
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
                        @click="handleUpdate"
                        color="teal"
                    >
                        Update
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
        fetched_employee_names: [],
        selected_employee: null,
        onMonthYearChange: '',
        calculateBillingTerm: '',
        gross_loan_amount: '',
            showMonthPicker: false,
            showTermStartDatePicker: false,
            showTermEndDatePicker: false,
            fetched_employee_name: [],
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

            agency_number: '',
            agency_name: '',
            employee_name: '',
            employee_id: '',
            billing_type: '',
            office_assignment: '',
            remarks: '',
            approval_date: '',
            gross_billing_amount: '',
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
    this.fetchExistingGsisBillings();
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
        async fetchExistingGsisBillings() {
            try {
                const gsis_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/gsis_billings/edit/${gsis_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const gsis_billing = response.data;

                    this.existingGsisBilling = gsis_billing.pag_ibig_id_rtn;

                    // Populate the form fields with the fetched data
                    this.selected_employee = gsis_billing.employee_name;
                    this.agency_number = gsis_billing.agency_number;
                    this.agency_name = gsis_billing.agency_name;
                    this.office_assignment = gsis_billing.office_assignment;
                    this.approval_date = gsis_billing.approval_date;  // Adjust if necessary
                    this.gross_loan_amount = gsis_billing.gross_loan_amount;
                    this.term_start = gsis_billing.term_start;
                    this.first_due_month = gsis_billing.first_due_month;
                    this.monthly_installment = gsis_billing.monthly_installment;
                    this.term_end = gsis_billing.term_end;
                    this.loan_term_in_months = gsis_billing.loan_term_in_months;
                    this.selected_loan_type = gsis_billing.loan_type;
                    this.remarks = gsis_billing.remarks;
                } else {
                    console.error('Failed to fetch existing gsis_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const gsis_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    bp_number: selectedEmployee.gsis_bp_number,
                    agency_number: this.agency_number,
                    agency_name: this.agency_name,
                    loan_type: this.selected_loan_type,
                    employee_name: this.selected_employee,
                    selected_employee: this.selected_employee,
                    selected_loan_type: this.selected_loan_type,
                    office_assignment: this.office_assignment,
                    remarks: this.remarks,
                    approval_date: this.approval_date,
                    gross_loan_amount: this.gross_loan_amount,
                    term_start: this.term_start,
                    term_end: this.term_end,
                    loan_term_in_months: this.loan_term_in_months,
                    first_due_month: this.first_due_month,
                    monthly_installment: this.monthly_installment,
                };

                const response = await axios.post(`/api/gsis_billings/update/${gsis_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/gsis_billings', query: { showSuccessEditDialog: 'true' } });
                } else {
                    console.error('Failed to update data.');
                }
            } catch (error) {
                console.error('Error:', error);
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