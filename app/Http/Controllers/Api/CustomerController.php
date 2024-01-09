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
            $customer_id = 'CUST' .date('YmdHis');
           
            $customer = Customer::create([

                'customer_id' => $customer_id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'email' => $request->email,
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
    
  
 

    public function update(Request $request, $id)
    {
        $user_id = $request->user_id;
        // dd($request);
        $customer = Customer::find($id);
        $fetch_employee = $request->employee_id;

      

        $customer->first_name = $request->input('first_name');
        $customer->last_name = $request->input('last_name');
        $customer->email = $request->input('email');
        $customer->remarks = $request->input('remarks');
        $customer->phone_number = $request->input('phone_number');
        $customer->address = $request->input('address');
        $customer->updated_at = Carbon::now('Asia/Manila');
        $customer->save();

     
        return response()->json(['message' => 'Customer updated successfully'], 200);
    }

    

    public function destroy(Request $request, $id) {
        $user_id = $request->query('admin_id');
        // dd($user_id);
    
        $customer = Customer::find($id);
    
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    
        $customer->delete();
    
    
        return response()->noContent();
    }
    

}
