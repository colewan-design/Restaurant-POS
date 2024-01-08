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
                        prefix="₱"
                        type="number"
                        variant="solo"
                        v-model="loan_granted"
                        label="Loan Granted"
                        :rules="[
                            v => !!v || 'Loan Granted is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        prefix="₱"
                        type="number"
                        variant="solo"
                        v-model="loan_balance"
                        label="Loan Balance"
                        :rules="[
                            v => !!v || 'Loan Balance is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        prefix="₱"
                        @input="calculateTotal"
                        type="number"
                        variant="solo"
                        v-model="annuity_amortization"
                        label="Annuity Amortization"
                        :rules="[
                            v => !!v || 'Annuity Amortization is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        prefix="₱"
                        type="number"
                        variant="solo"
                        v-model="share_capital"
                        label="Share Capital"
                        :rules="[
                            v => !!v || 'Share Capital is required'
                        ]"
                    ></v-text-field>

          
               
                    <v-text-field
                        prefix="₱"
                        type="number"
                        variant="solo"
                        v-model="savings"
                        label="Savings"
                        :rules="[
                            v => !!v || 'Savings is required'
                        ]"
                    ></v-text-field>
                        
                    <v-text-field
                        prefix="₱"
                        type="number"
                        variant="solo"
                        v-model="total_deductions"
                        label="Total Deductions"
                        :rules="[
                            v => !!v || 'Total Deductions is required'
                        ]"
                    ></v-text-field>
                
                      

                    <v-textarea
                        variant="solo"
                        v-model="remarks"
                        label="Remarks"
                        :rules="[
                            v => !!v || 'Remarks is required'
                        ]"
                    ></v-textarea>
                 
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/cmpc_billings/">
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
            savings: 0,
            share_capital: 0,
            total_deductions: 0,
            remarks: '',
            
            loan_granted: 0,
            loan_balance: 0,
            annuity_amortization: 0,

            employees: [],
            existingCmpcBilling: [],
            
        };
    },
    created() {
        this.getEmployees(); 
    },
    watch: {
        annuity_amortization() {
        this.calculateTotal();
        },
        savings() {
        this.calculateTotal();
        },
        share_capital() {
        this.calculateTotal();
        }
    },
    methods: {

        calculateTotal() {
            // Ensure the fields are not empty
            if (this.annuity_amortization !== '' && this.savings !== '' && this.share_capital !== '') {
                // Calculate Total Due with 2 decimal places
                this.total_deductions = (
                parseFloat(this.annuity_amortization) +
                parseFloat(this.savings) +
                parseFloat(this.share_capital)
                ).toFixed(2);
            }
        },

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
                        savings: this.savings,
                        share_capital: this.share_capital,
                        total_deductions: this.total_deductions,
                        remarks: this.remarks,
                        loan_granted: this.loan_granted,
                        loan_balance: this.loan_balance,
                        annuity_amortization: this.annuity_amortization,
                        user_id: userId,

                    };

                    const response = await fetch('/api/cmpc_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.cmpc_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('cmpc is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingCmpcBilling.includes(this.cmpc_id);
        },

        clearFields() {
            this.savings = '';
            this.share_capital = '';
            this.total_deductions = '';
            this.remarks = '';

            this.loan_balance = '';
            this.loan_granted = '';
            this.annuity_amortization = '';
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