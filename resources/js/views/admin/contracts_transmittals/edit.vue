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
                        variant="solo"
                        v-model="subject"
                        label="Subject"
                        :rules="[
                            v => !!v || 'Subject is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        variant="solo"
                        v-model="purpose"
                        label="Purpose"
                        :rules="[
                            v => !!v || 'Purpose is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        variant="solo"
                        v-model="sent_by"
                        label="Sent By"
                        :rules="[
                            v => !!v || 'Sent By is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        variant="solo"
                        v-model="signed_by"
                        label="Signed By"
                        :rules="[
                            v => !!v || 'Signed By is required'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        type="date"
                        variant="solo"
                        v-model="received_date"
                        label="Recived Date"
                        :rules="[
                            v => !!v || 'Recived Date is required'
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
                <router-link to="/admin/contracts_transmittals/">
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
            received_date: '',
            subject: '',
            remarks: '',
            purpose: '',
            sent_by: '',
            signed_by: '',
            received_date: '',
            employees: [],
            existingWholdingBilling: [],
    };
  },
  created() {
    this.fetchExistingWholdingBillings();
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
        async fetchExistingWholdingBillings() {
        try {
            const contract_transmittal_id = this.$route.params.id;
            const response = await axios.get(`/api/contracts_transmittals/edit/${contract_transmittal_id}`);

            if (response.status === 200) {
                const contract_transmittal_data = response.data;

                this.selected_employee = response.data.employee_name;

                this.received_date = contract_transmittal_data.received_date;
                this.purpose = contract_transmittal_data.purpose;
                this.subject = contract_transmittal_data.subject;
                this.sent_by = contract_transmittal_data.sent_by;
                this.signed_by = contract_transmittal_data.signed_by;
                this.remarks = contract_transmittal_data.remarks;

                console.log(this.selectedDates);
            } else {
                console.error('Failed to fetch existing contracts_transmittals.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },


        async handleUpdate() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const contract_transmittal_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    received_date: this.received_date,
                    subject: this.subject,
                    remarks: this.remarks,
                    purpose: this.purpose,
                    signed_by: this.signed_by,
                    sent_by: this.sent_by,
                };

                const response = await axios.post(`/api/contracts_transmittals/update/${contract_transmittal_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/contracts_transmittals', query: { showSuccessEditDialog: 'true' } });
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