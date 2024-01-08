<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
        <div class="row justify-content-center my-5">
        <div class="col-md-10">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <!-- <label for="post-title" class="form-label">Name</label>
                            <input v-model="post.name" id="post-title" type="text" class="form-control"> -->
                            <v-autocomplete
                                variant="solo"
                                label="Employee"
                                v-model="post.name"
                                :items="fetched_employee_names"
                                item-text="employee_name"
                                item-value="employee_id"
                                search-input
                            ></v-autocomplete>
                            <div class="text-danger mt-1">
                                {{ errors.name }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.name">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <!-- <label for="email" class="form-label">Email</label>
                            <input v-model="post.email" id="email" type="email" class="form-control"> -->
                            <v-text-field
                                type="email"
                                variant="solo"
                                placeholder="sample@gmail.com"
                                v-model="post.email"
                                label="Email"
                                :rules="[
                                    v => !!v || 'Email is required'
                                ]"
                            ></v-text-field>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.email">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <!-- <label for="password" class="form-label">Password</label>
                            <input v-model="post.password" id="password" type="password" class="form-control"> -->
                            <v-text-field
                                type="password"
                                variant="solo"
                                v-model="post.password"
                                label="Password"
                                :rules="[
                                    v => !!v || 'Password is required'
                                ]"
                            ></v-text-field>
                            <!-- <div class="text-danger mt-1">
                                {{ errors.password }}
                            </div> -->
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.password">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <!-- Role -->
                        <div class="mb-3">
                            <label class="form-label">
                                Role
                            </label>
                            <v-select 
                            multiple 
                            v-model="post.role_id" 
                            :options="roleList" 
                            :reduce="role => role.id" 
                            label="name" 
                            class="form-control"
                            >
                            </v-select>
                            <div class="text-danger mt-1">
                                {{ errors.role_id }}
                            </div>
                            <div class="text-danger mt-1">
                                <div v-for="message in validationErrors?.role_id">
                                    {{ message }}
                                </div>
                            </div>
                        </div>
                        <!-- Buttons -->
                        <!-- <div class="mt-4">
                            <button :disabled="isLoading" class="btn btn-primary">
                                <div v-show="isLoading" class=""></div>
                                <span v-if="isLoading">Processing...</span>
                                <span v-else>Save</span>
                            </button>
                        </div> -->
                        <v-btn
                        :disabled="isLoading" 
                        :loading="isLoading"
                            type="submit"
                            class="mt-2 mr-2"
                            @click="handleButtonClick"
                            color="primary"
                        >
                            Save
                        </v-btn>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </v-container>
</template>
<script setup>
    import { onMounted, reactive } from "vue";
    import useRoles from "@/composables/roles";
    import useUsers from "@/composables/users";
    import { useForm, useField, defineRule } from "vee-validate";
    import { required, min } from "@/validation/rules";
    
    const { roleList, getRoleList } = useRoles();
    const { storeUser, validationErrors, isLoading } = useUsers();

    
    defineRule('required', required);
    defineRule('min', min);

    // Define a validation schema
    const schema = {
        name: 'required',
        email: 'required',
        password: 'required|min:8',
    }
    // Create a form context with the validation schema
    const { validate, errors } = useForm({ validationSchema: schema })
    // Define actual fields for validation
    const { value: name } = useField('name', null, { initialValue: '' });
    const { value: email } = useField('email', null, { initialValue: '' });
    const { value: password } = useField('password', null, { initialValue: '' });
    const { value: role_id } = useField('role_id', null, { initialValue: '', label: 'role' });

    const post = reactive({
        name,
        email,
        password,
        role_id,
    })
    function submitForm() {
        validate().then(form => { if (form.valid) storeUser(post) })
    }
    onMounted(() => {
        getRoleList()
    })
</script>

<script>
export default {
    data() {
        return {
            selected_employee: '', 
            fetched_employee_names: [],
            employee_name: '',
            isLoading: false,
        };
    },
    created() {
        this.getEmployees(); 
    },

    methods: {
        handleButtonClick() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false; 
        }, 1000);
        
        
        },
        async getEmployees() {
            try {
                const response = await axios.get('/api/employees_lib/getList');
                this.employees = response.data;
                this.fetched_employee_names = this.employees.map(employee => employee.employee_name);
            } catch (error) {
                console.error(error);
            }
        },
       
    },
};
</script>
