<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class CustomerController extends Controller
{
   
    public function store(Request $request)
    {
        // dd($request);
       $user_id = $request->user_id;
        try {
            $customer_id = 'Cust' . date('YmdHis');
           
            $customer = Customer::create([

                'customer_id' => $customer_id,
                'customer_name' => $request->customer_name,
              
                'created_at' => Carbon::now('Asia/Manila')->toDateTimeString(),
                'remarks' => $request->remarks
            ]);
        
            return response()->json(['message' => 'Customer created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating Customer: ' . $e->getMessage()], 500);
        }
    }
    
    
    
    public function index(Request $request)
    {
        $query = Customer::orderBy('id');

        // Check and add conditions for each search parameter
        if ($request->has('searchName')) {
            $searchName = $request->input('searchName');
            $query->where('customer_name', 'like', "%$searchName%");
        }
    
    
      
    
        $customer = $query->paginate(100);
    
        return response()->json($customer, 200);
    }

    public function edit($id)
    {
       
        $customer = Customer::find($id); 
        return response()->json($customer, 200); 
    }
    
    private function logActivity($action, $landbank_bill, $user_id)
    {
        $activity_log_id = 'LANDBANKBILL' . date('YmdHis');
        $title = 'Customer ' . ucfirst($action) . 'd successfully';
        $unreadNotification = true;
        // dd($request->user_id);

        $description = 'Name: ' . $landbank_bill->employee_name . ',' . 'Billing ID: ' . $landbank_bill->landbank_billing_id;

        $activity_log = ActivityLog::create([
            'activity_log_id' => $activity_log_id,
            'employee_id' => $landbank_bill->employee_id,
            'employee_name' => $landbank_bill->employee_name,
            'title' => $title,
            'description' => $description,
            'unreadNotification' => $unreadNotification,
            'user_id' => $user_id,
            'created_at' => Carbon::now('Asia/Manila')->toDateTimeString(),
        ]);
    }
 

    public function update(Request $request, $id)
    {
        $user_id = $request->user_id;
        // dd($request);
        $customer = Customer::find($id);
        $fetch_employee = $request->employee_id;

      

        $customer->customer_name = $request->input('customer_name');
        $customer->remarks = $request->input('remarks');
        $customer->updated_at = Carbon::now('Asia/Manila');
        $customer->save();

     
        return response()->json(['message' => 'Customer updated successfully'], 200);
    }

    

    public function destroy(Request $request, $id) {
        $user_id = $request->query('admin_id');
        // dd($user_id);
    
        $landbank_bill = LandbankBilling::find($id);
    
        if (!$landbank_bill) {
            return response()->json(['message' => 'LANDBANK Bill not found'], 404);
        }
    
        $landbank_bill->delete();
    
        // Log activity for deletion
        $this->logActivity('Delete', $landbank_bill, $user_id);
    
        return response()->noContent();
    }
    

}
