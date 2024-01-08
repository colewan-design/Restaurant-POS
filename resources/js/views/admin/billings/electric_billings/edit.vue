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
                        <v-col cols="4">
                            <v-text-field
                                type="number"    
                                variant="solo"
                                v-model="present_meter_reading"
                                label="Present Meter Reading"
                                :rules="[
                                    v => !!v || 'Present Meter Reading is required',
                                
                                ]"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field
                                type="number"    
                                variant="solo"
                                v-model="previous_meter_reading"
                                label="Previous Meter Reading"
                                :rules="[
                                    v => !!v || 'Previous Meter Reading is required',
                                
                                ]"
                            ></v-text-field>

                        </v-col>

                        <v-col cols="4">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="energy_used"
                                label="Energy Used"
                                :rules="[
                                    v => !!v || 'Energy Used is required'
                                
                                ]"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                    
                    

                  
                    
                    <v-row>
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
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="vat"
                                    label="Vat"
                                    :rules="[
                                        v => !!v || 'Vat is required'
                                    ]"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="amount_due"
                                label="Amount Due"
                                :rules="[
                                    v => !!v || 'Amount Due is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="4">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="over_remittance"
                                label="Over Remittance"
                                :rules="[
                                    v => !!v || 'Over Remittance is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="under_remittance"
                                label="Under Remittance"
                                :rules="[
                                    v => !!v || 'Under Remittance is required'
                                ]"
                            ></v-text-field>

                        </v-col>
                        <v-col cols="4">

                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="total_due"
                                label="Total Due"
                                :rules="[
                                    v => !!v || 'Total Due is required'
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
                <router-link to="/admin/electric_billings/">
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
        present_meter_reading: '',
        previous_meter_reading: '',
        energy_used: '',
        vat: '',
        amount: '',
        amount_due: '',
        over_remittance: '',
        under_remittance: '',
        total_due: '',
        remarks: '',
        employees: [],
        existingElectricBilling: [],
    };
  },
  created() {
    this.fetchExistingElectricBillings();
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
        async fetchExistingElectricBillings() {
            try {
                const electric_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/electric_billings/edit/${electric_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const electric_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.present_meter_reading = electric_billing.present_meter_reading;
                    this.previous_meter_reading = electric_billing.previous_meter_reading;
                    this.energy_used = response.data.energy_used;
                    this.vat = response.data.vat;
                    this.amount = electric_billing.amount;
                    this.amount_due = electric_billing.amount_due;
                    this.previous_meter_reading = electric_billing.previous_meter_reading;
                    this.over_remittance = response.data.over_remittance;
                    this.under_remittance = response.data.under_remittance;
                    this.total_due = electric_billing.total_due;

                    this.remarks = electric_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing electric_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const electric_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    present_meter_reading: this.present_meter_reading,
                    previous_meter_reading: this.previous_meter_reading,
                    energy_used: this.energy_used,
                    vat: this.vat,
                    amount: this.amount,
                    amount_due: this.amount_due,
                    over_remittance: this.over_remittance,
                    under_remittance: this.under_remittance,
                    total_due: this.total_due,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/electric_billings/update/${electric_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/electric_billings', query: { showSuccessEditDialog: 'true' } });
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