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
                        v-model="title"
                        label="Title"
                        :rules="[
                            v => !!v || 'Title name is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="details"
                        label="Details"
                        :rules="[
                            v => !!v || 'Details name is required'
                        ]"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit"
                        :disabled="isDuplicate || !title.trim()"
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
            title: '',
            details: '',
            existingCompensation: [],
        };
    },

    computed: {
        isDuplicate() {
            return this.existingCompensation.includes(this.title.trim());
        },
    },

    methods: {
        async fetchExistingCompensations() {
            try {
                const response = await fetch('/api/compensations');

                if (response.ok) {
                    const compensations = await response.json();
                    this.existingCompensations = compensations.map(compensation => compensation.title);
                } else {
                    console.error('Failed to fetch existing projects.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            await this.fetchExistingCompensations();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        title: this.title,
                        details: this.details,
                    };

                    const response = await fetch('/api/compensations/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'admin.libraries.compensations.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('Compensation is a duplicate.');
            }
        },

        clearFields() {
            this.title = '';
            this.details = '';
        },
    },

    created() {
        this.fetchExistingCompensations();
    },
};
</script>
