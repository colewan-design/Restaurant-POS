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
                        clearable
                    ></v-autocomplete>


                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                v-model="group"
                                label="Group"
                                :rules="[
                                    v => !!v || 'Group is required'
                                ]"
                                 
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                v-model="amount"
                                label="Amount"
                                :rules="[
                                    v => !!v || 'Amount is required'
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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/withholding_tax_billings/">
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
        selected_employee: null, 
        fetched_employee_names: [],
        employee_name: '',
        employee_id: '',
        group: '',
        amount: '',
        remarks: '',
        employees: [],
        existingWithholdingTaxBilling: [],
    };
  },
  created() {
    this.fetchExistingWithholdingTaxBillings();
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
        async fetchExistingWithholdingTaxBillings() {
            try {
                const withholding_tax_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/withholding_tax_billings/edit/${withholding_tax_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const withholding_tax_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.amount = withholding_tax_billing.amount;
                    this.group = withholding_tax_billing.group;
                    this.remarks = withholding_tax_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing withholding_tax_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const withholding_tax_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    amount: this.amount,
                    group: this.group,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/withholding_tax_billings/update/${withholding_tax_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/withholding_tax_billings', query: { showSuccessEditDialog: 'true' } });
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