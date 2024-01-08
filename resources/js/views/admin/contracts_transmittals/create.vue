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
                        @click="handleSubmit"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/contracts_transmittals/">
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
            selectedDates: [],
            selectedDate: null,
            selected_employee: '', 
            fetched_employee_names: [],
            employee_name: '',
            employee_id: '',
            subject: '',
            purpose: '',
            sent_by: '',
            signed_by: '',
            received_date: '',
            remarks: '',
            employees: [],
        };
    },
    created() {
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
                    console.log(this.selectedDates);
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
      

        async handleSubmit() {
            const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);

          
                try {
                    const formData = {
                        employee_id: selectedEmployee.employee_id,
                        subject: this.subject,
                        purpose: this.purpose,
                        remarks: this.remarks,

                        sent_by: this.sent_by,
                        signed_by: this.signed_by,
                        received_date: this.received_date
                    };

                    const response = await fetch('/api/contracts_transmittals/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'contracts_transmittals.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
           
        },
       
        

        clearFields() {
            this.subject = '';
            this.purpose = '';
            this.remarks = '';

            this.sent_by = '';
            this.signed_by = '';
            this.received_date = '';
        },
    },
};
</script>
