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
                        v-model="selected_classification"
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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/bsuhof_billings/">
                  <v-btn class="mt-2" color="red-darken-3">Cancel</v-btn>
                </router-link>
              </v-form>

            </v-sheet>
        </v-row>
   </v-container>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script>

<script>
export default {
  data() {
    return { 
        selected_employee: '', // Add this line
        fetched_employee_names: [],
        employee_name: '',
        employee_id: '',
        classification: '',
        selected_classification:'',
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
    this.fetchExistingBsuhofBillings();
    this.getEmployees(); 
  },
 
  methods: {
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
        async fetchExistingBsuhofBillings() {
            try {
                const bsuhof_billing_id = this.$route.params.id;
                const response = await axios.get(`/api/bsuhof_billings/edit/${bsuhof_billing_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const bsuhof_billing = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;
                    this.selected_classification = bsuhof_billing.classification;
                    this.floor_area = bsuhof_billing.floor_area;
                    this.lot_area = response.data.lot_area;
                    this.lot_rental = response.data.lot_rental;
                    this.house_rental = bsuhof_billing.house_rental;
                    this.monthly_occupancy_fee = bsuhof_billing.monthly_occupancy_fee;
                    this.remarks = bsuhof_billing.remarks;
                   

                } else {
                    console.error('Failed to fetch existing bsuhof_billings.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const bsuhof_billing_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    selected_classification: this.selected_classification,
                    floor_area: this.floor_area,
                    lot_area: this.lot_area,
                    lot_rental: this.lot_rental,
                    house_rental: this.house_rental,
                    monthly_occupancy_fee: this.monthly_occupancy_fee,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/bsuhof_billings/update/${bsuhof_billing_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/bsuhof_billings', query: { showSuccessEditDialog: 'true' } });
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