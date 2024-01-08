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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/hdmf_billings/">
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
    this.fetchExistingHdmfBillings();
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
        async fetchExistingHdmfBillings() {
            try {
                const hdmf_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/hdmf_billings/edit/${hdmf_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const hdmf_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.rtn = hdmf_billing.rtn;
                    this.application_number = hdmf_billing.application_number;
                    this.selected_loan_type = hdmf_billing.loan_type;
                    this.post_code = response.data.post_code;
                    this.amount = hdmf_billing.amount;
                    this.remarks = hdmf_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing hdmf_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const hdmf_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    rtn: this.rtn,
                    application_number: this.application_number,
                    loan_type: this.selected_loan_type,
                    post_code: this.post_code,
                    amount: this.amount,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/hdmf_billings/update/${hdmf_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/hdmf_billings', query: { showSuccessEditDialog: 'true' } });
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