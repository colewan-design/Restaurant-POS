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
                        v-model="position_name"
                        label="Position"
                        :rules="[
                            v => !!v || 'position name is required'
                        ]"
                    ></v-text-field>
                    <v-autocomplete
                        variant="solo"
                        label="Project"
                        v-model="selected_project"
                        :items="fetched_project_name"
                        item-text="project_name"
                        item-value="project_id"  
                        search-input
                    ></v-autocomplete>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                    <router-link to="/libraries/positions">
                        <v-btn class="mt-2" color="red-darken-1">Cancel</v-btn>
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
      fetched_project_name: '',
      selected_project: null,
      position_name: '',
      project_id: '',
    };
  },
  created() {
    this.fetchPositions();
    this.getProjects(); 
  },
  methods: {
    getProjects() {
            axios.get('/api/lib_projects')
                .then((response) => {
                    this.projects = response.data;
                    this.fetched_project_name = this.projects.map(project => project.project_name);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    async fetchPositions() {
        try {
            const positionId = this.$route.params.id;
            const response = await axios.get(`/api/positions/edit/${positionId}`);
            this.selected_project = response.data.project_name;

            this.position_name = response.data.position_name;
            this.project_id = response.data.project_id;
          
        } catch (error) {
            console.error('Error fetching position details:', error);
        }
        },

        async handleUpdate() {
            try {
                const selected_project = this.projects.find(project => project.project_name === this.selected_project);
              
                const positionId = this.$route.params.id;
                const formData = {
                    position_name: this.position_name,
                    project_id: selected_project.project_id,
                };

                const response = await axios.post(`/api/positions/update/${positionId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    
                    this.$router.push({ path: '/libraries/positions', query: { showSuccessEditDialog: 'true' } });
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

