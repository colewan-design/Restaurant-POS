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
                                v-model="monthly_compensation"
                                label="Monthly Compensation"
                                :rules="[
                                    v => !!v || 'Monthly Compensation is required',
                                    v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                variant="solo"
                                v-model="membership_program"
                                label="Membership Program"
                                :rules="[
                                    v => !!v || 'Membership Program is required',
                                    v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

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
                                variant="solo"
                                v-model="mid"
                                label="MID"
                                :rules="[
                                    v => !!v || 'MID is required',
                                    v => /^\d+$/.test(v) || 'Must be a valid integer'  // Add this rule for integers
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                   
                    <v-text-field
                        variant="solo"
                        v-model="percov"
                        label="PERCOV"
                        :rules="[
                            v => !!v || 'PERCOV is required'
                           
                        ]"
                    ></v-text-field>
                    <v-row>
                        <v-col cols="6">
                                <v-text-field
                             
                                    variant="solo"
                                    v-model="ee_share"
                                    label="EE Share"
                                    :rules="[
                                        v => !!v || 'EE Share is required',
                                        v => /^\d+$/.test(v) || 'Must be a valid integer' 
                                    ]"
                                ></v-text-field>
                        </v-col>

                            
                        <v-col cols="6">
                                <v-text-field
                                    variant="solo"
                                    v-model="er_share"
                                    label="ER Share"
                                    :rules="[
                                        v => !!v || 'ER Share is required'
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
                <router-link to="/admin/hdmf_premiums/">
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
        mid: '',
        percov: '',
        ee_share: '',
        er_share: '',
        membership_program: '',
        monthly_compensation: '',
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
                const hdmf_premium_id = this.$route.params.id;
                const response = await axios.get(`/api/hdmf_premiums/edit/${hdmf_premium_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const hdmf_premium = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = hdmf_premium.employee_name;
                    this.account_number = hdmf_premium.account_number;
                    this.mid = hdmf_premium.mid;
                    this.percov = hdmf_premium.percov;
                    this.ee_share = hdmf_premium.ee_share;
                    this.er_share = hdmf_premium.er_share;
                    this.remarks = hdmf_premium.remarks;
                    
                    // this.selected_employee = response.data.employee_name;
                    // this.account_number = response.account_number;
                    // this.mid = response.mid;
                    // this.percov = response.data.percov;
                    // this.ee_share = response.data.ee_share;
                    // this.er_share = response.er_share;
                    // this.monthly_compensation = response.monthly_compensation;
                    // this.membership_program = response.membership_program;
                    // this.remarks = response.remarks;
                   

                } else {
                    console.error('Failed to fetch existing hdmf_premiums.');
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
                    account_number: this.account_number,
                    mid: this.mid,
                    percov: this.percov,
                    ee_share: this.ee_share,
                    er_share: this.er_share,

                    monthly_compensation: this.monthly_compensation,
                    membership_program: this.membership_program,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/hdmf_premiums/update/${pldt_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/hdmf_premiums', query: { showSuccessEditDialog: 'true' } });
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