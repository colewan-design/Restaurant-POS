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
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/customers/">
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
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        email: '',
        remarks: '',
        customers: [],
    };
  },
  created() {
    this.fetchExistingCustomers(); 
  },
 
  methods: {
       
        async fetchExistingCustomers() {
            try {
                const customer_id = this.$route.params.id;
                const response = await axios.get(`/api/customer/edit/${customer_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const customer = response.data;

                    // Populate the form fields with the fetched data
                    this.first_name = customer.first_name;
                    this.last_name = customer.last_name;
                    this.phone_number = customer.phone_number;
                    this.address = customer.address;
                    this.email = customer.email;
                    this.remarks = customer.remarks;
                   

                } else {
                    console.error('Failed to fetch existing customers.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
              
                const customer_id = this.$route.params.id;
                const formData = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    phone_number: this.phone_number,
                    address: this.address,
                    email: this.email,
                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/customer/update/${customer_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/customers', query: { showSuccessEditDialog: 'true' } });
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