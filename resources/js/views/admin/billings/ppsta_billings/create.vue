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
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/ppsta_billings/">
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
            mas: 0,
            mrbs: 0,
            nmrbs: 0,
            loan_amortization: 0,
            remarks: '',
            total: 0,
            employees: [],
            existingPPSTABilling: [],
            
        };
    },
   
    watch: {
        mas() {
        this.calculateTotal();
        },
        mrbs() {
        this.calculateTotal();
        },
        nmrbs() {
        this.calculateTotal();
        },
    },
    created() {
        this.getEmployees(); 
    },

    methods: {
        
        calculateTotal() {
            // Ensure the fields are not empty
            if (this.mas !== '' && this.nmrbs !== '' && this.mrbs !== '') {
                // Calculate Total Due with 2 decimal places
                this.total = (
                parseFloat(this.mas) +
                parseFloat(this.nmrbs) +
                parseFloat(this.mrbs)
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
                        mas: this.mas,
                        mrbs: this.mrbs,
                        nmrbs: this.nmrbs,
                        loan_amortization: this.loan_amortization,
                        total: this.total,
                        mas: this.mas,
                        remarks: this.remarks,
                        user_id: userId,

                    };

                    const response = await fetch('/api/ppsta_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.ppsta_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('ppsta is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingPPSTABilling.includes(this.ppsta_id);
        },

        clearFields() {
            this.mas = '';
            this.mrbs = '';
            this.nmrbs = '';
            this.loan_amortization = '';
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