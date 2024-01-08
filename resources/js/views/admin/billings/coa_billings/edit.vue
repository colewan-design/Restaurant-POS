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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/coa_billings/">
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
            total_disallowances: 0,
            total_payments: 0,
            total_balance: 0,
            amount_due: 0,
            payroll_period: null,
            remarks: '',
            employees: [],
            existingCOABilling: [],
    };
  },
  created() {
    this.fetchExistingCoaBillings();
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
        async fetchExistingCoaBillings() {
            try {
                const coa_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/coa_billings/edit/${coa_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const coa_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.total_disallowances = coa_billing.total_disallowances;
                    this.total_payments = coa_billing.total_payments;
                    this.total_balance = coa_billing.total_balance;
                    this.amount_due = coa_billing.amount_due;
                    this.payroll_period = coa_billing.payroll_period;
                    this.remarks = coa_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing coa_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const coa_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    total_payments: this.total_payments,
                    total_balance: this.total_balance,
                    total_disallowances: this.total_disallowances,
                    amount_due: this.amount_due,
                    payroll_period: this.payroll_period,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/coa_billings/update/${coa_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/coa_billings', query: { showSuccessEditDialog: 'true' } });
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