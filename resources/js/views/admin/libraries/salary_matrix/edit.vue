<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
   <v-container>
 
        <v-row>
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
                        @click="handleUpdate"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/salary_matrix">
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
      salary_amount: '',
      salary_grade: '',
      salary_step: '',
    };
  },
  created() {
    this.fetchSalaryMatrixData();
  },
  methods: {
    async fetchSalaryMatrixData() {
        try {
            const salary_matrixId = this.$route.params.id;

            const response = await axios.get(`/api/salary_matrix/edit/${salary_matrixId}`);

            
            this.salary_amount = response.data.salary_amount;
            this.salary_grade = response.data.salary_grade;
            this.salary_step = response.data.salary_step;
          
        } catch (error) {
            console.error('Error fetching salary matrix details:', error);
        }
        },

        async handleUpdate() {
            try {
                const salary_matrixId = this.$route.params.id;
                const formData = {
                    salary_amount: this.salary_amount,
                    salary_grade: this.salary_grade,
                    salary_step: this.salary_step,
                };

                const response = await axios.post(`/api/salary_matrix/update/${salary_matrixId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/salary_matrix', query: { showSuccessEditDialog: 'true' } });
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