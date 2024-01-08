<style>
.margin-padding-0{
    margin: 0;
    padding: 0;
}
</style>
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
                            v => !!v || 'Title is required'
                        ]"
                    ></v-text-field>
                 
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/withholding_tax_group/">
                  <v-btn class="mt-2" color="red-darken-3">Cancel</v-btn>
                </router-link>
              </v-form>

            </v-sheet>
        </v-row>
   </v-container>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script>

<script>
export default {
  data() {
    return { 
        fetched_titles: [],
        title: '',
        existingWhtGroup: [],
    };
  },
  created() {
    this.fetchExistingWhtGroup();
  },
 
  methods: {
        async fetchExistingWhtGroup() {
            try {
                const withholding_tax_group_id = this.$route.params.id;
                const response = await axios.get(`/api/withholding_tax_group/edit/${withholding_tax_group_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const withholding_tax_billing = response.data;

                    this.title = withholding_tax_billing.title;
                   

                } else {
                    console.error('Failed to fetch existing withholding_tax_group.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate() {
            try {
                const withholding_tax_group_id = this.$route.params.id;
                const formData = {
                    title: this.title,
                };

                const response = await axios.post(`/api/withholding_tax_group/update/${withholding_tax_group_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/wht_groups', query: { showSuccessEditDialog: 'true' } });
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