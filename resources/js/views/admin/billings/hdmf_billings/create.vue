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
                    <v-col cols="12">
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
                    <v-col cols="12">
                        <v-text-field
                            variant="solo"
                            v-model="rtn"
                            label="Pag-IBIG ID/RTN"
                            :rules="[
                                v => !!v || 'Pag-IBIG ID/RTN is required'
                            ]"
                        ></v-text-field>
                    </v-col>
                  </v-row>

                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="application_number"
                                label="Application Number"
                                :rules="[
                                    v => !!v || 'Application Number is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="amount"
                                    label="Amount"
                                    :rules="[
                                        v => !!v || 'Amount is required'
                                    ]"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete
                                variant="solo"
                                label="Loan Type"
                                v-model="selected_loan_type"
                                :items="loan_type_data.map(item => item.name)"
                                item-text="name"
                                item-value="id"
                                search-input
                            ></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-text-field
                        v-if="selected_loan_type === 'Housing Loan'"
                        variant="solo"
                        v-model="post_code"
                        label="Post Code"
                        :rules="[v => !!v || 'Post Code is required']"
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
                  <router-link to="/admin/hdmf_billings/">
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
            selected_loan_type: '',
            loan_type_data: '',
            selected_employee: '', 
            fetched_employee_names: [],
            employee_name: '',
            employee_id: '',
            application_number: '',
            loan_type: '',
            amount: '',
            remarks: '',
            rtn: '',
            post_code: '',
            employees: [],
            existingHdmfBilling: [],
            loan_type_data: [
                {
                    id: 1,
                    name: 'Multipurpose Loan'
                },
                {
                    id: 2,
                    name: 'Housing Loan'
                },
                {
                    id: 3,
                    name: 'Calamity Loan'
                },
              
            ],
            
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
                        application_number: this.application_number,
                        loan_type: this.selected_loan_type,
                        post_code: this.post_code,
                        amount: this.amount,
                        remarks: this.remarks,
                        rtn: this.rtn,
                        user_id: userId,

                    };

                    const response = await fetch('/api/hdmf_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.hdmf_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('hdmf_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingHdmfBilling.includes(this.hdmf_id);
        },

        clearFields() {
            this.application_number = '';
            this.loan_type = '';
            this.amount = '';
            this.post_code = '';
            this.remarks = '';
            this.rtn = '';
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