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
                                v-model="bpno"
                                label="BP Number"
                                :rules="[
                                    v => !!v || 'BP Number is required',
                                     // Add this rule for integers
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
                                    v => !!v || 'PS is required',
                                     // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                variant="solo"
                                v-model="gs"
                                label="GS"
                                :rules="[
                                    v => !!v || 'GS is required',
                                     // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                variant="solo"
                                v-model="ec"
                                label="EC"
                                :rules="[
                                    v => !!v || 'EC is required',
                                     // Add this rule for integers
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
        bpno: '',
        ps: '',
        gs: '',
        ec: '',
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
                const gsis_premium_id = this.$route.params.id;
                const response = await axios.get(`/api/gsis_premiums/edit/${gsis_premium_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const gsis_premium = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = gsis_premium.employee_name;
                    this.bpno = gsis_premium.bpno;
                    this.ps = gsis_premium.ps;
                    this.gs = gsis_premium.gs;
                    this.ec = gsis_premium.ec;
                   
                    this.remarks = gsis_premium.remarks;
                 
                   

                } else {
                    console.error('Failed to fetch existing gsis_premiums.');
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
                    bpno: this.bpno,
                    ps: this.ps,
                    gs: this.gs,
                    ec: this.ec,
                  
                  
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/gsis_premiums/update/${pldt_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/gsis_premiums', query: { showSuccessEditDialog: 'true' } });
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