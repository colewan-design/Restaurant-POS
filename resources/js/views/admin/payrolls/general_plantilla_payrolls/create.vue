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
                  
                   
                    <!-- <v-autocomplete
                        variant="solo"
                        label="Employee"
                        v-model="selected_employee"
                        :items="fetched_employee_names"
                        item-text="employee_name"
                        item-value="employee_id"
                        search-input
                    ></v-autocomplete> -->

                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                variant="solo"
                                type="date"
                                v-model="payroll_period"
                                label="Payroll Period"
                                :rules="[
                                    v => !!v || 'Payroll Period is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-autocomplete
                                variant="solo"
                                label="Payroll Name"
                                v-model="payroll_name"
                                :items="['General Plantilla Payroll']"
                                item-text="employee_name"
                                item-value="employee_id"
                                search-input
                            ></v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-btn
                                type="submit"
                                class="mt-2 mr-2"
                                @click="handleSubmit(user.id)"
                                color="teal"
                            >
                                Submit
                            </v-btn>
                            <router-link to="/admin/pldt_billings/">
                                <v-btn class="mt-2" color="red-darken-3" @click="clearFields">Cancel</v-btn>
                            </router-link>
                        </v-col>
                       
                    </v-row>
                   
                   
                   
                  
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
                        account_number: this.account_number,
                        soa_number: this.soa_number,
                        bill_date: this.bill_date,
                        loan: this.loan,
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

                    const response = await fetch('/api/pldt_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.pldt_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('pldt_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingPldtBilling.includes(this.pldt_id);
        },

        clearFields() {
            this.account_number = '';
            this.soa_number = '';
            this.bill_date = '';
            this.payment_due_date = '';
            this.amount = '';
            this.payments = '';
            this.adjustments = '';
            this.total_amount_due = '';
            this.previous_balance = '';
            this.past_due_amount = '';
            this.current_amount = '';
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