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
                        v-model="premiums"
                        label="Premiums"
                        :rules="[
                            v => !!v || 'Premiums is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>

                    <v-text-field
                        variant="solo"
                        v-model="premium_appears"
                        label="Premium Appears"
                        :rules="[
                            v => !!v || 'Account Number is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="loan"
                        label="Loan"
                        :rules="[
                            v => !!v || 'Loan is required'
                           
                        ]"
                    ></v-text-field>
                    <v-row>
                        <v-col cols="6">
                                <v-text-field
                             
                                    variant="solo"
                                    v-model="penalty"
                                    label="Penalty"
                                    :rules="[
                                        v => !!v || 'Penalty is required'
                                    ]"
                                ></v-text-field>
                        </v-col>

                            
                        <v-col cols="6">
                                <v-text-field
                                
                                    variant="solo"
                                    v-model="totals"
                                    label="Totals"
                                    :rules="[
                                        v => !!v || 'Totals is required'
                                    ]"
                                ></v-text-field>
                        </v-col>
                    </v-row>
                
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
                <router-link to="/admin/coco_billings/">
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
        premiums: '',
        premium_appears: '',
        loan: '',
        penalty: '',
        totals: '',
        remarks: '',
        employees: [],
        existingCocoBilling: [],
    };
  },
  created() {
    this.fetchExistingCocoBillings();
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
        async fetchExistingCocoBillings() {
            try {
                const coco_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/coco_billings/edit/${coco_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const coco_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.premiums = coco_billing.premiums;
                    this.premium_appears = coco_billing.premium_appears;
                    this.loan = response.data.loan;
                    this.penalty = response.data.penalty;
                    this.totals = coco_billing.totals;
                    this.remarks = coco_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing coco_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const coco_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    premiums: this.premiums,
                    premium_appears: this.premium_appears,
                    loan: this.loan,
                    penalty: this.penalty,
                    totals: this.totals,
                    remarks: this.remarks,
                };

                const response = await axios.post(`/api/coco_billings/update/${coco_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/coco_billings', query: { showSuccessEditDialog: 'true' } });
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