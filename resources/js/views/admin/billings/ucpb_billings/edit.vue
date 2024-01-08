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
                  
                    <v-row>
                    <v-col cols="4">
                        <v-autocomplete
                        variant="solo"
                        label="Employee"
                        v-model="selected_employee"
                        :items="fetched_employee_names"
                        item-text="employee_name"
                        item-value="employee_id"
                        search-input
                    ></v-autocomplete>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            variant="solo"
                            v-model="promissory_number"
                            label="Promissory Number"
                            :rules="[
                                v => !!v || 'Promissory Number is required',
                               
                            ]"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="term"
                            label="Term"
                            :rules="[
                                v => !!v || 'Term is required',
                               
                            ]"
                        ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                        <v-text-field
                        type="date"
                        variant="solo"
                        v-model="date_granted"
                        label="Date Granted"
                        :rules="[
                            v => !!v || 'Date Granted is required'
                           
                        ]"
                    ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                             type="date"
                             variant="solo"
                             v-model="date_maturity"
                             label="Date Maturity"
                             :rules="[
                                 v => !!v || 'Date Maturity is required'
                             ]"
                         ></v-text-field>
                    </v-col>
                  </v-row>
                   
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                prefix="₱"
                                variant="solo"
                                v-model="loan_amount"
                                label="Loan Amount"
                                :rules="[
                                    v => !!v || 'Loan Amount is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                            
                        <v-col cols="6">
                            <v-text-field
                                 type="number"
                                prefix="₱"
                                variant="solo"
                                v-model="monthly_amortization"
                                label="Monthly Amortization"
                                :rules="[
                                    v => !!v || 'Monthly Amortization is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                prefix="₱"
                                variant="solo"
                                v-model="penalty"
                                label="Penalty"
                                :rules="[
                                    v => !!v || 'Penalty is required',
                                         
                                ]"
                            ></v-text-field>

                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                prefix="₱"
                                variant="solo"
                                v-model="poi"
                                label="POI"
                                :rules="[
                                    v => !!v || 'POI is required',
                                         
                                ]"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                type="date"
                                variant="solo"
                                v-model="due_date"
                                label="Due Date"
                                :rules="[
                                    v => !!v || 'Due Date is required'
                                ]"
                            ></v-text-field>

                        </v-col>

                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                prefix="₱"
                                variant="solo"
                                v-model="due_amount"
                                label="Due Amount"
                                :rules="[
                                    v => !!v || 'Due Amount is required',
                                         
                                ]"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                variant="solo"
                                v-model="unpaid_amortization_number"
                                label="Number of Unpaid Amortization"
                                :rules="[
                                    v => !!v || 'Number of Unpaid Amortization is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                type="date"
                                variant="solo"
                                v-model="last_payment_date"
                                label="Last Payment Date"
                                :rules="[
                                    v => !!v || 'Last Payment Date is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    
                    <v-text-field
                    type="number"
                        prefix="₱"
                        variant="solo"
                        v-model="outstanding_balance"
                        label="Outstanding Balance"
                        :rules="[
                            v => !!v || 'Outstanding Balance is required',
                                 
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
                <router-link to="/admin/ucpb_billings/">
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
            promissory_number: '',
            term: '',
            date_granted: '',
            date_maturity: '',
            loan_amount: '',
            monthly_amortization: '',
            poi: '',
            due_date: '',
            due_amount: '',
            unpaid_amortization_number: '',
            last_payment_date: '',
            outstanding_balance: '',

            remarks: '',
            employees: [],
            existingUcpbBilling: [],
    };
  },
  created() {
    this.fetchExistingUcpbBillings();
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
        async fetchExistingUcpbBillings() {
            try {
                const ucpb_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/ucpb_billings/edit/${ucpb_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const ucpb_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.promissory_number = ucpb_billing.promissory_number;
                    this.term = ucpb_billing.term;
                    this.date_granted = response.data.date_granted;
                    this.date_maturity = response.data.date_maturity;
                    this.loan_amount = ucpb_billing.loan_amount;
                    this.monthly_amortization = ucpb_billing.monthly_amortization;
                    this.penalty = response.data.penalty;
                    this.poi = response.data.poi;
                    this.due_date = ucpb_billing.due_date;

                    this.due_amount = ucpb_billing.due_amount;
                    this.unpaid_amortization_number = ucpb_billing.unpaid_amortization_number;
                    this.last_payment_date = response.data.last_payment_date;
                    this.outstanding_balance = response.data.outstanding_balance;
                    this.remarks = ucpb_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing ucpb_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const ucpb_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    loan_amount: this.loan_amount,
                    promissory_number: this.promissory_number,
                    term: this.term,
                    date_granted: this.date_granted,
                    date_maturity: this.date_maturity,
                    loan_amount: this.loan_amount,
                    monthly_amortization: this.monthly_amortization,
                    penalty: this.penalty,
                    poi: this.poi,
                    due_date: this.due_date,
                    loan_amount: this.loan_amount,
                    due_amount: this.due_amount,
                    unpaid_amortization_number: this.unpaid_amortization_number,
                    last_payment_date: this.last_payment_date,
                    outstanding_balance: this.outstanding_balance,
                    remarks: this.remarks,
                };

                const response = await axios.post(`/api/ucpb_billings/update/${ucpb_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/ucpb_billings', query: { showSuccessEditDialog: 'true' } });
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