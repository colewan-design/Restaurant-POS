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
                            v => !!v || ' name is required'
                        ]"
                    ></v-text-field>
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate"
                        :disabled="isDuplicate || !name.trim()"
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
      name: '',
    };
  },
  created() {
    this.fetchDisallowanceCategories();
  },
  methods: {
    async fetchDisallowanceCategories() {
        try {
            const disallowanceCategoryId = this.$route.params.id;
            const response = await axios.get(`/api/disallowance_categories/edit/${disallowanceCategoryId}`);

            this.name = response.data.name;
          
        } catch (error) {
            console.error('Error fetching disallowance category details:', error);
        }
        },

        async handleUpdate() {
            try {
                const disallowanceCategoryId = this.$route.params.id;
                const formData = {
                    name: this.name,
                };

                const response = await axios.post(`/api/disallowance_categories/update/${disallowanceCategoryId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/libraries/disallowance_categories', query: { showSuccessEditDialog: 'true' } });
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