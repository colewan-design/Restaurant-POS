<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
        <v-row>
            <v-col cols="4" class="mx-auto">
                <v-card style="padding: 1rem;">
                    <form @submit.prevent="submitForm">
                       
                            <v-text-field v-model="permission.name" label="Title" 
                            variant="solo"
                            />

                            <div class="text-danger mt-1">
                                {{ errors.name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.name">
                                    {{ message }}
                                </div>
                            </div>
                    
                        <!-- Buttons -->
                        <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Update</span>
                            </button>
                            <!-- <v-btn :disabled="isLoading">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Update</span>
                            </v-btn> -->
                        </div>
                    </form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
    import { onMounted, reactive, watchEffect } from "vue";
    import { useRoute } from "vue-router";
    import usePermissions from "@/composables/permissions";
    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules"
    defineRule('required', required)
    defineRule('min', min);

    // Define a validation schema
    const schema = {
        name: 'required|min:3'
    }
    // Create a form context with the validation schema
    const { validate, errors, resetForm } = useForm({ validationSchema: schema })
    // Define actual fields for validation
    const { value: name } = useField('name', null, { initialValue: '' });
    const { permission: postData, getPermission, updatePermission, validationErrors, isLoading } = usePermissions()
    const permission = reactive({
        name
    })
    const route = useRoute()
    function submitForm() {
        validate().then(form => { if (form.valid) updatePermission(permission) })
    }
    onMounted(() => {
        getPermission(route.params.id)
    })
    // https://vuejs.org/api/reactivity-core.html#watcheffect
    watchEffect(() => {
        permission.id = postData.value.id
        permission.name = postData.value.name
    })
</script>
