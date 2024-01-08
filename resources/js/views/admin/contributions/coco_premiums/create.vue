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
                                v-model="premiums"
                                label="Premiums"
                                :rules="[
                                    v => !!v || 'Premiums is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="premium_appears"
                                label="premium_appears"
                                :rules="[
                                    v => !!v || 'Premium Appears is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="loan"
                                label="Loan"
                                :rules="[
                                    v => !!v || 'Loan is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                type="number"
                                variant="solo"
                                v-model="penalty"
                                label="Penalty"
                                :rules="[
                                    v => !!v || 'Penalty is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="totals"
                        label="Totals"
                        :rules="[
                            v => !!v || 'Totals is required'
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
                  <router-link to="/admin/coco_premiums/">
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
            loan: '',
            penalty: '',
            premium_appears: '',
            premiums: '',
            remarks: '',
            totals: '',
            employees: [],
            existingCocoPremium: [],
            
        };
    },
    watch: {
        premiums: "calculateTotals",
        premium_appears: "calculateTotals",
        loan: "calculateTotals",
        penalty: "calculateTotals",
    },
    created() {
        this.getEmployees(); 
    },

    methods: {
        calculateTotals() {
        // Convert the input values to numbers and sum them
        const sum =
            parseFloat(this.premiums || 0) +
            parseFloat(this.premium_appears || 0) +
            parseFloat(this.loan || 0) +
            parseFloat(this.penalty || 0);

        // Set the sum as the value of the totals input field
        this.totals = isNaN(sum) ? "" : sum.toString();
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
                        loan: this.loan,
                        penalty: this.penalty,
                        remarks: this.remarks,
                        premium_appears: this.premium_appears,
                        premiums: this.premiums,
                        totals: this.totals,
                        user_id: userId,

                    };

                    const response = await fetch('/api/coco_premiums/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'contributions.coco_premiums.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('COCO Premium is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingCocoPremium.includes(this.coco_premium_id);
        },

        clearFields() {
            this.loan = '';
            this.penalty = '';
            this.totals = '';
            this.premium_appears = '';
            this.premiums = '';
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