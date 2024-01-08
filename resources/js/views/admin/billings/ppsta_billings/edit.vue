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
                            v-model="mas"
                            label="MAS"
                            :rules="[
                                v => !!v || 'MAS Contribution is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="mrbs"
                            label="MRBS"
                            :rules="[
                                v => !!v || 'MRBS Contribution is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="nmrbs"
                            label="NMRBS"
                            :rules="[
                                v => !!v || 'NMRBS Contribution is required'
                            ]"
                        ></v-text-field>

                        <v-text-field
                            type="number"
                            variant="solo"
                            v-model="loan_amortization"
                            label="Loan Amortization"
                            :rules="[
                                v => !!v || 'Loan Amortization is required'
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
                <router-link to="/admin/ppsta_billings/">
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
        mas: '',
        mrbs: '',
        nmrbs: '',
        total: '',
        calculateTotal: '',
        loan_amortization: '',
        remarks: '',
        employees: [],
        existingPpstaBilling: [],
    };
  },
  created() {
    this.fetchExistingPpstaBillings();
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
        async fetchExistingPpstaBillings() {
            try {
                const ppsta_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/ppsta_billings/edit/${ppsta_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const ppsta_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.mas = ppsta_billing.mas;
                    this.mrbs = ppsta_billing.mrbs;
                    this.nmrbs = ppsta_billing.nmrbs;
                    this.total = ppsta_billing.total;
                    this.loan_amortization = ppsta_billing.loan_amortization;
                    this.remarks = ppsta_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing ppsta_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const ppsta_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    mas: this.mas,
                    mrbs: this.mrbs,
                    nmrbs: this.nmrbs,
                    total: this.total,
                    loan_amortization: this.loan_amortization,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/ppsta_billings/update/${ppsta_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/ppsta_billings', query: { showSuccessEditDialog: 'true' } });
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