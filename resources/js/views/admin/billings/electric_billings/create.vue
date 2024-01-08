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
                                    v => !!v || 'This field is empty',
                                
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
                                    v => !!v || 'This field is empty',
                                
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
                                    v => !!v || 'This field is empty'
                                
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
                            @input="calculateVatAndAmountDue"
                            :rules="[v => !!v || 'This field is empty']"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field
                            type="number"
                            variant="solo"
                            v-model="vat"
                            label="Vat"
                            :rules="[v => !!v || 'This field is empty']"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="4">
                            <v-text-field
                            type="number"
                            variant="solo"
                            v-model="amount_due"
                            label="Amount Due"
                            :rules="[v => !!v || 'This field is empty']"
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
                                    v => !!v || 'This field is empty'
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
                                    v => !!v || 'This field is empty'
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
                                    v => !!v || 'This field is empty'
                                ]"
                            ></v-text-field>

                        </v-col>
                    </v-row>
                    <v-text-field
                        variant="solo"
                        v-model="remarks"
                        label="Remarks"
                        :rules="[
                            v => !!v || 'This field is empty'
                        ]"
                    ></v-text-field>
                 
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/electric_billings/">
                    <v-btn class="mt-2" color="red-darken-3" @click="clearFields">Cancel</v-btn>
                  </router-link>
                </v-form>
            </v-sheet>
        </v-row>
    </v-container>
</template>




<script>
export default {
    data() {
        return {
            selected_employee: '', 
            fetched_employee_names: [],
            employee_name: '',
            employee_id: '',
            present_meter_reading: 0,
            previous_meter_reading: 0,
            energy_used: 0,
            vat: 0,
            amount: 0,
            amount_due: 0,
            over_remittance: 0,
            under_remittance: 0,
            total_due: 0,
            remarks: '',
            employees: [],
            electric_vat: [],
            existingElectricBilling: [],
            
        };
    },
    created() {
        this.getEmployees(); 
        this.getElectricVat(); 
    },

    watch: {
        amount() {
        this.calculateVatAndAmountDue();
        },
        amount() {
        this.calculateTotalDue();
        },
        vat() {
        this.calculateTotalDue();
        },
        under_remittance() {
        this.calculateTotalDue();
        },
        over_remittance() {
        this.calculateTotalDue();
        },
    },

    methods: {

        calculateTotalDue() {
            // Ensure the fields are not empty
            if (this.amount !== '' && this.vat !== '' && this.under_remittance !== '' && this.over_remittance !== '') {
                // Calculate Total Due with 2 decimal places
                this.total_due = (
                parseFloat(this.amount) +
                parseFloat(this.vat) +
                parseFloat(this.under_remittance) +
                parseFloat(this.over_remittance)
                ).toFixed(2);
            }
        },

        calculateVatAndAmountDue() {
        // Ensure the electric_billing_vat is available
        if (this.electric_billing_vat && this.amount !== '') {
            // Calculate Vat with 2 decimal places
            this.vat = (parseFloat(this.amount) * this.electric_billing_vat / 100).toFixed(2);

            // Calculate Amount Due with 2 decimal places
            this.amount_due = (parseFloat(this.amount) + parseFloat(this.vat)).toFixed(2);
        }
        },

        async getElectricVat() {
            try {
                const response = await axios.get(`/api/system_config/edit/1`);

                if (response.status === 200) {
                    const system_config = response.data;
                    this.electric_billing_vat = system_config.electric_billing_vat;
                    console.log(this.electric_billing_vat);
                } else {
                    console.error('Failed to fetch existing data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async getEmployees() {
            try {
                const response = await axios.get('/api/employees_lib/getList');
                this.employees = response.data;
                this.fetched_employee_names = this.employees.map(employee => employee.employee_name);
            } catch (error) {
                console.error(error);
            }
        },
      

        async handleSubmit(userId) {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);

            if (!this.isDuplicate()) {
                try {
                    const formData = {
                        employee_id: selectedEmployee.employee_id,
                        present_meter_reading: this.present_meter_reading,
                        previous_meter_reading: this.previous_meter_reading,
                        energy_used: this.energy_used,
                        loan: this.loan,
                        vat: this.vat,
                        amount_due: this.amount_due,
                        amount: this.amount,
                        over_remittance: this.over_remittance,
                        under_remittance: this.under_remittance,
                        total_due: this.total_due,
                        remarks: this.remarks,
                        user_id: userId,

                    };

                    const response = await fetch('/api/electric_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.electric_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('electric_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingElectricBilling.includes(this.electric_id);
        },

        clearFields() {
            this.present_meter_reading = '';
            this.previous_meter_reading = '';
            this.energy_used = '';
            this.vat = '';
            this.amount_due = '';
            this.amount = '';
            this.over_remittance = '';
            this.under_remittance = '';
            this.total_due = '';
            this.remarks = '';
        },
    },
};
</script>

<script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script>