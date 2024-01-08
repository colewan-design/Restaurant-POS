<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
        <v-row>
            <v-dialog v-model="errorSnackbar">
                <v-card width="600" class="mx-auto" color="red">
                    <v-card-title>Error!</v-card-title>
                    <v-card-text>Failed to insert data.</v-card-text>
                    <v-card-actions>
                    <v-btn @click="errorSnackbar = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-sheet width="1200" class="mt-2 mx-auto p-2">
                <v-form @submit.prevent>
                    <v-text-field
                        variant="solo"
                        v-model="salary_grade"
                        label="Salary Grade"
                        :rules="[
                            v => !!v || 'Salary Grade is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="salary_step"
                        label="Step"
                        :rules="[
                            v => !!v || 'Step is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="salary_amount"
                        label="Salary Amount"
                        :rules="[
                            v => !!v || 'Salary Amount is required'
                        ]"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit"
                        :disabled="isDuplicate || !salary_grade.trim()"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                    <v-btn class="mt-2" color="gray" @click="clearFields">Clear</v-btn>
                </v-form>
            </v-sheet>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            errorSnackbar: false,
            errorMessage: '',
            salary_grade: '',
            salary_amount: '',
            salary_step: '',
            existingSalaryMatrixData: [],
        };
    },

    computed: {
        isDuplicate() {
            return this.existingSalaryMatrixData.some(salaryMatrix => 
                salaryMatrix.salary_grade === this.salary_grade.trim() &&
                salaryMatrix.salary_step === this.salary_step.trim()
            );
        },
    },

    methods: {
        async fetchExistingSalaryMatrixData() {
            try {
                const response = await fetch('/api/salary_matrix');

                if (response.ok) {
                    const salary_matrix_data = await response.json();
                    this.existingSalaryMatrixData = salary_matrix_data.map(salary_matrix => ({
                        salary_grade: salary_matrix.salary_grade,
                        salary_step: salary_matrix.salary_step,
                    }));
                } else {
                    console.error('Failed to fetch existing salary matrix data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleSubmit() {
            try {
                await this.fetchExistingSalaryMatrixData();

                if (!this.isDuplicate) {
                    const formData = {
                        salary_grade: this.salary_grade,
                        salary_step: this.salary_step,
                        salary_amount: this.salary_amount,
                    };

                    const response = await fetch('/api/salary_matrix/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'salary_matrix.index', query: { showSuccessDialog: 'true' } });
                        this.clearFields();
                    } else {
                        console.error('Failed to insert data.');
                        this.showErrorSnackbar('Failed to insert data.');
                    }
                } else {
                    console.log('Salary Matrix Record is a duplicate.');
                    this.showErrorSnackbar('Salary Matrix Record is a duplicate.');
                }
            } catch (error) {
                console.error('Error:', error);
                this.showErrorSnackbar('An error occurred: ' + error.message);
            }
        },
        showErrorSnackbar(message) {
            this.errorMessage = message;
            this.errorSnackbar = true;
        },


        clearFields() {
            this.salary_grade = '';
            this.salary_amount = '';
            this.salary_step = '';
        },
    },

    created() {
        this.fetchExistingSalaryMatrixData();
    },
};
</script>
