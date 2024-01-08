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
                            type="number"
                            variant="solo"
                            v-model="total_disallowances"
                            label="Total Disallowances"
                            :rules="[
                                v => !!v || 'Total Disallowances is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="total_payments"
                            label="Total Payments"
                            :rules="[
                                v => !!v || 'Total Payments is required'
                            ]"
                        ></v-text-field>
                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="total_balance"
                            label="Total Balance"
                            :rules="[
                                v => !!v || 'Total Balance is required'
                            ]"
                        ></v-text-field>
                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="amount_due"
                            label="Amount Due"
                            :rules="[
                                v => !!v || 'Amount Due is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="date"
                            variant="solo"
                            v-model="payroll_period"
                            label="Payroll Period"
                            :rules="[
                                v => !!v || 'Payroll Period is required'
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
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/coa_billings/">
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
            total_disallowances: 0,
            total_payments: 0,
            total_balance: 0,
            amount_due: 0,
            payroll_period: 0,
            remarks: '',
            employees: [],
            existingCOABilling: [],
            
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
      

        async handleSubmit(userId) {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);

            if (!this.isDuplicate()) {
                try {
                    const formData = {
                        employee_id: selectedEmployee.employee_id,
                        total_disallowances: this.total_disallowances,
                        total_payments: this.total_payments,
                        total_balance: this.total_balance,
                        amount_due: this.amount_due,
                        payroll_period: this.payroll_period,
                        remarks: this.remarks,
                        user_id: userId,

                    };

                    const response = await fetch('/api/coa_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.coa_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('coa is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingCOABilling.includes(this.coa_id);
        },

        clearFields() {
            this.total_disallowances = '';
            this.total_payments = '';
            this.total_balance = '';
            this.amount_due = '';
            this.payroll_period = '';
            this.remarks = '';
        },
    },
};
</script>

<script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script>