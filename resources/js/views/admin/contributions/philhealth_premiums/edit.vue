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
                                type="number"
                                variant="solo"
                                v-model="philhealth_number"
                                label="Philhealth Number"
                                :rules="[
                                    v => !!v || 'Philhealth Number is required'
                                  
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="ps"
                                label="PS"
                                :rules="[
                                    v => !!v || 'PS is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="es"
                                label="ES"
                                :rules="[
                                    v => !!v || 'ES is required'
                                  
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                v-model="status"
                                label="Status"
                                :rules="[
                                    v => !!v || 'Status is required'
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
                <router-link to="/admin/gsis_premiums/">
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
        ps: '',
        es: '',
        status: '',
        philhealth_number: '',
        remarks: '',
        employees: [],
        existingPhilhealthPremium: [],
    };
  },
  created() {
    this.fetchExistingPhilhealthData();
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
        async fetchExistingPhilhealthData() {
            try {
                const philhealth_premium_id = this.$route.params.id;
                const response = await axios.get(`/api/philhealth_premiums/edit/${philhealth_premium_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const philhealth_premium = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = philhealth_premium.employee_name;
                    this.philhealth_number = philhealth_premium.philhealth_number;
                    this.ps = philhealth_premium.ps;
                    this.es = philhealth_premium.es;
                    this.status = philhealth_premium.status;
                   
                    this.remarks = philhealth_premium.remarks;
                 
                   

                } else {
                    console.error('Failed to fetch existing philhealth_premiums.');
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
                    philhealth_number: this.philhealth_number,
                    ps: this.ps,
                    es: this.es,
                    status: this.status,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/philhealth_premiums/update/${pldt_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/philhealth_premiums', query: { showSuccessEditDialog: 'true' } });
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