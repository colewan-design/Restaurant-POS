<template>
 
  <v-container class="mt-10">
    <!-- add -->
      <v-dialog v-model="showSuccessDialog">
          <v-card width="600" class="mx-auto" color="teal">
              <v-card-title>Success!</v-card-title>
              <v-card-text>New employee has been inserted successfully.</v-card-text>
              <v-card-actions>
                <v-btn @click="closeDialog">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    <!-- edit -->
      <v-dialog v-model="showSuccessEditDialog">
          <v-card width="600" class="mx-auto" color="indigo-darken-3">
              <v-card-title>Success!</v-card-title>
              <v-card-text>Employee has been updated successfully.</v-card-text>
              <v-card-actions>
                <v-btn @click="closeEditDialog">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
      <!-- delete -->
      <v-dialog v-model="showDeleteDialog">
        <v-card width="600" class="mx-auto" color="red-darken-4">
          <v-card-title>Confirm Deletion</v-card-title>
          <v-card-text>Are you sure you want to delete this employee?</v-card-text>
          <v-card-actions>
            <v-btn @click="showDeleteDialog = false">Cancel</v-btn>
            <v-btn @click="confirmDelete" color="white">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-row>
            <v-col cols="12">
                <v-card
                class="mx-auto my-4"
                    elevation="16"
                >
                   <v-container>
                    <v-row>
                      <v-col cols="3">
                        <v-card-item>
                            <v-card-title>
                                BSU Employees
                            </v-card-title>
                            <v-card-subtitle>
                                This page lists down all BSU plantilla employees 
                            </v-card-subtitle>
                        </v-card-item>
                      </v-col>
                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Employees Headcount</v-card-title>
                          <v-card-text>{{ employeeCount }}</v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Average Salary Grade</v-card-title>
                          <v-card-text>{{ averageSalaryGrade }}</v-card-text>
                        </v-card>
                      </v-col>

                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Position Counts</v-card-title>
                          <v-card-text>{{ positionCount }}</v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="2">
                        <v-card elevation="5">
                          <v-card-title>Office Allocation Counts</v-card-title>
                          <v-card-text>{{ officeAllocationCount }}</v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                   </v-container>

                   

                </v-card>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="end">
            <router-link to="/admin/employees/create">
              <v-btn color="#0D47A1"><v-icon>mdi-plus</v-icon>Add New</v-btn>
            </router-link>
          </v-col>
        </v-row>
    </v-container>
 
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-text-field v-model="searchFN" label="Search By First Name" @input="filterEmployees" 
          variant="solo"
          prepend-icon="mdi-clipboard-text-search-outline"
          />
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="searchLN" label="Search By Last Name" @input="filterEmployees" 
          variant="solo"
          />
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="searchId" label="Search By ID" @input="filterEmployees" 
          variant="solo"
         
          />
      </v-col>

      <v-col cols="2">
        <v-text-field v-model="searchPosition" label="Search By Position" @input="filterEmployees" 
          variant="solo"
          />
      </v-col>

      <v-col cols="2">
        <v-text-field v-model="searchProject" label="Search By Project" @input="filterEmployees" 
          variant="solo"
          />
      </v-col>
      <v-col cols="2">
        <v-text-field v-model="searchOffice" label="Search By Assigned Office" @input="filterEmployees" 
          variant="solo"
          />
      </v-col>
      <v-col cols="2">
       
      </v-col>
    </v-row>
   <v-row>
    <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
      <!-- 
      <v-data-table :headers="employeeHeaders" :items="employees" :loading="loading">
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center">
          <router-link :to="{ name: 'EditEmployee', params: { id: item.id} }">
            <v-btn @click="editEmployee(item)" class="mr-3" color="amber" size="small">
              <v-icon>mdi-pencil</v-icon>Edit
            </v-btn>
          </router-link>
          <v-btn @click="deleteEmployee(item)" color="red-darken-4" size="small">
            <v-icon>mdi-delete</v-icon>Delete
          </v-btn>
        </div>
      </template>
    </v-data-table> -->

      <v-data-table-virtual
      fixed-header
        :headers="employeeHeaders"
        :items="employees"
         height="600"
        :loading="loading"
      >
      <template v-slot:item.actions="{ item }">
        <div class="d-flex align-center">
          <router-link :to="{ name: 'EditEmployee', params: { id: item.id} }">
            <v-btn @click="editEmployee(item)" class="mr-3" color="amber" size="small">
              <v-icon>mdi-pencil</v-icon>Edit
            </v-btn>
          </router-link>
          <v-btn @click="deleteEmployee(item)" color="red-darken-4" size="small">
            <v-icon>mdi-delete</v-icon>Delete
          </v-btn>
        </div>
      </template>
    
    </v-data-table-virtual>
   </v-row>

   <v-row>
    <v-col cols="12">
      <v-tabs
      color="deep-purple-accent-4"
      align-tabs="center"
      center-active
      >
        <v-tab v-for="page in totalPages" :key="page" @click="changeTab(page)">{{ page }}</v-tab>
      </v-tabs>
    </v-col>
   </v-row>

  </v-container>
 
  </template>
 <script>
 export default {
   data() {
     return {
      totalPages: 0, 
      currentPage: 1, 
      loading: false,
      searchFN: '',
      searchLN: '',
      searchOffice: '',
      searchPosition: '',
      searchProject: '',
      searchId: '',
      totalCount: '',
      showDeleteDialog: false,
      employeeToDelete: null,
      showSuccessDialog: false,
      showSuccessEditDialog: false,
       employees: [],
       employeeHeaders: [
       { title: 'Series', value: 'id', sortable: true },

       { title: 'First Name', value: 'first_name', sortable: true },
       { title: 'Middle Name', value: 'middle_name', sortable: true },
       { title: 'Last Name', value: 'last_name', sortable: true },
       { title: 'Employee ID', value: 'employee_id', sortable: true },
       { title: 'Email Address', value: 'email_address', sortable: true },
       { title: 'Position', value: 'position', sortable: true },
       { title: 'Salary Grade', value: 'salary_grade', sortable: true },
       { title: 'Step', value: 'step', sortable: true },
       { title: 'Assigned Office', value: 'place_of_assignment', sortable: true },
       { title: 'Status', value: 'status', sortable: true },
      //  { title: 'Created At', value: 'created_at', sortable: true },
       { title: 'Actions', value: 'actions'},
      ],
     };
   },
   computed: {
      averageSalaryGrade() {
        // Extract the salary grades from employees
        const salaryGrades = this.employees.map(employee => employee.salary_grade);

        // Calculate the average salary grade
        const totalSalaryGrade = salaryGrades.reduce((sum, grade) => sum + grade, 0);
        const average = totalSalaryGrade / salaryGrades.length;

        // Format the average to fixed two decimal places
        const formattedAverage = average.toFixed(2);

        return isNaN(formattedAverage) ? '0.00' : formattedAverage;
      },
      officeAllocationCount() {
        const offices = this.employees.map(employee => employee.place_of_assignment);
        const uniqueOffices = new Set(offices);
        return uniqueOffices.size;
      },
      positionCount() {
        const positions = this.employees.map(employee => employee.position);
        const uniquePositions = new Set(positions);
        return uniquePositions.size;
      },
     
    
      employeeCount() {
        // return this.totalCount;
        return this.employees.length;
      },
    },

   methods: {
    updatePage(value) {
      this.currentPage = value;
      console.log(this.currentPage);
    },
    toggleFilteringMode() {
      this.searchFN = '';
      this.searchLN = '';
      this.searchId = '';
      this.searchPosition = '';
      this.searchProject = '';
      this.searchOffice = '';
    },
    filterEmployees() {
      this.loading = true;

      // Prepare the API request URL with base parameters
      let apiUrl = `/api/employees_lib?page=${this.currentPage}`;

      if (this.searchFN !== '') {
        apiUrl += `&searchFN=${this.searchFN}`;
      }
      
      if (this.searchLN !== '') {
        apiUrl += `&searchLN=${this.searchLN}`;
      }

      if (this.searchId !== '') {
        apiUrl += `&searchId=${this.searchId}`;
      }

      if (this.searchPosition !== '') {
        apiUrl += `&searchPosition=${this.searchPosition}`;
      }

      if (this.searchProject !== '') {
        apiUrl += `&searchProject=${this.searchProject}`;
      }

      if (this.searchOffice !== '') {
        apiUrl += `&searchOffice=${this.searchOffice}`;
      }

      // Make the API request
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data) {
            this.employees = response.data.data;
            this.totalPages = response.data.last_page;
          } else {
            console.error('No data received from the API.');
          }
        })
        .catch((error) => {
          console.error('Error fetching employees:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteEmployee(employee) {
        this.employeeToDelete = employee;
        this.showDeleteDialog = true;
    },
    confirmDelete() {
      if (this.employeeToDelete) {
        const employeeId = this.employeeToDelete.id; 
        axios.delete(`/api/employees_lib/destroy/${employeeId}`)
          .then(() => {
            // Remove the deleted employee from the local list (this is for UI update only)
            // this.employees = this.employees.filter(emp => emp.id !== employeeId);
            // Close the delete confirmation dialog
            this.showDeleteDialog = false;
          })
          .catch((error) => {
            console.error('Error deleting employee:', error);
          });
      }
    },
    closeDialog() {
        this.showSuccessDialog = false;
        this.$router.push('/admin/employee');
    },
    closeEditDialog() {
        this.showSuccessEditDialog = false;
        this.$router.push('/admin/employee');
    },
    changeTab(page) {
      this.currentPage = page;
      this.getEmployees();
    },
    getEmployees() {
        this.loading = true;
        console.log('Current Page:', this.currentPage);

        axios.get(`/api/employees_lib?page=${this.currentPage}`)
          .then((response) => {
            if (response.data) {
              this.employees = response.data.data;
              this.totalPages = response.data.last_page;
              this.totalEmployeeCount = response.data.total;
              this.totalCount = response.data.total;
              console.log(this.totalCount);

            } else {
              console.error('No data received from the API.');
            }
          })
          .catch((error) => {
            console.error('Error fetching employees:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },



     editEmployee(employee) {
        // Implement edit logic here
        console.log('Editing employee:', employee);
      },
  
   },
   created() {
      const params = new URLSearchParams(this.$route.query);
      if (params.get('showSuccessDialog') === 'true') {
        this.showSuccessDialog = true;
      } else if (params.get('showSuccessEditDialog') === 'true') {
        this.showSuccessEditDialog = true;
      }
      this.getEmployees();
    },
 };
 </script>