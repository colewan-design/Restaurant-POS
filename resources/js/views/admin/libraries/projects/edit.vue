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
                        v-model="project_name"
                        label="Project Name"
                        :rules="[
                            v => !!v || 'Project name is required'
                        ]"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate"
                        :disabled="isDuplicate || !project_name.trim()"
                        color="teal"
                    >
                        Update
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
      project_name: '',
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
        try {
            const projectId = this.$route.params.id;

            const response = await axios.get(`/api/lib_projects/edit/${projectId}`);

            // Populate the form fields with the fetched employee data
            this.project_name = response.data.project_name;
          
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
        },

        async handleUpdate() {
            try {
                const projectId = this.$route.params.id;
                const formData = {
                    project_name: this.project_name,
                };

                const response = await axios.post(`/api/lib_projects/update/${projectId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/projects', query: { showSuccessEditDialog: 'true' } });
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