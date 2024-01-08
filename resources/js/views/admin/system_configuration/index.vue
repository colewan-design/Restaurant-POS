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

                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                type="number"    
                                variant="solo"
                                v-model="electric_billing_vat"
                                label="Electric Billing Vat"
                                :rules="[
                                    v => !!v || 'Electric Billing Vat is required'
                                ]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                 
                    <v-btn
                    :loading="isLoading"
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate()"
                        color="teal"
                    >
                        Save
                    </v-btn>
                 
                </v-form>
            </v-sheet>
        </v-row>
    </v-container>
</template>




<script>
export default {
    data() {
        return {
            electric_billing_vat: 0,
            isLoading: false,
        };
    },
    created() {
        this.fetchExistingData();
        
    
    },
    methods: {
      
        async handleUpdate() {
            this.isLoading = true;

            try {
                const formData = {
                
                    electric_billing_vat: this.electric_billing_vat,
                };

                const response = await axios.post(`/api/system_config/update/1`, formData);

                if (response.status === 200) {
                    this.isLoading = false;
                    console.log('Data updated successfully!');
                } else {
                    console.error('Failed to update data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },

        async fetchExistingData() {
            try {
                const response = await axios.get(`/api/system_config/edit/1`);

                if (response.status === 200) {
                    const system_config = response.data;

                    this.electric_billing_vat = system_config.electric_billing_vat;
                   

                } else {
                    console.error('Failed to fetch existing data.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        clearFields() {
            this.electric_billing_vat = '';
           
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