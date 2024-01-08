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
                        @click="handleSubmit"
                        color="teal"
                    >
                        Submit
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
                        premiums: this.premiums,
                        premium_appears: this.premium_appears,
                        loan: this.loan,
                        penalty: this.penalty,
                        totals: this.totals,
                        remarks: this.remarks
                    };

                    const response = await fetch('/api/coco_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.coco_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('coco_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingCocoBilling.includes(this.coco_id);
        },

        clearFields() {
            this.premiums = '';
            this.premium_appears = '';
            this.loan = '';
            this.penalty = '';
            this.totals = '';
            this.remarks = '';
        },
    },
};
</script>
