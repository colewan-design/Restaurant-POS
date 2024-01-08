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
                            @input="calculateTotal"
                            type="number"
                            variant="solo"
                            v-model="nd_number_17_002_05_16"
                            label="ND No. 17-002-05-(16)"
                            :rules="[
                                v => !!v || 'ND No. 17-002-05-(16) is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="nd_number_17_003_05_16"
                            label="ND No. 17-003-05-(16)"
                            :rules="[
                                v => !!v || 'ND No. 17-003-05-(16) is required'
                            ]"
                        ></v-text-field>
                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="nd_number_16_004_05_16"
                            label="ND No. 16-004-05-(16)"
                            :rules="[
                                v => !!v || 'ND No. 16-004-05-(16) is required'
                            ]"
                        ></v-text-field>
                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="nd_number_21_018_05_13"
                            label="ND No. 21-018-05-(13)"
                            :rules="[
                                v => !!v || 'ND No. 21-018-05-(13) is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="total"
                            label="Total"
                            :rules="[
                                v => !!v || 'Total is required'
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
                <router-link to="/admin/coa_disallowance/">
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
        nd_number_17_002_05_16: 0,
        nd_number_17_003_05_16: 0,
        nd_number_16_004_05_16: 0,
        nd_number_21_018_05_13: 0,
        total: 0,
        remarks: '',
        employees: [],
        existingCOABilling: [],
    };
  },
  created() {
    this.fetchExistingCoaBillings();
    this.getEmployees(); 
  },
  watch: {
        nd_number_17_002_05_16() {
        this.calculateTotal();
        },
        nd_number_17_003_05_16() {
        this.calculateTotal();
        },
        nd_number_16_004_05_16() {
        this.calculateTotal();
        },
        nd_number_21_018_05_13() {
        this.calculateTotal();
        },
    },
 
  methods: {
    calculateTotal() {
            // Ensure the fields are not empty
            if (this.nd_number_17_002_05_16 !== '' && this.nd_number_17_003_05_16 !== '' && this.nd_number_16_004_05_16 !== '' && this.nd_number_21_018_05_13 !== '') {
                // Calculate Total Due with 2 decimal places
                this.total = (
                parseFloat(this.nd_number_17_002_05_16) +
                parseFloat(this.nd_number_17_003_05_16) +
                parseFloat(this.nd_number_16_004_05_16) +
                parseFloat(this.nd_number_21_018_05_13) 
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
        async fetchExistingCoaBillings() {
            try {
                const coa_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/coa_disallowances/edit/${coa_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const coa_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.nd_number_16_004_05_16 = coa_billing.nd_no_16_004_05_16;
                    this.nd_number_17_002_05_16 = coa_billing.nd_no_17_002_05_16;
                    this.nd_number_17_003_05_16 = coa_billing.nd_no_17_003_05_16;
                    this.nd_number_21_018_05_13 = coa_billing.nd_no_21_018_05_13;
                    this.total = coa_billing.total;
                    this.remarks = coa_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing coa_disallowances.');
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
                    nd_number_17_002_05_16: this.nd_number_17_002_05_16,
                    nd_number_17_003_05_16: this.nd_number_17_003_05_16,
                    nd_number_16_004_05_16: this.nd_number_16_004_05_16,
                    nd_number_21_018_05_13: this.nd_number_21_018_05_13,
                    total: this.total,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/coa_disallowances/update/${coa_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/coa_disallowance', query: { showSuccessEditDialog: 'true' } });
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