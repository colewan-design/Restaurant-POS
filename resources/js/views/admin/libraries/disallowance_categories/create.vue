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
                        v-model="name"
                        label="Name"
                        :rules="[
                            v => !!v || 'name is required'
                        ]"
                    ></v-text-field>
                   
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit"
                        :disabled="isDuplicate || !name.trim()"
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
            name: '',
            existingDisallowanceCategory: [],
        };
    },

    computed: {
        isDuplicate() {
            return this.existingDisallowanceCategory.includes(this.name.trim());
        },
    },

    methods: {
        async fetchExistingDisallowanceCategories() {
            try {
                const response = await fetch('/api/disallowance_categories');

                if (response.ok) {
                    const disallowance_categories = await response.json();
                    this.existingDisallowanceCategories = disallowance_categories.map(disallowance_category => disallowance_category.name);
                } else {
                    console.error('Failed to fetch existing disallowance category.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            await this.fetchExistingDisallowanceCategories();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        name: this.name,
                    };

                    const response = await fetch('/api/disallowance_categories/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'libraries.disallowance_categories.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the name is a duplicate
                console.log('Disallowance category is a duplicate.');
            }
        },

        clearFields() {
            this.name = '';
        },
    },

    created() {
        this.fetchExistingDisallowanceCategories();
    },
};
</script>
