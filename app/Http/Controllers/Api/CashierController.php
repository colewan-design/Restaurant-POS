<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cashier;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class CashierController extends Controller
{
   
    public function store(Request $request)
    {
        // dd($request);
       $user_id = $request->user_id;
        try {
            $cashier_id = 'CUST' .date('YmdHis');
           
            $cashier = Cashier::create([

                'cashier_id' => $cashier_id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'email' => $request->email,
                'created_at' => Carbon::now('Asia/Manila')->toDateTimeString(),
                'remarks' => $request->remarks
            ]);
        
            return response()->json(['message' => 'Cashier created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating Cashier: ' . $e->getMessage()], 500);
        }
    }
    
    
    
    public function index(Request $request)
    {
        $query = Cashier::orderBy('id');

        // Check and add conditions for each search parameter
        if ($request->has('searchName')) {
            $searchName = $request->input('searchName');
            $query->where('cashier_name', 'like', "%$searchName%");
        }
    
    
      
    
        $cashier = $query->paginate(100);
    
        return response()->json($cashier, 200);
    }

    public function edit($id)
    {
       
        $cashier = Cashier::find($id); 
        return response()->json($cashier, 200); 
    }
    
  
 

    public function update(Request $request, $id)
    {
        $user_id = $request->user_id;
        // dd($request);
        $cashier = Cashier::find($id);
        $fetch_employee = $request->employee_id;

      

        $cashier->first_name = $request->input('first_name');
        $cashier->last_name = $request->input('last_name');
        $cashier->email = $request->input('email');
        $cashier->remarks = $request->input('remarks');
        $cashier->phone_number = $request->input('phone_number');
        $cashier->address = $request->input('address');
        $cashier->updated_at = Carbon::now('Asia/Manila');
        $cashier->save();

     
        return response()->json(['message' => 'Cashier updated successfully'], 200);
    }

    

    public function destroy(Request $request, $id) {
        $user_id = $request->query('admin_id');
        // dd($user_id);
    
        $cashier = Cashier::find($id);
    
        if (!$cashier) {
            return response()->json(['message' => 'Cashier not found'], 404);
        }
    
        $cashier->delete();
    
    
        return response()->noContent();
    }
    

}
