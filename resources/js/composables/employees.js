import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default function useEmployees() {
    const employees = ref([])
    const employee = ref({
        employee_name: '',
        email_address: '',
        salary_grade: '',
        step: '',
        position: '',
        place_of_assignment_status: ''
    })

    const router = useRouter()
    const validationErrors = ref({})
    const isLoading = ref(false)
    const swal = inject('$swal')

    const getEmployees = async () => {
      
    }

    const getEmployee = async (id) => {
        
    }

    const storeEmployee = async (employee) => {
        
    }

    const updateEmployee = async (employee) => {
       
    }

    const deleteEmployee = async (id) => {
        // Add your logic to delete an employee by ID
        // You might need to make a DELETE request to your API endpoint
    }

    return {
        employees,
        employee,
        getEmployees,
        getEmployee,
        storeEmployee,
        updateEmployee,
        deleteEmployee,
        validationErrors,
        isLoading
    }
}
