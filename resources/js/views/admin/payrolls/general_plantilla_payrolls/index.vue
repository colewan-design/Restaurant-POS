<style>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: #90A4AE;
  color: #141414;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the button */
  left: 50%;
  margin-left: -60px; /* Center the tooltip horizontally */
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

</style>

<template>
 
  <v-container class="mt-10">
    <!-- add -->
      <v-dialog v-model="showSuccessDialog">
          <v-card width="600" class="mx-auto" color="teal">
              <v-card-title>Success!</v-card-title>
              <v-card-text>New Plantilla Payroll has been inserted successfully.</v-card-text>
              <v-card-actions>
                <v-btn @click="closeDialog">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    <!-- edit -->
      <v-dialog v-model="showSuccessEditDialog">
          <v-card width="600" class="mx-auto" color="indigo-darken-3">
              <v-card-title>Success!</v-card-title>
              <v-card-text>New Plantilla Payroll has been updated successfully.</v-card-text>
              <v-card-actions>
                <v-btn @click="closeEditDialog">Close</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
      <!-- delete -->
      <v-dialog v-model="showDeleteDialog">
        <v-card width="600" class="mx-auto" color="red-darken-4">
          <v-card-title>Confirm Deletion</v-card-title>
          <v-card-text>Are you sure you want to delete this Plantilla Payroll?</v-card-text>
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
                    <v-card-item>
                        <v-card-title>
                          General Plantilla Payroll
                        </v-card-title>
                        <v-card-subtitle>
                            This page lists down all BSU Employee General Plantilla Payroll
                        </v-card-subtitle>
                    </v-card-item>

                    <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" align="end">

            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props"><v-icon>mdi-calendar-range</v-icon> Select First Half Date 
                  <v-tooltip
                      activator="parent"
                      location="top"
                    >Click to toggle date selection for the first half
                  </v-tooltip>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="First Half Date">
                  <v-container>
                    <v-row>
                    <v-date-picker v-model="input_first_half" :max="2" multiple width="500"></v-date-picker>
                        <v-alert v-if="showFirstHalfAlert" type="error" outlined>
                          Please select exactly 2 dates.
                        </v-alert>
                    </v-row>

                    <v-row>
                      <v-btn
                      color="blue-accent-4"
                        text="Okay"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-row>
                  </v-container>
                </v-card>
              </template>
            </v-dialog>

           
          
          </v-col>
          <v-col cols="2" align="left">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props"><v-icon>mdi-calendar-range</v-icon> Select Second Half Date
                  <v-tooltip
                      activator="parent"
                      location="top"
                    >Click to toggle date selection for the second half
                  </v-tooltip>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Second Half Date">
                  <v-container>
                    <v-row>
                    <v-date-picker v-model="input_second_half" :max="2" multiple width="500"></v-date-picker>
                        <v-alert v-if="showSecondHalfAlert" type="error" outlined>
                          Please select exactly 2 dates.
                        </v-alert>
                    </v-row>

                    <v-row>
                      <v-btn
                        text="Okay"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-row>
                  </v-container>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
          
          <v-col cols="4" align="left">
        
                <v-btn color="green-darken-3"
                @click="generatePayroll"
                :loading="loading"
                >
                  Generate <v-icon>mdi-circle-multiple-outline</v-icon>
                  <v-tooltip
                      activator="parent"
                      location="top"
                    >Click to generate the payroll of all Plantilla Employees
                  </v-tooltip>
                </v-btn>
               
          
              <v-spacer></v-spacer>

              
          </v-col>
          <v-col cols="4"> 
            <router-link :to="{ name: 'payrolls.general_plantilla_payrolls.create' }" v-if="can('plantilla-payroll-create')">
              <div class="tooltip-container">
                <v-btn elevation="8" variant="text" icon="mdi-plus" color="blue-accent-4" class="mr-5"></v-btn>
                <span class="tooltip-text">Create Payroll</span>
              </div>
            </router-link>

            <router-link :to="{ name: 'payrolls.general_plantilla_payrolls.history' }" v-if="can('plantilla-payroll-history')">
              <div class="tooltip-container">
              <v-btn elevation="8" variant="text" icon="mdi-history" color="red-accent-4" class="mr-5"></v-btn>
              <span class="tooltip-text">Payroll History</span>
              </div>
            </router-link>

            <div class="tooltip-container">
              <v-btn elevation="8" @click="generateExcel" variant="text" icon="mdi-microsoft-excel" color="green-accent-4" class="mr-5"></v-btn>
              <span class="tooltip-text">Current Payroll</span>
            </div>

            <div class="tooltip-container">
              <v-btn :loading="isLoading" elevation="8" @click="generatePDF" variant="text" icon="mdi-file-pdf-box" color="red-accent-4" class="mr-5"></v-btn>
              <span class="tooltip-text">Current Payroll</span>
            </div>

            <!-- <div class="tooltip-container">
              <v-btn elevation="8" variant="text" icon="mdi-help" color="yellow-accent-4"></v-btn>
              <span class="tooltip-text">Help</span>
            </div> -->
          </v-col>
        </v-row>
    </v-container>
  <v-container>
    <v-row>
      <v-col cols="2">
          <v-text-field v-model="searchName" label="Search By Employee Name" @input="filterPlantillaPayrolls" 
            variant="solo"
            :loading="loading"
            prepend-icon="mdi-clipboard-text-search-outline"
            />
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="searchEmployeeNumber" label="Search By Employee Number" @input="filterPlantillaPayrolls" 
          :loading="loading"
            variant="solo"
            />
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="searchGsisBpNumber" label="Search By BP Number" @input="filterPlantillaPayrolls" 
          :loading="loading"
            variant="solo"
          
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchRc" label="Search By RC" @input="filterPlantillaPayrolls" 
          :loading="loading"
            variant="solo"
            />
        </v-col>

        <v-col cols="2">
          <v-text-field v-model="searchRemarks" label="Search By Remarks" @input="filterPlantillaPayrolls" 
          :loading="loading"
            variant="solo"
            />
        </v-col>
      </v-row>
    
    <v-row>
      <v-data-table-virtual
        fixed-header
          :headers="plantillaPayrollHeaders"
          :items="plantilla_payrolls"
          height="600"
          :loading="loading"
        >

        <template #item.first_half_date="{ item }">
          {{ formatMonth(item.first_half_start) }} to {{ formatMonth(item.first_half_end) }}
        </template>

        <template #item.second_half_date="{ item }">
          {{ formatMonth(item.second_half_start) }} to {{ formatMonth(item.second_half_end) }}
        </template>

        <template v-slot:item.net_amount_due="{ item }">
          ₱ {{ item.net_amount_due }}
        </template>

        <template v-slot:item.bsucmpc_loans="{ item }">
          ₱ {{ item.bsucmpc_loans }}
        </template>


        <template v-slot:item.total_deductions="{ item }">
          ₱ {{ item.total_deductions }}
        </template>

        <template v-slot:item.basic_salary="{ item }">
          ₱ {{ item.basic_salary }}
        </template>

        <template v-slot:item.phil_am="{ item }">
          ₱ {{ item.phil_am }}
        </template>

        <template v-slot:item.ucpbs="{ item }">
          ₱ {{ item.ucpbs }}
        </template>

        <template v-slot:item.bsu_housing_occupancy_fee="{ item }">
          ₱ {{ item.bsu_housing_occupancy_fee }}
        </template>

        <template v-slot:item.bsucmpc_savings_and_share_capital="{ item }">
          ₱ {{ item.bsucmpc_savings_and_share_capital }}
        </template>

        <template v-slot:item.PERA="{ item }">
          ₱ {{ item.PERA }}
        </template>

        <template v-slot:item.gross_amount="{ item }">
          ₱ {{ item.gross_amount }}
        </template>

        <template v-slot:item.withholding_tax="{ item }">
          ₱ {{ item.withholding_tax }}
        </template>

        <template v-slot:item.gsis_premium="{ item }">
          ₱ {{ item.gsis_premium }}
        </template>

        <template v-slot:item.gsis_conso_loan="{ item }">
          ₱ {{ item.gsis_conso_loan }}
        </template>

        <template v-slot:item.gsis_emergency_loan="{ item }">
          ₱ {{ item.gsis_emergency_loan }}
        </template>

        <template v-slot:item.gsis_policy_loan="{ item }">
          ₱ {{ item.gsis_policy_loan }}
        </template>

        <template v-slot:item.gsis_real_estate="{ item }">
          ₱ {{ item.gsis_real_estate }}
        </template>

        <template v-slot:item.gsis_ouli="{ item }">
          ₱ {{ item.gsis_ouli }}
        </template>

        <template v-slot:item.gsis_gfall_ii="{ item }">
          ₱ {{ item.gsis_gfall_ii }}
        </template>

        <template v-slot:item.gsis_mpl="{ item }">
          ₱ {{ item.gsis_mpl }}
        </template>

        <template v-slot:item.gsis_cpl="{ item }">
          ₱ {{ item.gsis_cpl }}
        </template>

        <template v-slot:item.phil_health="{ item }">
          ₱ {{ item.phil_health }}
        </template>

        <template v-slot:item.hdmf_premium="{ item }">
          ₱ {{ item.hdmf_premium }}
        </template>

        <template v-slot:item.hdmf_mp_ii="{ item }">
          ₱ {{ item.hdmf_mp_ii }}
        </template>

        <template v-slot:item.hdmf_housing_loan="{ item }">
          ₱ {{ item.hdmf_housing_loan }}
        </template>

        <template v-slot:item.hdmf_mpl_cl="{ item }">
          ₱ {{ item.hdmf_mpl_cl }}
        </template>

        <template v-slot:item.landbank_loan="{ item }">
          ₱ {{ item.landbank_loan }}
        </template>

        <template v-slot:item.china_bank_savings="{ item }">
          ₱ {{ item.china_bank_savings }}
        </template>

        <template v-slot:item.coco_premium="{ item }">
          ₱ {{ item.coco_premium }}
        </template>

        <template v-slot:item.water="{ item }">
          ₱ {{ item.water }}
        </template>

        <template v-slot:item.electric="{ item }">
          ₱ {{ item.electric }}
        </template>

        <template v-slot:item.ppsta="{ item }">
          ₱ {{ item.ppsta }}
        </template>

        <template v-slot:item.coa_nd="{ item }">
          ₱ {{ item.coa_nd }}
        </template>




        <!-- table actions -->
        <template v-slot:item.actions="{ item }">
          <div class="d-flex align-center">
            <router-link :to="{ name: 'payrolls.general_plantilla_payrolls.edit', params: { id: item.id} }" v-if="can('plantilla-payroll-edit')">
              <v-btn class="mr-3" color="grey-darken-2" size="small" variant="text">
                <v-icon size="24">mdi-pencil-box-outline</v-icon>
                <v-tooltip
                  activator="parent"
                  location="top"
                >Edit</v-tooltip>
              </v-btn>
            </router-link>
            <v-btn @click="deletePlantillaPayroll(item, user.id)" color="red-darken-4" size="small" v-if="can('plantilla-payroll-delete')" variant="text">
              <v-icon size="24">mdi-delete</v-icon>
              <v-tooltip
                  activator="parent"
                  location="top"
                >Delete</v-tooltip>
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

