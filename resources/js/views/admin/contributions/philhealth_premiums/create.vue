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
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/philhealth_premiums/">
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
        this.getEmployees(); 
    },

    methods: {
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
                        gs: this.gs,
                        es: this.es,
                        percov: this.percov,
                        remarks: this.remarks,
                        ps: this.ps,
                        philhealth_number: this.philhealth_number,
                        status: this.status,
                        user_id: userId,

                    };

                    const response = await fetch('/api/philhealth_premiums/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'contributions.philhealth_premiums.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('philhealth Premium is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingPhilhealthPremium.includes(this.philhealth_premium_id);
        },

        clearFields() {
            this.ps = '';
            this.es = '';
            this.status = '';
            this.philhealth_number = '';
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