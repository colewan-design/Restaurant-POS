<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
       
            <v-sheet width="1200" class="mt-2 mx-auto p-2">
                <v-form @submit.prevent>
                    <v-autocomplete
                        variant="solo"
                        label="Employee"
                        v-model="selected_employee"
                        :items="fetched_employee_name"
                        item-text="employee_name"
                        item-value="employee_id"
                        search-input
                    ></v-autocomplete>

                    <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="total_disallowances"
                        label="Total Disallowance"
                        :rules="[
                            v => !!v || 'Total Disallowance is required',
                            v => /^\d+(\.\d+)?$/.test(v) || 'Total Disallowance must be a valid number'
                        ]"
                    ></v-text-field>
                   
                    <v-text-field
                    prefix="₱"
                        variant="solo"
                        v-model="total_payments"
                        label="Total Payments"
                        :rules="[
                            v => !!v || 'Total Payments is required',
                            v => /^\d+(\.\d+)?$/.test(v) || 'Total Payments must be a valid number'
                        ]"
                    ></v-text-field>

                    <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="total_balance"
                        label="Total Balance"
                        :rules="[
                            v => !!v || 'Total Balance is required',
                            v => /^\d+(\.\d+)?$/.test(v) || 'Total Balance must be a valid number'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        prefix="₱"
                        variant="solo"
                        v-model="amount_due"
                        label="Amount Due"
                        :rules="[
                            v => !!v || 'Amount Due is required',
                            v => /^\d+(\.\d+)?$/.test(v) || 'Amount Due must be a valid number'
                        ]"
                    ></v-text-field>
               
                    <v-row>
                        <v-col cols="12" class="ms-auto"> Payroll period </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-autocomplete
                                v-model="selectedYear"
                                variant="solo"
                                label="Year"
                                :items="getYears()"
                                search-input
                            ></v-autocomplete>
                        </v-col>

                        <v-col cols="6">
                            <v-autocomplete
                                v-model="selectedMonth"
                                :items="getMonths()"
                                variant="solo"
                                label="Month"
                                search-input
                            ></v-autocomplete>
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
                    <v-text-field
                        variant="solo"
                        v-model="prepared_by"
                        label="Prepared By"
                        :rules="[
                            v => !!v || 'Prepared By period is required'
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
                    <v-btn class="mt-2" color="gray" @click="clearFields">Clear</v-btn>
                </v-form>


            </v-sheet>
 
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            years: [],
            months: [
            { name: 'January' },
            { name: 'February' },
            { name: 'March' },
            { name: 'April' },
            { name: 'May' },
            { name: 'June' },
            { name: 'July' },
            { name: 'August' },
            { name: 'September' },
            { name: 'October' },
            { name: 'November' },
            { name: 'December' }
            ],

            fetched_months: '',
            fetched_employee_name: '',
            selected_employee: null,
            employees: [],
            employee_id: null,
            total_disallowances: '',
            total_payments: '',
            total_balance: '',
            amount_due: '',
            payroll_period: '',
            remarks: '',
            prepared_by: '',
            selectedMonth: this.getCurrentMonth(),
            selectedYear: ['2023'],
        };
    },
    created() {
        this.getEmployees(); 
    },


    methods: {
        getCurrentMonth() {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const currentMonthIndex = new Date().getMonth();
            return months[currentMonthIndex];
        },
        getYears() {
        if (this.years.length === 0) {
            const currentYear = new Date().getFullYear();
            for (let i = currentYear; i >= currentYear - 10; i--) {
            this.years.push(i.toString());
            }
        }
        return this.years;
        },

        getMonths() {
            this.fetched_months = this.months.map(month => month.name);
            return this.fetched_months
        },
        getEmployees() {
            axios.get('/api/employees_lib')
                .then((response) => {
                    this.employees = response.data;
                    this.fetched_employee_name = this.employees.map(employee => employee.employee_name);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async handleSubmit() {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);

                // Concatenate selectedMonth and selectedYear into payroll_period
                const payroll_period = `${this.selectedMonth} ${String(this.selectedYear).padStart(2, '0')}`;

                const response = await axios.post('/api/disallowance_deductions/create', {
                    employee_id: selectedEmployee.employee_id,
                    total_disallowances: this.total_disallowances,
                    total_payments: this.total_payments,
                    total_balance: this.total_balance,
                    amount_due: this.amount_due,
                    payroll_period: payroll_period, // Use the concatenated value
                    remarks: this.remarks,
                    prepared_by: this.prepared_by,
                    selectedMonth: this.selectedMonth,
                    selectedYear: this.selectedYear,
                });

                // Handle the response as needed
                console.log(response.data);
                this.clearFields();
                this.$router.push({ name: 'admin.obligations.disallowance.index', query: { showSuccessDialog: 'true' } });

            } catch (error) {
                console.error(error);
                // Handle errors if needed
            }
        },




        clearFields() {
            this.selectedYear= '',
            this.selectedMonth= '',
            this.total_disallowances= '',
            this.total_payments= '',
            this.total_balance= '',
            this.amount_due= '',
            this.payroll_period= '',
            this.remarks= '',
            this.prepared_by= ''
        },
    },

  
};
</script>
