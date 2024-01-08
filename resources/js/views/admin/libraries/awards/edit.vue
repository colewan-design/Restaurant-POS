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
                            v => !!v || 'Award Name is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="incentives"
                        label="Incentives"
                        :rules="[
                            v => !!v || 'Incentives is required'
                        ]"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate"
                        color="teal"
                    >
                        Update
                    </v-btn>
                    <router-link to="/libraries/awards">
                        <v-btn class="mt-2" color="red-darken-3">cancel</v-btn>
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

      award_name: '',
      incentives: '',
    };
  },
  created() {
    this.fetchAwards();
  },
  methods: {
    async fetchAwards() {
        try {
            const awardId = this.$route.params.id;
            const response = await axios.get(`/api/awards/edit/${awardId}`);

            this.award_name = response.data.award_name;
            this.incentives = response.data.incentives;
          
        } catch (error) {
            console.error('Error fetching award details:', error);
        }
        },

        async handleUpdate() {
            try {
                const awardId = this.$route.params.id;
                const formData = {
                    award_name: this.award_name,
                    incentives: this.incentives,
                };

                const response = await axios.post(`/api/awards/update/${awardId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    
                    this.$router.push({ path: '/libraries/awards', query: { showSuccessEditDialog: 'true' } });
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