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
                        v-model="pera_amount"
                        label="Amount"
                        :rules="[
                            v => !!v || 'Amount is required',
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
                <router-link to="/admin/pera/">
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
            pera_amount: '',
            remarks: '',
            employees: [],
            existingPeraData: [],
    };
  },
  created() {
    this.fetchExistingPeraData();
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
        async fetchExistingPeraData() {
            try {
                const pera_id = this.$route.params.id;
                const response = await axios.get(`/api/pera/edit/${pera_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const pera_data = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.pera_amount = pera_data.pera_amount;
                    this.remarks = pera_data.remarks;
                   

                } else {
                    console.error('Failed to fetch existing pera.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const pera_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    pera_amount: this.pera_amount,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/pera/update/${pera_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/pera', query: { showSuccessEditDialog: 'true' } });
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