<style>
.mdi-chevron-right{
   font-size: 16px;
}
</style>
<template>
   <v-navigation-drawer expand-on-hover rail :width="300">
     <v-divider></v-divider>
     <v-divider></v-divider>
     <v-divider></v-divider>
     <v-card width="300" elevation="16">
      <v-list >
       <v-list-item
         prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
         :title="user.name"
         :subtitle="user.email"
       ></v-list-item>
     </v-list>
     </v-card>
     <v-list>
       <v-list-item
         v-if="can('view-dashboard')"
         prepend-icon="mdi-view-dashboard"
         to="/main-admin"
         title="Overview"
       ></v-list-item>

       <v-list-item
         to="/admin/pos"
         title="Home"
       >
         <template v-slot:prepend>        
            <v-icon color="green"> mdi-home </v-icon> 
         </template>
      </v-list-item>

       <v-list-item
         to="/admin/reports"
         title="Reports"
       >
         <template v-slot:prepend>        
            <v-icon color="red-accent-4"> mdi-file-document </v-icon> 
         </template>
      </v-list-item>

       <v-list-item
         prepend-icon="mdi-account-group"
         to="/admin/customers"
         title="Customers"
       ></v-list-item>
       <v-list-item
         prepend-icon="mdi-cash-register"
         to="/admin/contracts_transmittals"
         title="Cashiers"
       >
      </v-list-item>
       <v-list-item
         prepend-icon="mdi-table"
         to="/admin/data-management"
         title="Tables"
       ></v-list-item>

       <v-list-item
         prepend-icon="mdi-text-box-check-outline"
         to="/admin/data-management"
         title="Orders"
       ></v-list-item>

       <v-list-item
         prepend-icon="mdi-cog"
         to="/admin/data-management"
         title="Settings"
       ></v-list-item>
     </v-list>
    
   </v-navigation-drawer>
 </template>
 
 <script setup>
 import { computed, ref } from "vue";
 import { useStore } from 'vuex';
 import useAuth from "@/composables/auth";
 import { useAbility } from '@casl/vue'
 const { can } = useAbility();
 const store = useStore();
 const user = computed(() => store.state.auth.user)
 const userManagementDropdown = ref(false);
 const AnnouncementDropdown = ref(false);
 const LibraryDropdown = ref(false);
 const PayrollDropdown = ref(false);
 const BillingDropdown = ref(false);
 const ObligationDropdown = ref(false);
 const LoanDropdown = ref(false);
 const contributionDropdown = ref(false);
 const benefitDropdown = ref(false);
 const remittanceDropdown = ref(false);

 const toggleRemittanceDropdown = () => {
   
   remittanceDropdown.value = !remittanceDropdown.value;
 };

 const toggleBenefitDropdown = () => {
   
   benefitDropdown.value = !benefitDropdown.value;
 };

 const toggleContributionDropdown = () => {
   
   contributionDropdown.value = !contributionDropdown.value;
 };

 const toggleLoanDropdown = () => {
   
   LoanDropdown.value = !LoanDropdown.value;
 };
 const toggleObligationDropdown = () => {
   ObligationDropdown.value = !ObligationDropdown.value;
 };

 const toggleBillingDropdown = () => {
  BillingDropdown.value = !BillingDropdown.value;
 };

 const togglePayrollDropdown = () => {
   PayrollDropdown.value = !PayrollDropdown.value;
 };

 const toggleUserManagementDropdown = () => {
   userManagementDropdown.value = !userManagementDropdown.value;
 };

 const toggleLibraryDropdown = () => {
   LibraryDropdown.value = !LibraryDropdown.value;
 };
 
 const toggleAnnouncementDropdown = () => {
   AnnouncementDropdown.value = !AnnouncementDropdown.value;
 };

 </script>

<script>
export default {
    data() {
        return {
   
        };
    },
 
};
</script>
 
 <style scoped>
 
 </style>
 