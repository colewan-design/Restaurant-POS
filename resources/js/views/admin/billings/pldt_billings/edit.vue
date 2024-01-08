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

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                v-model="account_number"
                                label="Account Number"
                                :rules="[
                                    v => !!v || 'Account Number is required',
                                    v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                v-model="soa_number"
                                label="SOA Number"
                                :rules="[
                                    v => !!v || 'SOA Number is required',
                                    v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                   
                    <v-text-field
                        type="date"
                        variant="solo"
                        v-model="bill_date"
                        label="Bill Date"
                        :rules="[
                            v => !!v || 'Bill Date is required'
                           
                        ]"
                    ></v-text-field>
                    <v-row>
                        <v-col cols="6">
                                <v-text-field
                             
                                    variant="solo"
                                    v-model="total_amount_due"
                                    label="Total Amount Due"
                                    :rules="[
                                        v => !!v || 'Total Amount Due is required'
                                    ]"
                                ></v-text-field>
                        </v-col>

                            
                        <v-col cols="6">
                                <v-text-field
                                    type="date"
                                    variant="solo"
                                    v-model="payment_due_date"
                                    label="Payment Due Date"
                                    :rules="[
                                        v => !!v || 'Payment Due Date is required'
                                    ]"
                                ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="3">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="previous_balance"
                                label="Previous Balance"
                                :rules="[
                                    v => !!v || 'Previous Balance is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="payments"
                                label="Payments"
                                :rules="[
                                    v => !!v || 'Payments is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="adjustments"
                                label="Adjustments"
                                :rules="[
                                    v => !!v || 'Adjustments is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="past_due_amount"
                                label="Past Due Amount"
                                :rules="[
                                    v => !!v || 'Past Due Amount is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>


                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="current_amount"
                        label="Current Amount"
                        :rules="[
                            v => !!v || 'Current Amount is required'
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
                <router-link to="/admin/pldt_billings/">
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
        account_number: '',
        soa_number: '',
        bill_date: '',
        payment_due_date: '',
        previous_balance: '',
        total_amount_due: '',
        payments: '',
        adjustments: '',
        past_due_amount: '',
        current_amount: '',
        remarks: '',
        employees: [],
        existingPldtBilling: [],
    };
  },
  created() {
    this.fetchExistingPldtBillings();
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
        async fetchExistingPldtBillings() {
            try {
                const pldt_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/pldt_billings/edit/${pldt_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const pldt_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.account_number = pldt_billing.account_number;
                    this.soa_number = pldt_billing.soa_number;
                    this.bill_date = response.data.bill_date;
                    this.payment_due_date = response.data.payment_due_date;
                    this.previous_balance = pldt_billing.previous_balance;
                    this.total_amount_due = pldt_billing.total_amount_due;
                    this.payments = response.data.payments;
                    this.adjustments = response.data.adjustments;
                    this.past_due_amount = pldt_billing.past_due_amount;
                    this.current_amount = pldt_billing.current_amount;

                    this.remarks = pldt_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing pldt_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const pldt_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    account_number: this.account_number,
                    soa_number: this.soa_number,
                    bill_date: this.bill_date,
                    payment_due_date: this.payment_due_date,
                    total_amount_due: this.total_amount_due,
                    previous_balance: this.previous_balance,
                    payments: this.payments,
                    adjustments: this.adjustments,
                    past_due_amount: this.past_due_amount,
                    current_amount: this.current_amount,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/pldt_billings/update/${pldt_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/pldt_billings', query: { showSuccessEditDialog: 'true' } });
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