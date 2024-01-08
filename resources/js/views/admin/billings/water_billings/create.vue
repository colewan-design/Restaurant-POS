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
                        type="date"
                        variant="solo"
                        v-model="date_billed"
                        label="Present Meter Reading"
                        :rules="[
                            v => !!v || 'Present Meter Reading is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="arrears_total_amount"
                        label="Total Amount in Arrears"
                        :rules="[
                            v => !!v || 'Total Amount in Arrears is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="energy_used"
                        label="Energy Used"
                        :rules="[
                            v => !!v || 'Energy Used is required'
                           
                        ]"
                    ></v-text-field>
                  
                
                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="unpaid_total_amount"
                        label="Unpaid Total Amount"
                        :rules="[
                            v => !!v || 'Unpaid Total Amount is required'
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
                  <router-link to="/admin/water_billings/">
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
            date_billed: '',
            arrears_total_amount: '',
            energy_used: '',
            unpaid_total_amount: '',
            remarks: '',
            employees: [],
            existingWaterBilling: [],
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
                        date_billed: this.date_billed,
                        arrears_total_amount: this.arrears_total_amount,
                        energy_used: this.energy_used,
                        loan: this.loan,
                        unpaid_total_amount: this.unpaid_total_amount,
                        remarks: this.remarks
                    };

                    const response = await fetch('/api/water_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.water_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('water_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingWaterBilling.includes(this.water_id);
        },

        clearFields() {
            this.date_billed = '';
            this.arrears_total_amount = '';
            this.energy_used = '';
            this.unpaid_total_amount = '';
            this.remarks = '';
        },
    },
};
</script>
