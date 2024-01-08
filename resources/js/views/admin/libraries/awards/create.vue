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
                        v-model="award_name"
                        label="Award Name"
                        :rules="[
                            v => !!v || 'Award name is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="incentives"
                        label="Incentives/Reward"
                        :rules="[
                            v => !!v || 'Incentives/Reward is required'
                        ]"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit"
                        :disabled="isDuplicate || !award_name.trim()"
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
            award_name: '',
            incentives: '',
            existingAward: [],
        };
    },

    computed: {
        isDuplicate() {
            return this.existingAward.includes(this.award_name.trim());
        },
    },

    methods: {
        async fetchExistingAwards() {
            try {
                const response = await fetch('/api/awards');

                if (response.ok) {
                    const awards = await response.json();
                    this.existingAwards = awards.map(award => award.award_name);
                } else {
                    console.error('Failed to fetch existing awards.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async handleSubmit() {
            await this.fetchExistingAwards();

            if (!this.isDuplicate) {
                try {
                    const formData = {
                        award_name: this.award_name,
                        incentives: this.incentives,
                    };

                    const response = await fetch('/api/awards/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'libraries.awards.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                // Show a message that the title is a duplicate
                console.log('Award is a duplicate.');
            }
        },

        clearFields() {
            this.award_name = '';
            this.incentives = '';
        },
    },

    created() {
        this.fetchExistingAwards();
    },
};
</script>