<script setup>
  import { computed, ref } from "vue";
  import {onMounted} from "vue";
import usePermissions from "@/composables/permissions";
import {useAbility} from '@casl/vue';
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.state.auth.user);
const {getPermissions} = usePermissions()
const {can} = useAbility()
onMounted(() => {
    getPermissions()
})


</script>

 <script>
 import moment from 'moment';
 export default {
   data() {
     return {
      user: {},
      input_first_half: [],
      showFirstHalfAlert: false,
      showSecondHalfAlert: false,
      input_second_half: [],
      searchName: '',
      searchEmployeeNumber: '',
      searchGsisBpNumber: '',
      searchRc: '',
      searchRemarks: '',
      totalPages: 0, 
      currentPage: 1, 
      loading: false,
      showDeleteDialog: false,
      plantillaPayrollToDelete: null,
      showSuccessDialog: false,
      showSuccessEditDialog: false,
      isLoading: false,
      
      plantilla_payrolls: [],
      generated_plantilla_payrolls: [],
      plantillaPayrollHeaders: [
      { title: 'Series', value: 'id', sortable: true },
      { title: 'Employee ID', value: 'employee_number', sortable: true },
      { title: 'Employee Name', value: 'employee_name', sortable: true },
      { title: 'GSIS BP Number', value: 'employee_gsis_bp_number', sortable: true },
      { title: 'Salary Grade', value: 'employee_sg', sortable: true },
      { title: 'Step', value: 'employee_step', sortable: true },
      { title: 'RC', value: 'rc', sortable: true },
      { title: 'RC Code', value: 'rc_code', sortable: true },
      { title: 'Basic Salary', value: 'basic_salary', sortable: true },

      { title: 'PERA', value: 'PERA', sortable: true },
      { title: 'Gross Amount', value: 'gross_amount', sortable: true },
      { title: 'Withholding Tax', value: 'withholding_tax', sortable: true },
      { title: 'GSIS Premium', value: 'gsis_premium', sortable: true },
      { title: 'GSIS Conso Loan', value: 'gsis_conso_loan', sortable: true },
      { title: 'GSIS Emergency Loan', value: 'gsis_emergency_loan', sortable: true },
      { title: 'GSIS Policy Loan', value: 'gsis_policy_loan', sortable: true },
      { title: 'GSIS Real Estate', value: 'gsis_real_estate', sortable: true },
      { title: 'GSIS OULI', value: 'gsis_ouli', sortable: true },

      { title: 'GSIS GFAL II', value: 'gsis_gfall_ii', sortable: true },
      { title: 'GSIS MPL', value: 'gsis_mpl', sortable: true },
      { title: 'GSIS CPL', value: 'gsis_cpl', sortable: true },
      { title: 'Phil Health', value: 'phil_health', sortable: true },
      { title: 'HDMF Premium', value: 'hdmf_premium', sortable: true },
      { title: 'HDMF MP II', value: 'hdmf_mp_ii', sortable: true },
      { title: 'HDMF Housing Loan', value: 'hdmf_housing_loan', sortable: true },
      { title: 'HDMF MPL/ CL', value: 'hdmf_mpl_cl', sortable: true },
      { title: 'BSUCMPC Loans', value: 'bsucmpc_loans', sortable: true },
      { title: 'BSUCMPC Savings and Share Capital', value: 'bsucmpc_savings_and_share_capital', sortable: true },

      { title: 'Landbank Loan', value: 'landbank_loan', sortable: true },
      { title: 'China Bank Savings', value: 'china_bank_savings', sortable: true },
      { title: 'Coco Premium', value: 'coco_premium', sortable: true },
      { title: 'AIA Phil Life and GIC,Inc. (Phil Am)', value: 'phil_am', sortable: true },
      { title: 'PPSTA', value: 'ppsta', sortable: true },
      { title: 'Water', value: 'water', sortable: true },
      { title: 'Electric', value: 'electric', sortable: true },
      { title: 'COA-ND', value: 'coa_nd', sortable: true },
      { title: 'UCPBS', value: 'ucpbs', sortable: true },

      { title: 'BSU Housing Occupancy Fee ', value: 'bsu_housing_occupancy_fee', sortable: true },
      { title: 'TOTAL DEDUCTIONS', value: 'total_deductions', sortable: true },
      { title: 'NET AMOUNT DUE', value: 'net_amount_due', sortable: true },
      { title: 'First Half', value: 'first_half_date', sortable: true },
      { title: 'Second Half', value: 'second_half_date', sortable: true },
      { title: 'Remarks', value: 'remarks', sortable: true },

      { title: 'Actions', value: 'actions'},
      ],
     };
   },
   computed: {
    selectedDatesCount() {
      return this.input_first_half.length;
    },

    selectedSecondHalfDatesCount() {
      return this.input_second_half.length;
    },
  },
  watch: {
    selectedDatesCount(newCount) {
      if (newCount > 2) {
        this.showFirstHalfAlert = true;
      } else {
        this.showFirstHalfAlert = false;
      }
    },
    selectedSecondHalfDatesCount(newCount) {
      if (newCount > 2) {
        this.showSecondHalfAlert = true;
      } else {
        this.showSecondHalfAlert = false;
      }
    },
  },

   created() {
      const params = new URLSearchParams(this.$route.query);
      if (params.get('showSuccessDialog') === 'true') {
        this.showSuccessDialog = true;
      } else if (params.get('showSuccessEditDialog') === 'true') {
        this.showSuccessEditDialog = true;
      }
      this.getPlantillaPayrolls();
    },
    methods: {
      async generatePDF() {
        this.isLoading = true;
        try {
            const response = await fetch('/api/pdf_generate_plantilla_payroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('pdf generated successfully!');
                this.isLoading = false;
            } else {
                console.error('Failed to generate pdf.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
    
      filterPayroll() {
        this.loading = true;

        // Ensure both input_first_half and input_second_half have exactly 2 selected dates
        if (
          Array.isArray(this.input_first_half) &&
          this.input_first_half.length === 2 &&
          Array.isArray(this.input_second_half) &&
          this.input_second_half.length === 2
        ) {
          const inputFirstHalf = this.input_first_half.map(date => {
            const parsedDate = new Date(date);
            parsedDate.setDate(parsedDate.getDate() + 1);
            return parsedDate.toISOString().split('T')[0];
          });

          const inputSecondHalf = this.input_second_half.map(date => {
            const parsedDate = new Date(date);
            parsedDate.setDate(parsedDate.getDate() + 1);
            return parsedDate.toISOString().split('T')[0];
          });

          // Prepare the API request URL with base parameters and additional date filters
          let apiUrl = '/api/plantilla_payrolls';

          axios
            .post(apiUrl, {
              input_first_half: inputFirstHalf,
              input_second_half: inputSecondHalf,
            })
            .then((response) => {
              if (response.data) {
                this.generated_plantilla_payrolls = response.data.data;
              } else {
                console.error('No data received from the API.');
              }
            })
            .catch((error) => {
              console.error('Error fetching plantilla payrolls:', error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.error('Please select exactly 2 dates for both first half and second half.');
          this.loading = false;
        }
      },


    formatMonth(date) {
        return moment(date).format('MMMM D, YYYY'); // Adjust the format as needed
      },
    changeTab(page) {
      this.currentPage = page;
      this.getPlantillaPayrolls();
    },
    getPlantillaPayrolls() {
      this.loading = true;
      console.log('Current Page:', this.currentPage);

      axios.get(`/api/plantilla_payrolls?page=${this.currentPage}`)
        .then((response) => {
          if (response.data) {
            this.plantilla_payrolls = response.data.data;
            this.totalPages = response.data.last_page;

          } else {
            console.error('No data received from the API.');
          }
        })
        .catch((error) => {
          console.error('Error fetching pldt billings:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    generatePayroll() {
      this.loading = true;

      // Ensure both input_first_half and input_second_half have exactly 2 selected dates
      if (
        Array.isArray(this.input_first_half) &&
        this.input_first_half.length === 2 &&
        Array.isArray(this.input_second_half) &&
        this.input_second_half.length === 2
      ) {
        const inputFirstHalf = this.input_first_half.map(date => {
          const parsedDate = new Date(date);
          parsedDate.setDate(parsedDate.getDate() + 1);
          return parsedDate.toISOString().split('T')[0];
        });

        const inputSecondHalf = this.input_second_half.map(date => {
          const parsedDate = new Date(date);
          parsedDate.setDate(parsedDate.getDate() + 1);
          return parsedDate.toISOString().split('T')[0];
        });

        // Your Axios call here
        axios.post('/api/plantilla_payrolls/generate', {
          input_first_half: inputFirstHalf,
          input_second_half: inputSecondHalf,
        })
        .then((response) => {
          if (response.data) {
            this.generated_plantilla_payrolls = response.data.data;
          } else {
            console.error('No data received from the API.');
          }
        })
        .catch((error) => {
          console.error('Error fetching plantilla payrolls:', error);
        })
        .finally(() => {
          this.loading = false;
        });
      } else {
        console.error('Please select exactly 2 dates for both first half and second half.');
        this.loading = false;
      }
    },





    filterPlantillaPayrolls() {
      this.loading = true;

      // Prepare the API request URL with base parameters
      let apiUrl = `/api/plantilla_payrolls?page=${this.currentPage}`;

      if (this.searchName !== '') {
        apiUrl += `&searchName=${this.searchName}`;
      }
      
      if (this.searchEmployeeNumber !== '') {
        apiUrl += `&searchEmployeeNumber=${this.searchEmployeeNumber}`;
      }

      if (this.searchGsisBpNumber !== '') {
        apiUrl += `&searchGsisBpNumber=${this.searchGsisBpNumber}`;
      }

      if (this.searchRc !== '') {
        apiUrl += `&searchRc=${this.searchRc}`;
      }

      if (this.searchRemarks !== '') {
        apiUrl += `&searchRemarks=${this.searchRemarks}`;
      }

      // Make the API request
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data) {
            this.plantilla_payrolls = response.data.data;
            this.totalPages = response.data.last_page;
          } else {
            console.error('No data received from the API.');
          }
        })
        .catch((error) => {
          console.error('Error fetching pldt billings:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deletePlantillaPayroll(plantilla_payroll, userId) {
        this.plantillaPayrollToDelete = plantilla_payroll;
        this.admin_id = userId; 
        this.showDeleteDialog = true;
        // console.log(this.admin_id);
    },

    confirmDelete() {
      if (this.plantillaPayrollToDelete && this.admin_id) {  // Corrected from admin_id to this.admin_id
          const pldtBillingId = this.plantillaPayrollToDelete.id;
          const adminId = this.admin_id;

          axios.delete(`/api/plantilla_payrolls/destroy/${pldtBillingId}`, {
              params: { admin_id: adminId }
          })
          .then(() => {
              this.plantilla_payrolls = this.plantilla_payrolls.filter(comp => comp.id !== pldtBillingId);
              this.showDeleteDialog = false;
          })
          .catch((error) => {
              console.error('Error deleting Pldt Billing:', error);
          });
      }
  },

    closeDialog() {
        this.showSuccessDialog = false;
        this.$router.push('/admin/general_plantilla_payrolls');
        
    },
    closeEditDialog() {
        this.showSuccessEditDialog = false;
        this.$router.push('/admin/general_plantilla_payrolls');
    },
   

     editPldtLoans(plantilla_payroll) {
        // Implement edit logic here
        console.log('Editing Pldt Loans:', plantilla_payroll);
      },
  
   },
 
 };

</script>