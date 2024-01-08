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
                        v-model="mandatory_deduction_name"
                        label="Mandatory Deduction Name"
                        :rules="[
                            v => !!v || 'Mandatory Deduction Name is required'
                        ]"
                    ></v-text-field>
                    <v-text-field
                        variant="solo"
                        v-model="mandatory_value"
                        label="Mandatory Value"
                        :rules="[
                            v => !!v || 'Mandatory Value is required',
                            v => /^\d+(\.\d+)?$/.test(v) || 'Mandatory Value must be a valid number'
                        ]"
                    ></v-text-field>
                    <v-autocomplete
                        variant="solo"
                        v-model="mandatory_type"
                        :items="['percentage', 'flat amount']"
                        label="Mandatory Type"
                        item-text="text"
                        item-value="value"
                        :rules="[
                            v => !!v || 'Mandatory Type is required',
                            v => this.isMandatoryTypeValid(v) || 'Mandatory Type must be either percentage or flat amount'
                        ]"
                    ></v-autocomplete>

                    <v-text-field
                        variant="solo"
                        v-model="description"
                        label="Description"
                    ></v-text-field>
                    <v-autocomplete
                        variant="solo"
                        v-model="active"
                        label="Active"
                        :items="[true, false]"
                        item-text="text"
                        item-value="value"
                    ></v-autocomplete>

                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate"
                        :disabled="isDuplicate || !mandatory_deduction_name.trim()"
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
        mandatory_deduction_name: '',
        mandatory_value: '',
        mandatory_type: '',
        description: '',
        active: null,
        existingMandatoryDeductions: [],
    };
  },
  created() {
    this.fetchMandatory();
    this.fetchMandatory();
  },
  computed: {
        isDuplicate() {
            return this.existingMandatoryDeductions.includes(this.mandatory_deduction_name.trim());
        },
    },
  methods: {
    isMandatoryTypeValid(type) {
            const lowerCaseType = type.toLowerCase();
            return ['percentage', 'flat amount'].includes(lowerCaseType);
        },
        async fetchMandatory() {
            try {
                const mandatoryId = this.$route.params.id;
                const response = await axios.get(`/api/mandatory_deductions/edit/${mandatoryId}`);

                // Populate the form fields with the fetched data
                this.mandatory_deduction_name = response.data.mandatory_deduction_name;
                this.mandatory_value = response.data.mandatory_value;
                this.description = response.data.description;
                 // Convert the active value from 1 or 0 to a boolean
                this.active = response.data.active === 1;

                // Set the initial value of mandatory_type
                this.mandatory_type = response.data.mandatory_type;

            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        },


        async handleUpdate() {
            try {
                const mandatoryId = this.$route.params.id;
                const formData = {
                    mandatory_deduction_name: this.mandatory_deduction_name,
                    mandatory_value: this.mandatory_value,
                    mandatory_type: this.mandatory_type,
                    description: this.description,
                    active: this.active ? 1 : 0,
                };

                const response = await axios.post(`/api/mandatory_deductions/update/${mandatoryId}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/obligations/mandatory', query: { showSuccessEditDialog: 'true' } });
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