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
                        @click="handleSubmit"
                        :disabled="isDuplicate || !project_name.trim()"
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
            project_name: '',
            existingProjects: [],
        };
    },

    computed: {
        isDuplicate() {
            return this.existingProjects.includes(this.project_name.trim());
        },
    },

    methods: {
        async fetchExistingProjects() {
            try {
                const response = await fetch('/api/lib_projects');

                if (response.ok) {
                    const projects = await response.json();
                    this.existingProjects = projects.map(project => project.project_name);
                } else {
                    console.error('Failed to fetch existing projects.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            await this.fetchExistingProjects();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        project_name: this.project_name,
                    };

                    const response = await fetch('/api/lib_projects/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'projects.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the project name is a duplicate
                console.log('Project name is a duplicate.');
            }
        },

        clearFields() {
            this.project_name = '';
        },
    },

    created() {
        this.fetchExistingProjects();
    },
};
</script>
