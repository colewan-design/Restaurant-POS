<template>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-container>
        <div class="row justify-content-center my-2">
        <div class="col-md-12">
            <div class="card border-0">
                <div>
                    <h5>Permissions</h5>
                    <v-row>
                        <v-col cols="12" align="end">
                            <router-link v-if="can('permission-create')" :to="{ name: 'permissions.create' }" >
                               <v-btn color="#0D47A1">
                                Create Permission
                               </v-btn>
                            </router-link>
                        </v-col>
                    </v-row>
                </div>
                <v-row>
                    <v-col cols="2">
                        <v-text-field v-model="search_id" label="Filter by ID"
                        variant="solo"
                        prepend-icon="mdi-clipboard-text-search-outline"
                        />
                    </v-col>

                    <v-col cols="2">
                        <v-text-field v-model="search_title" label="Filter by Title"
                        variant="solo"
                    
                        />
                    </v-col>

                    <v-col cols="2">
                        <v-text-field v-model="search_global" label="Filter by Global"
                        variant="solo"
                      
                        />
                    </v-col>
                </v-row>
                <div class="card-body shadow-sm">
                    <div class="table-responsive">
                        <v-data-table class="table">
                            <thead>
                            
                            <tr>
                                <th class="px-6 py-3 text-start">
                                    <div class="flex flex-row"
                                         @click="updateOrdering('id')">
                                        <div class="font-medium text-uppercase"
                                             :class="{ 'font-bold text-blue-600': orderColumn === 'id' }">
                                            ID
                                        </div>
                                        <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                                }">&uarr;</span>
                                            <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                                }">&darr;</span>
                                        </div>
                                    </div>
                                </th>
                                <th class="px-6 py-3 text-left">
                                    <div class="flex flex-row"
                                         @click="updateOrdering('name')">
                                        <div class="font-medium text-uppercase"
                                             :class="{ 'font-bold text-blue-600': orderColumn === 'name' }">
                                            Title
                                        </div>
                                        <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'name',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'name',
                                }">&uarr;</span>
                                            <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'name',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'name',
                                }">&darr;</span>
                                        </div>
                                    </div>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <div class="flex flex-row items-center justify-between cursor-pointer"
                                         @click="updateOrdering('created_at')">
                                        <div class="leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                             :class="{ 'font-bold text-blue-600': orderColumn === 'created_at' }">
                                            Created at
                                        </div>
                                        <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'created_at',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'created_at',
                                }">&uarr;</span>
                                            <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'created_at',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'created_at',
                                }">&darr;</span>
                                        </div>
                                    </div>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="post in permissions.data" :key="post.id">
                                <td class="px-6 py-4 text-sm">
                                    {{ post.id }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ post.name }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    {{ post.created_at }}
                                </td>
                                <td class="px-6 py-4 text-sm">
                                    <router-link v-if="can('permission-edit')"
                                    :to="{ name: 'permissions.edit', params: { id: post.id } }">
                                    <v-btn class="mr-3" color="amber" size="small">
                                        <v-icon>mdi-pencil</v-icon>Edit
                                    </v-btn>
                                    </router-link>
                                    <a href="#" v-if="can('permission-delete')" @click.prevent="deletePermission(post.id)">
                                        <v-btn class="mr-3" color="red-darken-4" size="small">
                                            <v-icon>mdi-delete</v-icon>Delete
                                        </v-btn>
                                    </a>
                                    
                                </td>
                            </tr>
                            </tbody>
                        </v-data-table>
                    </div>
                </div>
                <!-- <div class="card-footer">
                    <Pagination :data="permissions" :limit="3"
                                @pagination-change-page="page => getPermissions(page, search_id, search_title, search_global, orderColumn, orderDirection)"
                                class="mt-4"/>
                </div> -->
            </div>
        </div>
    </div>
    </v-container>
</template>

<script setup>
    import {ref, onMounted, watch} from "vue";
    import usePermissions from "@/composables/permissions";
    import {useAbility} from '@casl/vue';

    const search_id = ref('')
    const search_title = ref('')
    const search_global = ref('')
    const orderColumn = ref('created_at')
    const orderDirection = ref('desc')
    const {permissions, getPermissions, deletePermission} = usePermissions()
    const {can} = useAbility()
    onMounted(() => {
        getPermissions()
    })
    const updateOrdering = (column) => {
        orderColumn.value = column;
        orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
        getPermissions(
            1,
            search_id.value,
            search_title.value,
            search_global.value,
            orderColumn.value,
            orderDirection.value
        );
    }
    watch(search_id, (current) => {
        getPermissions(
            1,
            current,
            search_title.value,
            search_global.value
        )
    })
    watch(search_title, (current) => {
        getPermissions(
            1,
            search_id.value,
            current,
            search_global.value
        )
    })
    watch(search_global, _.debounce((current) => {
        getPermissions(
            1,
            search_id.value,
            search_title.value,
            current
        )
    }, 200))

</script>

<style scoped>

</style>
