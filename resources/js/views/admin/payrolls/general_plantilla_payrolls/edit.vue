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
            <v-sheet width="1600" class="mt-2 mx-auto p-2" >
                <v-col cols="12">
                    <v-tabs v-model="tab" color="primary" background-color="white" dark>
                    <v-tab value="one">
                        <v-icon size="24" color="indigo">mdi-account-details</v-icon>
                        <span class="ml-2">Employee Details</span>
                    </v-tab>
                    <v-tab value="two">
                        <v-icon size="24" color="green">mdi-hand-coin</v-icon>
                        <span class="ml-2">Earnings</span>
                    </v-tab>
                    <v-tab value="three">
                        <v-icon size="24" color="red-darken-3">mdi-cash-remove</v-icon>
                        <span class="ml-2">Deductions</span>
                    </v-tab>
                    <v-tab value="four">
                        <v-icon size="24" color="teal">mdi-bank</v-icon>
                        <span class="ml-2">Contributions</span>
                    </v-tab>
                    <v-tab value="five">
                        <v-icon size="24" color="purple">mdi-text-box-outline</v-icon>
                        <span class="ml-2">Summary</span>
                    </v-tab>
                    <v-tab value="six">
                        <v-icon size="24" color="blue">mdi-calendar-range-outline</v-icon>
                        <span class="ml-2">Pay Period</span>
                    </v-tab>
                    </v-tabs>
                </v-col>

                <v-form @submit.prevent>
                    <v-window v-model="tab">
                        <v-window-item value="one">
                            <v-container>
                                <v-row>
                             
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-autocomplete
                                    variant="solo"
                                    label="Employee"
                                    v-model="selected_employee"
                                    :items="fetched_employee_names"
                                    item-text="employee_name"
                                    item-value="employee_id"
                                    search-input
                                ></v-autocomplete>
                                </v-col>
                                <v-col cols="4"> 
                                    <v-text-field
                                    variant="solo"
                                    v-model="employee_position"
                                    label="Employee Position"
                                    :rules="[
                                        v => !!v || 'Employee Position is required'
                                    ]"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="employee_gsis_bp_number"
                                    label="GSIS BP Number"
                                    :rules="[
                                        v => !!v || 'GSIS BP Number is required'
                                    ]"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                            <v-col cols="4">
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="employee_sg"
                                    label="SG"
                                    :rules="[
                                        v => !!v || 'SG is required'
                                    ]"
                                ></v-text-field>

                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="employee_step"
                                    label="Step"
                                    :rules="[
                                        v => !!v || 'Step is required'
                                    ]"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    type="number"
                                    variant="solo"
                                    v-model="employee_step"
                                    label="Step"
                                    :rules="[
                                        v => !!v || 'Step is required'
                                    ]"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                            <v-text-field
                                variant="solo"
                                v-model="rc_code"
                                label="RC Code"
                                :rules="[
                                    v => !!v || 'RC Code is required'
                                ]"
                            ></v-text-field>
                            </v-container>
                        </v-window-item>

                        <v-window-item value="two">
                           <v-container>
                            <v-row>
                             
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field
                                        prefix="₱"
                                        @input="calculateGross"
                                        type="number"
                                        variant="solo"
                                        v-model="basic_salary"
                                        label="Basic Salary"
                                        :rules="[
                                            v => !!v || 'Basic Salary is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        prefix="₱"
                                        type="number"
                                        variant="solo"
                                        v-model="PERA"
                                        label="PERA"
                                        :rules="[
                                            v => !!v || 'PERA is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                               
                            </v-row>
                           </v-container>
                        </v-window-item>

                        <v-window-item value="three">
                           <v-container>
                                <v-row>
                                 
                                </v-row>
                            
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field
                                            @input="calculateTotalDeduction"
                                            prefix="₱"
                                            type="number"
                                            variant="solo"
                                            v-model="withholding_tax"
                                            label="Withholding Tax"
                                            :rules="[
                                                v => !!v || 'Withholding Tax is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            prefix="₱"  

                                            type="number"
                                            variant="solo"
                                            v-model="gsis_conso_loan"
                                            label="GSIS Conso Loan"
                                            :rules="[
                                                v => !!v || 'GSIS Conso Loan is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_emergency_loan"
                                            label="GSIS Emergency Loan"
                                            :rules="[
                                                v => !!v || 'GSIS Emergency Loan is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_policy_loan"
                                            label="GSIS Policy Loan"
                                            :rules="[
                                                v => !!v || 'GSIS Policy Loan is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_real_estate"
                                            label="GSIS Real Estate"
                                            :rules="[
                                                v => !!v || 'GSIS Real Estate is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_ouli"
                                            label="GSIS OULI"
                                            :rules="[
                                                v => !!v || 'GSIS OULI is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_gfall_ii"
                                            label="GSIS GFALL II"
                                            :rules="[
                                                v => !!v || 'GSIS GFALL II is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_mpl"
                                            label="GSIS MPL"
                                            :rules="[
                                                v => !!v || 'GSIS MPL is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="gsis_cpl"
                                            label="GSIS CPL"
                                            :rules="[
                                                v => !!v || 'GSIS CPL is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="phil_health"
                                            label="Philhealth"
                                            :rules="[
                                                v => !!v || 'Philhealth is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="ucpbs"
                                            label="UCPBS"
                                            :rules="[
                                                v => !!v || 'UCPBS is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                   
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="coa_nd"
                                            label="COA-ND"
                                            :rules="[
                                                v => !!v || 'COA-ND is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                   
                                </v-row>
                                
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="hdmf_housing_loan"
                                            label="HDMF Housing Loan"
                                            :rules="[
                                                v => !!v || 'HDMF Housing Loan is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="hdmf_mpl_cl"
                                            label="HDMF MPL/CL"
                                            :rules="[
                                                v => !!v || 'HDMF MPL/CL is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="bsucmpc_loans"
                                            label="BSUCMPC Loans"
                                            :rules="[
                                                v => !!v || 'BSUCMPC Loans is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="bsucmpc_savings_and_share_capital"
                                            label="BSUCMPC Savings and Share Capital"
                                            :rules="[
                                                v => !!v || 'BSUCMPC Savings and Share Capital is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="landbank_loan"
                                            label="Landbank Loan"
                                            :rules="[
                                                v => !!v || 'Landbank Loan is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="china_bank_savings"
                                            label="China Bank Savings"
                                            :rules="[
                                                v => !!v || 'China Bank Savings is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="phil_am"
                                            label="Phil-Am"
                                            :rules="[
                                                v => !!v || 'Phil-Am is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            variant="solo"
                                            v-model="ppsta"
                                            label="PPSTA"
                                            :rules="[
                                                v => !!v || 'PPSTA is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            variant="solo"
                                            v-model="bsu_housing_occupancy_fee"
                                            label="BSU Housing Occupancy Fee"
                                            :rules="[
                                                v => !!v || 'BSU Housing Occupancy Fee is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                </v-row>

                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="water"
                                            label="Water"
                                            :rules="[
                                                v => !!v || 'Water is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col>
                                        <v-text-field
                                            prefix="₱"  
                                            type="number"
                                            variant="solo"
                                            v-model="electric"
                                            label="Electric"
                                            :rules="[
                                                v => !!v || 'Electric is required'
                                            ]"
                                        ></v-text-field>
                                    </v-col>

                                   
                                </v-row>
                            
                           </v-container>
                        </v-window-item>

                        <v-window-item value="four">
                            <v-container>
                                <v-row>
                             
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        @input="calculateContribution"
                                        prefix="₱" 
                                        variant="solo"
                                        v-model="gsis_premium"
                                        label="GSIS Premium"
                                        :rules="[
                                            v => !!v || 'GSIS Premium is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        prefix="₱" 
                                        variant="solo"
                                        v-model="hdmf_premium"
                                        label="HDMF Premium"
                                        :rules="[
                                            v => !!v || 'HDMF Premium is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field
                                        prefix="₱" 
                                        variant="solo"
                                        v-model="coco_premium"
                                        label="COCO Premium"
                                        :rules="[
                                            v => !!v || 'COCO Premium is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col  cols="4">
                                    <v-text-field
                                       
                                        prefix="₱"  
                                        type="number"
                                        variant="solo"
                                        v-model="hdmf_mp_ii"
                                        label="HDMF MPII"
                                        :rules="[
                                            v => !!v || 'MPII is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-window-item>

                        <v-window-item value="five">
                            <v-container>
                                <v-row>
                             
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field
                                        prefix="₱"
                                        type="number"
                                        variant="solo"
                                        v-model="gross_amount"
                                        label="Gross Amount"
                                        :rules="[
                                            v => !!v || 'Gross Amount is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        prefix="₱"
                                        variant="solo"
                                        v-model="total_deductions"
                                        label="Total Deductions"
                                        :rules="[
                                            v => !!v || 'Total Deductions is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>

                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field
                                        readonly
                                        prefix="₱"
                                        variant="solo"
                                        v-model="contribution"
                                        label="Total Contribution *read only"
                                        :rules="[
                                            v => !!v || 'Total Contribution is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>

                            </v-row>
                           

                            <v-row>
                                <v-col>
                                    <v-text-field
                                        prefix="₱"
                                        variant="solo"
                                        v-model="net_amount_due"
                                        label="Net Amount Due"
                                        :rules="[
                                            v => !!v || 'Net Amount Due is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-textarea
                                variant="solo"
                                v-model="remarks"
                                label="Remarks"
                                :rules="[
                                    v => !!v || 'Remarks is required'
                                ]"
                            ></v-textarea>
                            </v-container>
                        </v-window-item>
                        <v-window-item value="six">
                           <v-container>
                            <v-row>
                             
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field
                                        type="date"
                                        variant="solo"
                                        v-model="first_half_start"
                                        label="First Half Start"
                                        :rules="[
                                            v => !!v || 'First Half Start is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field
                                        type="date"
                                        variant="solo"
                                        v-model="first_half_end"
                                        label="First Half End"
                                        :rules="[
                                            v => !!v || 'First Half End is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-text-field
                                        type="date"
                                        variant="solo"
                                        v-model="second_half_start"
                                        label="Second Half Start"
                                        :rules="[
                                            v => !!v || 'Second Half Start is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field
                                        type="date"
                                        variant="solo"
                                        v-model="second_half_end"
                                        label="Second Half End"
                                        :rules="[
                                            v => !!v || 'Second Half End is required'
                                        ]"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                           </v-container>
                        </v-window-item>
                    </v-window>
               
                 
                    <v-btn
                        type="submit"
                        class="mt-2 mr-2"
                        @click="handleUpdate(user.id)"
                        color="teal"
                    >
                        Update
                    </v-btn>
                <router-link to="/admin/general_plantilla_payrolls/">
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
        tab: null,
        
        selected_employee: '', 
        fetched_employee_names: [],
        employee_name: '',
        employee_id: '',

        contribution: '',

        employee_number: '',
        employee_position: '',
        employee_gsis_bp_number: '',
        employee_sg: '',
        employee_step: '',
        rc_code: '',

        basic_salary: '',
        PERA: '',
        gross_amount: '',
        withholding_tax: '',
        gsis_conso_loan: '',
        gsis_emergency_loan: '',

        gsis_policy_loan: '',
        gsis_real_estate: '',
        gsis_ouli: '',
        gsis_gfall_ii: '',
        gsis_mpl: '',
        gsis_cpl: '',

        phil_health: '',
        hdmf_premium: '',
        hdmf_mp_ii: '',
        hdmf_housing_loan: '',
        hdmf_mpl_cl: '',
        bsucmpc_loans: '',

        bsucmpc_savings_and_share_capital: '',
        landbank_loan: '',
        china_bank_savings: '',
        coco_premium: '',
        phil_am: '',
        ppsta: '',
        gsis_premium: '',

        water: '',
        electric: '',
        coa_nd: '',
        ucpbs: '',
        bsu_housing_occupancy_fee: '',
        total_deductions: '',

        net_amount_due: '',
        first_half_start: '',
        first_half_end: '',
        second_half_start: '',
        second_half_end: '',
        rc: '',

        withholding_tax: '',
        remarks: '',
        employees: [],
        existingPlantillaPayroll: [],
    };
  },
  created() {
    this.fetchexistingPlantillaPayrolls();
    this.getEmployees(); 
  },
  watch: {
    //gross amount
        basic_salary() {
        this.calculateGross();
        },
        PERA() {
        this.calculateGross();
        },
    //total deduction
        withholding_tax() {
        this.calculateTotalDeduction();
        },
        gsis_conso_loan() {
        this.calculateTotalDeduction();
        },
        gsis_emergency_loan() {
        this.calculateTotalDeduction();
        },
        gsis_policy_loan() {
        this.calculateTotalDeduction();
        },
        gsis_real_estate() {
        this.calculateTotalDeduction();
        },
        gsis_ouli() {
        this.calculateTotalDeduction();
        },
        gsis_gfall_ii() {
        this.calculateTotalDeduction();
        },
        gsis_mpl() {
        this.calculateTotalDeduction();
        },
        gsis_cpl() {
        this.calculateTotalDeduction();
        },
        phil_health() {
        this.calculateTotalDeduction();
        },
       
      
        hdmf_housing_loan() {
        this.calculateTotalDeduction();
        },
        hdmf_mpl_cl() {
        this.calculateTotalDeduction();
        },
        bsucmpc_loans() {
        this.calculateTotalDeduction();
        },
        bsucmpc_savings_and_share_capital() {
        this.calculateTotalDeduction();
        },
        landbank_loan() {
        this.calculateTotalDeduction();
        },
        china_bank_savings() {
        this.calculateTotalDeduction();
        },
       
        phil_am() {
        this.calculateTotalDeduction();
        },
        ppsta() {
        this.calculateTotalDeduction();
        },
        water() {
        this.calculateTotalDeduction();
        },
        electric() {
        this.calculateTotalDeduction();
        },
        coa_nd() {
        this.calculateTotalDeduction();
        },
        ucpbs() {
        this.calculateTotalDeduction();
        },
        bsu_housing_occupancy_fee() {
        this.calculateTotalDeduction();
        },
        //contributions
        hdmf_premium() {
        this.calculateContribution();
        },
        coco_premium() {
        this.calculateContribution();
        },
        hdmf_mp_ii() {
        this.calculateContribution();
        },
        gsis_premium() {
        this.calculateContribution();
        },
        //net amount
        gross_amount() {
        this.calculateNet();
        },
        total_deductions() {
        this.calculateNet();
        },
        contribution() {
        this.calculateNet();
        },
    },
 
  methods: {
        calculateNet() {
            // Ensure the fields are not empty
            if (this.gross_amount !== '' && this.total_deductions !== ''&& this.contribution !== '') {
                // Calculate Total Due with 2 decimal places
                this.net_amount_due = (
                parseFloat(this.gross_amount) -
                parseFloat(this.total_deductions) -
                parseFloat(this.contribution)
                ).toFixed(2);
            }
        },
        calculateContribution() {
            // Ensure the fields are not empty
            if (this.hdmf_premium !== '' && this.coco_premium !== ''&& this.hdmf_mp_ii !== ''&& this.gsis_premium !== '') {
                // Calculate Total Due with 2 decimal places
                this.contribution = (
                parseFloat(this.hdmf_premium) +
                parseFloat(this.hdmf_mp_ii) +
                parseFloat(this.gsis_premium) +
                parseFloat(this.coco_premium)
                ).toFixed(2);
            }
        },
        calculateGross() {
            // Ensure the fields are not empty
            if (this.basic_salary !== '' && this.PERA !== '') {
                // Calculate Total Due with 2 decimal places
                this.gross_amount = (
                parseFloat(this.basic_salary) +
                parseFloat(this.PERA)
                ).toFixed(2);
            }
        },
        calculateTotalDeduction() {
            // Ensure the fields are not empty
            if (this.withholding_tax !== '' && this.gsis_conso_loan !== ''&& this.gsis_emergency_loan !== ''&& this.gsis_policy_loan !== ''&& this.gsis_real_estate !== ''&& this.gsis_ouli !== ''&& this.gsis_gfall_ii !== ''&& this.gsis_mpl !== ''&& this.gsis_cpl !== ''&& this.phil_health !== ''&& this.hdmf_premium !== ''&& this.hdmf_mp_ii !== ''&& this.hdmf_housing_loan !== ''&& this.hdmf_mpl_cl !== ''&& this.bsucmpc_loans !== ''&& this.bsucmpc_savings_and_share_capital !== ''&& this.landbank_loan !== ''&& this.china_bank_savings !== ''&& this.coco_premium !== ''&& this.phil_am !== ''&& this.ppsta !== ''&& this.water !== ''&& this.electric !== ''&& this.coa_nd !== ''&& this.ucpbs !== ''&& this.bsu_housing_occupancy_fee !== '') {
                // Calculate Total Due with 2 decimal places
                this.total_deductions = (
                parseFloat(this.withholding_tax) +
                parseFloat(this.gsis_conso_loan) +
                parseFloat(this.gsis_emergency_loan) +
                parseFloat(this.gsis_policy_loan) +
                parseFloat(this.gsis_real_estate) +
                parseFloat(this.gsis_ouli) +
                parseFloat(this.gsis_gfall_ii) +
                parseFloat(this.gsis_mpl) +
                parseFloat(this.gsis_cpl) +
                parseFloat(this.phil_health) +
                parseFloat(this.hdmf_premium) +
                parseFloat(this.hdmf_mp_ii) +
                parseFloat(this.hdmf_housing_loan) +
                parseFloat(this.hdmf_mpl_cl) +
                parseFloat(this.bsucmpc_loans) +
                parseFloat(this.bsucmpc_savings_and_share_capital) +
                parseFloat(this.landbank_loan) +
                parseFloat(this.china_bank_savings) +
                parseFloat(this.coco_premium) +
                parseFloat(this.phil_am) +
                parseFloat(this.ppsta) +
                parseFloat(this.water) +
                parseFloat(this.electric) +
                parseFloat(this.coa_nd) +
                parseFloat(this.ucpbs) +
                parseFloat(this.bsu_housing_occupancy_fee)
                ).toFixed(2);
            }
        },
        getEmployees() {
            axios.get('/api/employees_lib/getList')
                .then((response) => {
                    this.employees = response.data;
                    this.fetched_employee_names = this.employees.map(employee => employee.employee_name);

                
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async fetchexistingPlantillaPayrolls() {
            try {
                const plantilla_payroll_id = this.$route.params.id;
                const response = await axios.get(`/api/plantilla_payrolls/edit/${plantilla_payroll_id}`);

                if (response.status === 200) {
                    // Use response.data directly, no need for response.json()
                    const plantilla_payroll = response.data;

                    // Populate the form fields with the fetched data
                    this.selected_employee = response.data.employee_name;

                    this.employee_position = plantilla_payroll.employee_position;
                    this.employee_gsis_bp_number = plantilla_payroll.employee_gsis_bp_number;
                    this.employee_sg = plantilla_payroll.employee_sg;
                    this.employee_step = plantilla_payroll.employee_step;
                    this.rc_code = plantilla_payroll.rc_code;
                    this.gsis_premium = plantilla_payroll.gsis_premium;
                    this.basic_salary = plantilla_payroll.basic_salary;
                    this.PERA = plantilla_payroll.PERA;
                    this.gross_amount = plantilla_payroll.gross_amount;
                    this.withholding_tax = plantilla_payroll.withholding_tax;
                    this.gsis_conso_loan = plantilla_payroll.gsis_conso_loan;

                    this.gsis_emergency_loan = plantilla_payroll.gsis_emergency_loan;
                    this.gsis_policy_loan = plantilla_payroll.gsis_policy_loan;
                    this.gsis_real_estate = plantilla_payroll.gsis_real_estate;
                    this.gsis_ouli = plantilla_payroll.gsis_ouli;
                    this.gsis_gfall_ii = plantilla_payroll.gsis_gfall_ii;

                    this.gsis_mpl = plantilla_payroll.gsis_mpl;
                    this.gsis_cpl = plantilla_payroll.gsis_cpl;
                    this.phil_health = plantilla_payroll.phil_health;
                    this.hdmf_premium = plantilla_payroll.hdmf_premium;
                    this.hdmf_mp_ii = plantilla_payroll.hdmf_mp_ii;

                    this.hdmf_housing_loan = plantilla_payroll.hdmf_housing_loan;
                    this.hdmf_mpl_cl = plantilla_payroll.hdmf_mpl_cl;
                    this.bsucmpc_loans = plantilla_payroll.bsucmpc_loans;
                    this.bsucmpc_savings_and_share_capital = plantilla_payroll.bsucmpc_savings_and_share_capital;
                    this.landbank_loan = plantilla_payroll.landbank_loan;

                    this.china_bank_savings = plantilla_payroll.china_bank_savings;
                    this.coco_premium = plantilla_payroll.coco_premium;
                    this.phil_am = plantilla_payroll.phil_am;
                    this.ppsta = plantilla_payroll.ppsta;
                    this.water = plantilla_payroll.water;

                    this.electric = plantilla_payroll.electric;
                    this.coa_nd = plantilla_payroll.coa_nd;
                    this.ucpbs = plantilla_payroll.ucpbs;
                    this.bsu_housing_occupancy_fee = plantilla_payroll.bsu_housing_occupancy_fee;
                    this.total_deductions = plantilla_payroll.total_deductions;

                    this.net_amount_due = plantilla_payroll.net_amount_due;
                    this.first_half_start = plantilla_payroll.first_half_start;
                    this.first_half_end = plantilla_payroll.first_half_end;
                    this.second_half_start = plantilla_payroll.second_half_start;
                    this.second_half_end = plantilla_payroll.second_half_end;
                    this.remarks = plantilla_payroll.remarks;
                   

                } else {
                    console.error('Failed to fetch existing plantilla_payrolls.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },


        async handleUpdate(userId) {
            try {
                const selectedEmployee = this.employees.find(employee => employee.employee_name === this.selected_employee);
                const plantilla_payroll_id = this.$route.params.id;
                const formData = {
                    employee_id: selectedEmployee.employee_id,

                    employee_position: this.employee_position,
                    employee_gsis_bp_number: this.employee_gsis_bp_number,
                    employee_sg: this.employee_sg,
                    employee_step: this.employee_step,
                    rc_code: this.rc_code,

                    basic_salary: this.basic_salary,
                    PERA: this.PERA,
                    gross_amount: this.gross_amount,
                    withholding_tax: this.withholding_tax,
                    gsis_conso_loan: this.gsis_conso_loan,
                    gsis_premium: this.gsis_premium,

                    gsis_emergency_loan: this.gsis_emergency_loan,
                    gsis_policy_loan: this.gsis_policy_loan,
                    gsis_real_estate: this.gsis_real_estate,
                    gsis_ouli: this.gsis_ouli,
                    gsis_gfall_ii: this.gsis_gfall_ii,

                    gsis_mpl: this.gsis_mpl,
                    gsis_cpl: this.gsis_cpl,
                    phil_health: this.phil_health,
                    hdmf_premium: this.hdmf_premium,
                    hdmf_mp_ii: this.hdmf_mp_ii,

                    hdmf_housing_loan: this.hdmf_housing_loan,
                    hdmf_mpl_cl: this.hdmf_mpl_cl,
                    bsucmpc_loans: this.bsucmpc_loans,
                    bsucmpc_savings_and_share_capital: this.bsucmpc_savings_and_share_capital,
                    landbank_loan: this.landbank_loan,

                    china_bank_savings: this.china_bank_savings,
                    coco_premium: this.coco_premium,
                    phil_am: this.phil_am,
                    ppsta: this.ppsta,
                    water: this.water,

                    electric: this.electric,
                    coa_nd: this.coa_nd,
                    ucpbs: this.ucpbs,
                    bsu_housing_occupancy_fee: this.bsu_housing_occupancy_fee,
                    total_deductions: this.total_deductions,

                    net_amount_due: this.net_amount_due,
                    first_half_start: this.first_half_start,
                    first_half_end: this.first_half_end,
                    second_half_start: this.second_half_start,
                    second_half_end: this.second_half_end,

                    remarks: this.remarks,
                    user_id: userId,
                };

                const response = await axios.post(`/api/plantilla_payrolls/update/${plantilla_payroll_id}`, formData);

                if (response.status === 200) {
                    console.log('Data updated successfully!');
                    this.$router.push({ path: '/admin/general_plantilla_payrolls', query: { showSuccessEditDialog: 'true' } });
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