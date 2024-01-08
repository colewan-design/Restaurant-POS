<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
   <v-container>
 
        <v-row>
            <v-sheet width="1200" class="mt-2 mx-auto p-2">
                <v-form @submit.prevent>
                <v-text-field variant="solo"
                    v-model="gsis_bp_number"
                    label="GSIS BP Number"
                    :rules="[
                        v => !!v || 'GSIS BP Number is required'
                    ]"
                ></v-text-field>
            
                <v-text-field variant="solo"
                    v-model="first_name"
                    label="First Name"
                    :rules="[
                        v => !!v || 'First name is required'
                    ]"
                ></v-text-field>

                <v-text-field variant="solo"
                    v-model="middle_name"
                    label="Middle Name"
                    :rules="[
                        v => !!v || 'Middle name is required'
                    ]"
                ></v-text-field>

                <v-text-field variant="solo"
                    v-model="last_name"
                    label="Last Name"
                    :rules="[
                        v => !!v || 'Last name is required'
                    ]"
                ></v-text-field>

                <v-text-field variant="solo"
                    v-model="employee_id"
                    label="Employee ID"
                    :rules="[
                        v => !!v || 'Employee ID is required',
                        v => /^\d+$/.test(v) || 'Employee ID must be an integer'
                    ]"
                ></v-text-field>
                <v-text-field variant="solo"
                    v-model="email_address"
                    label="Email Address"
                    :rules="[
                        v => !!v || 'Email address is required',
                        v => /.+@.+\..+/.test(v) || 'Email must be valid'
                    ]"
                ></v-text-field>

                
                <v-text-field variant="solo"
                    v-model="salary_grade"
                    label="Salary Grade"
                    :rules="[
                        v => !!v || 'Salary grade is required',
                        v => /^\d+$/.test(v) || 'Salary grade must be an integer'
                    ]"
                ></v-text-field>

                <v-text-field variant="solo"
                    v-model="step"
                    label="Step"
                    :rules="[
                        v => !!v || 'Step is required',
                        v => /^\d+$/.test(v) || 'Step must be an integer'
                    ]"
                ></v-text-field>
               
                <v-autocomplete
                    variant="solo"
                    label="Position"
                    v-model="selected_position"
                    :items="fetched_position_name"
                    item-text="position_name"
                    item-value="id"  
                    search-input
                ></v-autocomplete>

                <v-text-field variant="solo"
                    v-model="place_of_assignment"
                    label="Assigned Office"
                ></v-text-field>
                
                    <v-btn type="submit" class="mt-2 mr-2" @click="handleUpdate" color="teal">Update</v-btn>
          
                    <router-link to="/admin/employee">
                        <v-btn class="mt-2" color="red-darken-3">cancel</v-btn>
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
            employee_id: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            email_address: '',
            salary_grade: '',
            step: '',
            place_of_assignment: '',
            gsis_bp_number: '',
            fetched_position_name: '',
            selected_position: null,
        };
    },
    created() {
    this.getPositions(); 
    this.fetchEmployeeDetails();
},

    methods: {
        async fetchEmployeeDetails() {
        try {
            const employeeId = this.$route.params.id;

            const response = await axios.get(`/api/get-employee-details/${employeeId}`);

            // Populate the form fields with the fetched employee data
            this.employee_id = response.data.employee_id;
            this.first_name = response.data.first_name;
            this.last_name = response.data.last_name;
            this.middle_name = response.data.middle_name;
            this.email_address = response.data.email_address;
            this.salary_grade = response.data.salary_grade;
            this.step = response.data.step;
            this.place_of_assignment = response.data.place_of_assignment;
            this.selected_position = response.data.position; 
            this.gsis_bp_number = response.data.gsis_bp_number; 
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
        },
        getPositions() {
            axios.get('/api/positions_lib/get-list')
                .then((response) => {
                    this.positions = response.data;
                    this.fetched_position_name = this.positions.map(position => position.position_name);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async handleUpdate() {
            try {
                const employeeId = this.$route.params.id;
                const formData = {
                    gsis_bp_number: this.gsis_bp_number,
                    employee_id: this.employee_id,
                    first_name: this.first_name,
                    middle_name: this.middle_name,
                    last_name: this.last_name,
                    email_address: this.email_address,
                    salary_grade: this.salary_grade,
                    step: this.step,
                    position: this.selected_position,
                    place_of_assignment: this.place_of_assignment,
                };

                const response = await axios.post(`/api/employees_lib/update/${employeeId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/employee', query: { showSuccessEditDialog: 'true' } });
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

