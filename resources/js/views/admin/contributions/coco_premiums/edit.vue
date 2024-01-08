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
                                label="Premium Appears"
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
                        <v-col cols="6">
                            <v-text-field
                            type="number"
                                variant="solo"
                                v-model="totals"
                                label="Totals"
                                :rules="[
                                    v => !!v || 'Totals is required'
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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/coco_premiums/">
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
        selected_employee: '', 
        fetched_employee_names: [],
        employee_name: '',
        employee_id: '',
        premiums: '',
        premium_appears: '',
        loan: '',
        totals: '',
        penalty: '',
        remarks: '',
        employees: [],
        existingCocoBilling: [],
    };
  },
  watch: {
        premiums: "calculateTotals",
        premium_appears: "calculateTotals",
        loan: "calculateTotals",
        penalty: "calculateTotals",
    },
  created() {
    this.fetchExistingCocoPremiums();
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
        async fetchExistingCocoPremiums() {
            try {
                const coco_premium_id = this.$route.params.id;
                const response = await axios.get(`/api/coco_premiums/edit/${coco_premium_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const coco_premium = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = coco_premium.employee_name;
                    this.premiums = coco_premium.premiums;
                    this.premium_appears = coco_premium.premium_appears;
                    this.loan = coco_premium.loan;
                    this.penalty = coco_premium.penalty;
                    this.totals = coco_premium.totals;
                    this.remarks = coco_premium.remarks;
                 
                   

                } else {
                    console.error('Failed to fetch existing coco_premiums.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const coco_premium_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,
                    premiums: this.premiums,
                    premium_appears: this.premium_appears,
                    loan: this.loan,
                    penalty: this.penalty,
                    totals: this.totals,
                  
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/coco_premiums/update/${coco_premium_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/coco_premiums', query: { showSuccessEditDialog: 'true' } });
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