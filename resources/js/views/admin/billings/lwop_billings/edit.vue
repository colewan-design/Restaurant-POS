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
                        type="date"
                        variant="solo"
                        v-model="selectedDate"
                        label="Dates"
                        @change="updateSelectedDates"
                    ></v-text-field>
                    <v-chip
                    variant="elevated"
                    color="green-lighten-1"
                        v-for="(date, index) in selectedDates"
                        :key="index"
                        @click="removeDate(index)"
                        class="ma-2"
                        >
                        {{ formatDate(date) }}
                        <v-icon small>mdi-close</v-icon>
                    </v-chip>
                    

                    <v-text-field
                        variant="solo"
                        v-model="days_number"
                        label="Number of Days"
                        :rules="[
                            v => !!v || 'Number of Days is required',
                            v => /^\d+$/.test(v) || 'Must be a valid integer' 
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
                        @click="handleUpdate"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/lwop_billings/">
                  <v-btn class="mt-2" color="red-darken-3">Cancel</v-btn>
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
        selectedDates: [],
            selectedDate: null,
            selected_employee: '', 
            fetched_employee_names: [],
            employee_name: '',
            employee_id: '',
            dates_incurred: '',
            days_number: '',
            remarks: '',
            employees: [],
            existingLwopBilling: [],
    };
  },
  created() {
    this.fetchExistingLwopBillings();
    this.getEmployees(); 
  },
 
  methods: {
        removeDate(index) {
            // Remove the selected date at the given index
            this.selectedDates.splice(index, 1);
        },
        formatDate(date) {
            // Format the date as needed (you may customize this based on your preference)
            const formattedDate = new Date(date).toLocaleDateString();
            return formattedDate;
        },
        updateSelectedDates() {
            if (this.selectedDate) {
                this.selectedDates.push(this.selectedDate);
                // console.log(this.selectedDates);
            }
        },
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
        async fetchExistingLwopBillings() {
        try {
            const lwop_billing_id = this.$route.params.id;
            const response = await axios.get(`/api/lwop_billings/edit/${lwop_billing_id}`);

            if (response.status === 200) {
                const lwop_billing = response.data;

                this.selected_employee = response.data.employee_name;

                // Parse the JSON string into an array
                this.selectedDates = JSON.parse(lwop_billing.dates_incurred);

                this.days_number = lwop_billing.days_number;
                this.remarks = lwop_billing.remarks;

                console.log(this.selectedDates);
            } else {
                console.error('Failed to fetch existing lwop_billings.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const lwop_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    dates_incurred: this.selectedDates,
                    days_number: this.days_number,
                    remarks: this.remarks,
                };

                const response = await axios.post(`/api/lwop_billings/update/${lwop_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/lwop_billings', query: { showSuccessEditDialog: 'true' } });
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