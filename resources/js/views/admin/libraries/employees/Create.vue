<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
   <v-container>
 
        <v-row>
            <v-sheet width="1200" class="mt-2 mx-auto p-2">
                <v-form @submit.prevent>
                    
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

                <v-text-field variant="solo"
                    v-model="gsis_bp_number"
                    label="GSIS BP Number"
                ></v-text-field>

                <v-btn type="submit" class="mt-2 mr-2" @click="handleSubmit" color="teal">Submit</v-btn>
                <v-btn class="mt-2" color="gray">clear</v-btn>
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
            middle_name: '',
            last_name: '',
            email_address: '',
            salary_grade: '',
            step: '',
            place_of_assignment: '',
            fetched_position_name: '',
            selected_position: null,
         
        };
    },
    created() {
    this.getPositions(); 
},

    methods: {
        getPositions() {
        axios.get('/api/positions')
            .then((response) => {
            if (Array.isArray(response.data)) {
                this.positions = response.data;
                this.fetched_position_name = this.positions.map(position => position.position_name);
            } else {
                console.error('Invalid response format: ', response.data);
            }
            })
            .catch((error) => {
            console.error(error);
            });
        },


        async handleSubmit() {
            try {
                const formData = {
                    employee_id: this.employee_id,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    middle_name: this.middle_name,
                    email_address: this.email_address,
                    salary_grade: this.salary_grade,
                    step: this.step,
                    position: this.selected_position,
                    gsis_bp_number: this.gsis_bp_number,
                    place_of_assignment: this.place_of_assignment,
                };

                const response = await fetch('/api/employees_lib/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Handle success (maybe show a message)
                    console.log('Data inserted successfully!');
                    this.$router.push({ path: '/admin/employee', query: { showSuccessDialog: 'true' } });
                } else {
                    // Handle errors
                    console.error('Failed to insert data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
   
};
</script>

