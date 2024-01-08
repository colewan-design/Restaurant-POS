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
                        clearable
                    ></v-autocomplete>

                    <v-text-field
                        variant="solo"
                        v-model="amount"
                        label="Amount"
                        :rules="[
                            v => !!v || 'Amount is required'
                        ]"
                    ></v-text-field>
                     
                    <v-text-field
                        @input="filterGroups"
                        @click="expand = !expand"
                        variant="solo"
                        v-model="group"
                        label="Group"
                    ></v-text-field>
                    <v-row style="padding-bottom: 1rem;">
                        <v-col class="shrink">
                        <v-expand-transition>
                            <v-card v-if="expand" class="v-scroll-y" max-height="300" width="500" style="overflow-y: auto;">
                            <v-list>
                                <v-list-item-group v-if="expand">
                                    <v-list-item v-for="(group, index) in filteredGroups" :key="index" @click="selectGroup(group.title)">
                                    <v-container>
                                        <v-row>
                                        <v-col cols="12">
                                            <chips>{{ group.title }}</chips>
                                        </v-col>
                                        </v-row>
                                    </v-container>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                            </v-card>
                        </v-expand-transition>
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
                  <router-link to="/admin/withholding_tax_billings/">
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
            expand: false,
            expand2: false,
            selected_employee: null, 
            fetched_employee_names: [],
            fetched_groups: [],
            employee_name: '',
            employee_id: '',
            group: '',
            amount: '',
            remarks: '',
            employees: [],
            existingWithholdingTaxBilling: [],
            
        };
    },
    created() {
        this.getGroups(); 
        this.getEmployees(); 
    },
    computed: {
        filteredGroups() {
        const lowercaseGroup = this.group.toLowerCase();
        return this.fetched_groups.data.filter(group => group.title.toLowerCase().includes(lowercaseGroup));
        },
    },


    methods: {
        selectGroup(selectedMonth) {
        this.group = selectedMonth;
        this.expand = false; 
        },
        filterGroups() {
            this.expand = true;
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

        async getGroups() {
            try {
                const response = await axios.get('/api/withholding_tax_group');
                this.fetched_groups = response.data; 
                console.log(this.fetched_groups.data);

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
                        group: this.group,
                        amount: this.amount,
                        remarks: this.remarks,
                        user_id: userId,

                    };

                    const response = await fetch('/api/withholding_tax_billings/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'billings.withholding_tax_billings.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                console.log('withholding_tax_billing is a duplicate.');
            }
        },

        isDuplicate() {
            return this.existingWithholdingTaxBilling.includes(this.withholding_tax_id);
        },

        clearFields() {
            this.group = '';
            this.amount = '';
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