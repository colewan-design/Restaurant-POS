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
                            v-model="first_name"
                            label="First Name"
                            :rules="[
                                v => !!v || 'First Name is required'
                            ]"
                    ></v-text-field>

                    <v-text-field
                            variant="solo"
                            v-model="last_name"
                            label="Last Name"
                           
                    ></v-text-field>

                    <v-text-field
                            variant="solo"
                            v-model="phone_number"
                            label="Phone Number"
                           
                    ></v-text-field>

                    <v-text-field
                            variant="solo"
                            v-model="address"
                            label="Address"
                           
                    ></v-text-field>

                    <v-text-field
                            variant="solo"
                            v-model="email"
                            label="Email"
                         
                    ></v-text-field>
               
                
                      

                    <v-text-field
                        variant="solo"
                        v-model="remarks"
                        label="Remarks"
                     
                    ></v-text-field>
                 
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleSubmit(user.id)"
                        color="teal"
                    >
                        Submit
                    </v-btn>
                  <router-link to="/admin/cashiers/">
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
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
            email: '',
            remarks: '',
            cashiers: [],
            
        };
    },
   

    methods: {

        async handleSubmit(userId) {
                try {
                    const formData = {
                     
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        remarks: this.remarks,
                        phone_number: this.phone_number,
                        address: this.address,
                        user_id: userId,

                    };

                    const response = await fetch('/api/cashier/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (response.ok) {
                        console.log('Data inserted successfully!');
                        this.$router.push({ name: 'cashiers.index', query: { showSuccessDialog: 'true' } });
                    } else {
                        console.error('Failed to insert data.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
        },

       

        clearFields() {
            this.first_name = '';
            this.last_name = '';
            this.email = '';
            this.phone_number = '';
            this.address = '';
            this.remarks = '';
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