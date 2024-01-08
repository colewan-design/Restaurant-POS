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
                        item-text="position_name"
                        item-value="id"  
                        search-input
                    ></v-autocomplete>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit"
                        :disabled="isDuplicate || !position_name.trim()"
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
            fetched_project_name: '',
            selected_project: null,
            position_name: '',
            project_id: '',
            existingPosition: [],
        };
    },
    created() {
        this.fetchExistingPositions();
        this.getProjects(); 
    },

    computed: {
        isDuplicate() {
            return this.existingPosition.includes(this.position_name.trim());
        },
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
        async fetchExistingPositions() {
            try {
                const response = await fetch('/api/positions');

                if (response.ok) {
                    const positions = await response.json();
                    this.existingpositions = positions.map(position => position.position_name);
                } else {
                    console.error('Failed to fetch existing positions.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async fetchExistingPositions() {
            try {
                const response = await fetch('/api/positions');

                if (response.ok) {
                    const positions = await response.json();
                    this.existingpositions = positions.map(position => position.position_name);
                } else {
                    console.error('Failed to fetch existing positions.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            await this.fetchExistingPositions();

            if (!this.isDuplicate) {
                try {
                    const selected_project = this.projects.find(project => project.project_name === this.selected_project);
                    const formData = {
                        position_name: this.position_name,
                        selected_project: selected_project.project_id,
                    };

                    const response = await fetch('/api/positions/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'libraries.positions.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('position is a duplicate.');
            }
        },

        clearFields() {
            this.position_name = '';
            this.incentives = '';
        },
    },

 
};
</script>
