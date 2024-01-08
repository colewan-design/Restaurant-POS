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
                            type="number"
                                variant="solo"
                                v-model="ee_share"
                                label="EE Share"
                                :rules="[
                                    v => !!v || 'EE Share is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                   
    
                    <v-row>
                        <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="er_share"
                                    label="ER Share"
                                    :rules="[
                                        v => !!v || 'ER Share is required'
                                    ]"
                                ></v-text-field>
                        </v-col>

                            
                        <v-col cols="6">
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="percov"
                                    label="PERCOV"
                                    :rules="[
                                        v => !!v || 'PERCOV is required'
                                    ]"
                                ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="monthly_compensation"
                                label="Monthly Compensation"
                                :rules="[
                                    v => !!v || 'Monthly Compensation is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="mid"
                                label="MID"
                                :rules="[
                                    v => !!v || 'MID is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="membership_program"
                                label="Membership Program"
                                :rules="[
                                    v => !!v || 'Membership Program is required'
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
                <router-link to="/admin/hdmf_mpii/">
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
        ee_share: '',
        percov: '',
        monthly_compensation: '',
        er_share: '',
        mid: '',
        membership_program: '',
        remarks: '',
        employees: [],
        existingHdmfMPII: [],
    };
  },
  created() {
    this.fetchExistingHdmfMPII();
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
        async fetchExistingHdmfMPII() {
            try {
                const hdmf_mpii_id = this.$route.params.id;
                const response = await axios.get(`/api/hdmf_mpii/edit/${hdmf_mpii_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const hdmf_mpii = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.account_number = hdmf_mpii.account_number;
                    this.ee_share = hdmf_mpii.ee_share;
                    this.er_share = response.data.er_share;
                    this.percov = response.data.percov;
                    this.monthly_compensation = hdmf_mpii.monthly_compensation;
                    this.mid = hdmf_mpii.mid;
                    this.membership_program = response.data.membership_program;
                    this.remarks = hdmf_mpii.remarks;
                   

                } else {
                    console.error('Failed to fetch existing hdmf_mpii.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const hdmf_mpii_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    account_number: this.account_number,
                    ee_share: this.ee_share,
                    er_share: this.er_share,
                    percov: this.percov,
                    mid: this.mid,
                    monthly_compensation: this.monthly_compensation,
                    membership_program: this.membership_program,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/hdmf_mpii/update/${hdmf_mpii_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/hdmf_mpii', query: { showSuccessEditDialog: 'true' } });
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