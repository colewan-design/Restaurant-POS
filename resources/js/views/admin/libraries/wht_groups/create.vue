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
                        @click="handleSubmit()"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/withholding_tax_group/">
                    <v-btn class="mt-2" color="red-darken-3" @click="clearFields">Cancel</v-btn>
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
            fetched_groups: [],
            title: '',
            existingWhtGroup: [],
            
        };
    },
    created() {
        this.getGroups(); 
    },

    methods: {
      
        async getGroups() {
            try {
                const response = await axios.get('/api/withholding_tax_group');
                this.fetched_groups = response.data; 
                console.log(this.fetched_groups.data);

            } catch (error) {
                console.error(error);
            }
        },


        async handleSubmit() {

           
                try {
                    const formData = {
                       
                        title: this.title,

                    };

                    const response = await fetch('/api/withholding_tax_group/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'libraries.wht_groups.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
           
        },

        clearFields() {
            this.title = '';
        },
    },
};
</script>

<script setup>
  import { computed, ref } from "vue";
  import { useStore } from 'vuex';
  import useAuth from "@/composables/auth";
  
  const store = useStore();
  const user = computed(() => store.state.auth.user);

</script>