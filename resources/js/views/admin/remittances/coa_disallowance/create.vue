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
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/coa_disallowance/">
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
                        nd_number_17_002_05_16: this.nd_number_17_002_05_16,
                        nd_number_17_003_05_16: this.nd_number_17_003_05_16,
                        nd_number_16_004_05_16: this.nd_number_16_004_05_16,
                        nd_number_21_018_05_13: this.nd_number_21_018_05_13,
                        total: this.total,
                        remarks: this.remarks,
                        user_id: userId,

                    };

                    const response = await fetch('/api/coa_disallowances/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'remittances.coa_disallowance.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('coa is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingCOABilling.includes(this.coa_id);
        },

        clearFields() {
            this.nd_number_17_002_05_16 = '';
            this.nd_number_17_003_05_16 = '';
            this.nd_number_16_004_05_16 = '';
            this.nd_number_21_018_05_13 = '';
            this.total = '';
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