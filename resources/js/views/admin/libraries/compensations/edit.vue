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
                        @click="handleUpdate"
                        :disabled="isDuplicate || !title.trim()"
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
      title: '',
      details: '',
    };
  },
  created() {
    this.fetchCompensations();
  },
  methods: {
    async fetchCompensations() {
        try {
            const compensationId = this.$route.params.id;
            const response = await axios.get(`/api/compensations/edit/${compensationId}`);

            this.title = response.data.title;
            this.details = response.data.details;
          
        } catch (error) {
            console.error('Error fetching compensation details:', error);
        }
        },

        async handleUpdate() {
            try {
                const compensationId = this.$route.params.id;
                const formData = {
                    title: this.title,
                    details: this.details,
                };

                const response = await axios.post(`/api/compensations/update/${compensationId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/admin/libraries/compensations', query: { showSuccessEditDialog: 'true' } });
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