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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/cmpc_billings/">
                  <v-btn class="mt-2" color="red-darken-3">Cancel</v-btn>
                </router-link>
              </v-form>

            </v-sheet>
        </v-row>
   </v-container>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script>

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
    this.fetchExistingCmpcBillings();
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
        async fetchExistingCmpcBillings() {
            try {
                const cmpc_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/cmpc_billings/edit/${cmpc_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const cmpc_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.savings = cmpc_billing.savings;
                    this.total_deductions = cmpc_billing.total_deduction;
                    this.loan_granted = cmpc_billing.loan_granted;
                    this.loan_balance = cmpc_billing.loan_balance;
                    this.annuity_amortization = cmpc_billing.annuity_amortization;
                    this.share_capital = cmpc_billing.share_capital;
                    this.remarks = cmpc_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing cmpc_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const cmpc_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    savings: this.savings,
                    share_capital: this.share_capital,
                    total_deductions: this.total_deductions,
                    loan_balance: this.loan_balance,
                    loan_granted: this.loan_granted,
                    annuity_amortization: this.annuity_amortization,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/cmpc_billings/update/${cmpc_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/cmpc_billings', query: { showSuccessEditDialog: 'true' } });
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