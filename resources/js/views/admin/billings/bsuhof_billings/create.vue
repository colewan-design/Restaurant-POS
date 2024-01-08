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

                     
                    <v-autocomplete
                        variant="solo"
                        label="Classification"
                        v-model="classification"
                        :items="classifications.map(item => item.name)"
                        search-input
                    ></v-autocomplete>

                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="floor_area"
                        label="Floor Area"
                        :rules="[
                            v => !!v || 'Floor Area is required'
                        ]"
                     hint="sq m"
                    ></v-text-field>
                    
                    <v-text-field
                        type="number"
                        variant="solo"
                        v-model="lot_area"
                        label="Lot Area"
                        :rules="[
                            v => !!v || 'Lot Area is required'
                        ]"
                               hint="sq m"
                    ></v-text-field>

                    <v-text-field
                        type="number"
                        prefix="₱"
                        variant="solo"
                        v-model="lot_rental"
                        label="Lot Rental"
                        :rules="[
                            v => !!v || 'Lot Rental is required'
                        ]"
                        hint="P/mo"
                    ></v-text-field>

                    <v-text-field
                        type="number"
                        prefix="₱"
                        variant="solo"
                        v-model="house_rental"
                        label="House Rental"
                        :rules="[
                            v => !!v || 'House Rental is required'
                        ]"
                        hint="P/mo"
                    ></v-text-field>

                    <v-text-field
                        type="number"
                        prefix="₱"
                        variant="solo"
                        v-model="monthly_occupancy_fee"
                        label="Monthly Occupancy Fee"
                        :rules="[
                            v => !!v || 'Monthly Occupancy Fee is required'
                        ]"
                         hint="Lot + House Rental"
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
                  <router-link to="/admin/bsuhof_billings/">
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
            selected_employee: '', // Add this line
                fetched_employee_names: [],
                employee_name: '',
                employee_id: '',
                classification: '',
                floor_area: '',
                lot_area: '',
                lot_rental: '',
                house_rental: '',
                monthly_occupancy_fee: '',
                remarks: '',
                employees: [],
                existingBsuhofBilling: [],
                classifications: [
                    {
                       name: 'University Built'
                    },
                    {
                       name: 'Employee Built'
                    }
                ],
            
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

          
                try {
                    const formData = {
                        classification: this.classification,
                        floor_area: this.floor_area,
                        employee_id: selectedEmployee.employee_id,
                        lot_area: this.lot_area,
                        lot_rental: this.lot_rental,
                        house_rental: this.house_rental,
                        monthly_occupancy_fee: this.monthly_occupancy_fee,
                        remarks: this.remarks

                    };

                    const response = await fetch('/api/bsuhof_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.bsuhof_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
           
        },
      
        clearFields() {
            employee_name= '',
                classification= '',
                floor_area= '',
                lot_area= '',
                lot_rental= '',
                house_rental= '',
                monthly_occupancy_fee= '',
                remarks= '';
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